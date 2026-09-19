import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import {
  getGoogleReturnTo,
  GOOGLE_TOKEN_COOKIE,
  GOOGLE_RETURN_COOKIE,
} from '../src/lib/google-oauth';
import { GET as callback } from '../src/app/api/auth/google/callback/route';
import { GET as sessionRoute } from '../src/app/api/auth/google/session/route';
import {
  deleteAllGoogleDriveBackups,
  listGoogleDriveBackups,
} from '../src/lib/google-drive-backup';
import {
  createTrackerBackup,
  parseTrackerBackup,
} from '../src/lib/tracker-backup';
import { extractImportCredential } from '../src/lib/validators/import-url';
import { useStorageStore } from '../src/store/useStorageStore';

async function main() {
  const origin = 'https://headhunt.cc';
  const importOrigin = 'https://ef-webview.gryphline.com/page/gacha_char';

  for (const [query, expected] of [
    ['token=current&server_id=2', { token: 'current', server: '2' }],
    ['u8_token=legacy&server=3', { token: 'legacy', server: '3' }],
    ['token=mixed&server=2', { token: 'mixed', server: '2' }],
    [
      'u8_token=mixed-legacy&server_id=3',
      { token: 'mixed-legacy', server: '3' },
    ],
  ] as const) {
    assert.deepEqual(
      extractImportCredential(`${importOrigin}?${query}`),
      expected
    );
  }
  assert.equal(
    extractImportCredential('https://example.com/?token=x&server_id=2'),
    null
  );

  for (const value of [
    '/\\example.com',
    '//example.com',
    'https://example.com',
    '/\t/example.com',
  ]) {
    assert.equal(getGoogleReturnTo(value, origin), '/');
    const response = await callback(
      new NextRequest(`${origin}/api/auth/google/callback`, {
        headers: {
          cookie: `${GOOGLE_RETURN_COOKIE}=${encodeURIComponent(value)}`,
        },
      })
    );
    assert.equal(response.headers.get('location'), `${origin}/`);
  }
  for (const value of ['/id/tracker?tab=history#records', '/.//example.com']) {
    const normalized = getGoogleReturnTo(value, origin);
    assert.equal(new URL(normalized, origin).origin, origin);
    assert.equal(getGoogleReturnTo(normalized, origin), normalized);
  }

  const originalFetch = globalThis.fetch;
  const originalSecret = process.env.GOOGLE_CLIENT_SECRET;
  const memory = new Map<string, string>();
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key: string) => memory.get(key) ?? null,
      setItem: (key: string, value: string) => {
        memory.set(key, value);
      },
      removeItem: (key: string) => {
        memory.delete(key);
      },
    },
  });
  try {
    const backup = parseTrackerBackup({
      app: 'headhunt.cc',
      version: 2,
      exportedAt: new Date().toISOString(),
      currentProfileId: 'abc',
      profiles: {
        abc: { id: 'abc', name: 'Original', stores: {} },
        '9007199254740992': { id: '9007199254740992', stores: {} },
      },
    });
    const profileWithUrl = {
      id: 'with-url',
      stores: {
        headhunt: { url: 'secret', types: {}, banners: {}, records: {} },
      },
    };
    const privateBackup = createTrackerBackup(
      { 'with-url': profileWithUrl },
      'with-url',
      { includeImportUrls: false }
    );
    assert.equal(privateBackup.profiles['with-url'].stores?.headhunt?.url, '');
    assert.equal(profileWithUrl.stores.headhunt.url, 'secret');

    useStorageStore
      .getState()
      .restoreProfiles(backup.profiles, backup.currentProfileId);
    useStorageStore.getState().setProfile({ name: 'First', stores: {} });
    useStorageStore.getState().setProfile({ name: 'Second', stores: {} });
    const profiles = useStorageStore.getState().profiles;
    assert.equal(Object.keys(profiles).length, 4);
    assert.equal(profiles.abc.name, 'Original');
    assert.equal(profiles['1'].name, 'First');
    assert.equal(profiles['2'].name, 'Second');

    const deleted: string[] = [];
    const pages: string[] = [];
    globalThis.fetch = async (input, init) => {
      const url = new URL(String(input));
      if (init?.method === 'DELETE') {
        deleted.push(url.pathname.split('/').at(-1)!);
        return new Response(null, { status: 204 });
      }
      assert.ok(url.searchParams.get('fields')?.includes('nextPageToken'));
      const page = url.searchParams.get('pageToken') ?? '';
      pages.push(page);
      return Response.json(
        page === ''
          ? {
              files: Array.from({ length: 100 }, (_, id) => ({
                id: String(id),
                size: '10',
              })),
              nextPageToken: 'empty',
            }
          : page === 'empty'
            ? { nextPageToken: 'last' }
            : {
                files: [
                  {
                    id: '100',
                    size: '20',
                    appProperties: { contentHash: 'hash' },
                  },
                ],
              }
      );
    };
    const session = { accessToken: 'test', expiresAt: 0 };
    const files = await listGoogleDriveBackups(session);
    assert.equal(files.length, 101);
    assert.equal(files[100].contentHash, 'hash');
    assert.equal(files[100].size, 20);
    assert.deepEqual(pages, ['', 'empty', 'last']);
    await deleteAllGoogleDriveBackups(session);
    assert.equal(new Set(deleted).size, 101);

    process.env.GOOGLE_CLIENT_SECRET = 'test-only';
    for (const [status, error] of [
      [429, 'rate_limit_exceeded'],
      [500, 'server_error'],
      [400, 'invalid_client'],
      [400, 'invalid_grant'],
    ] as const) {
      globalThis.fetch = async () => Response.json({ error }, { status });
      const response = await sessionRoute(
        new NextRequest(`${origin}/api/auth/google/session`, {
          headers: { cookie: `${GOOGLE_TOKEN_COOKIE}=test-token` },
        })
      );
      const revoked = error === 'invalid_grant';
      assert.equal(response.status, revoked ? 200 : 503);
      assert.equal(response.cookies.has(GOOGLE_TOKEN_COOKIE), revoked);
    }
    globalThis.fetch = async (input) =>
      Response.json(
        String(input).includes('/token')
          ? { access_token: 'access', expires_in: 3600 }
          : { email: 'test@example.com' }
      );
    const response = await sessionRoute(
      new NextRequest(`${origin}/api/auth/google/session`, {
        headers: { cookie: `${GOOGLE_TOKEN_COOKIE}=test-token` },
      })
    );
    const body = (await response.json()) as { connected: boolean };
    assert.equal(body.connected, true);
    assert.equal(response.cookies.has(GOOGLE_TOKEN_COOKIE), false);
    console.log('All audit regression checks passed.');
  } finally {
    globalThis.fetch = originalFetch;
    if (originalSecret === undefined)
      Reflect.deleteProperty(process.env, 'GOOGLE_CLIENT_SECRET');
    else process.env.GOOGLE_CLIENT_SECRET = originalSecret;
  }
}

void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
