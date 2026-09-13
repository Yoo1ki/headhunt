/* eslint-disable @next/next/no-img-element -- ImageResponse renders raw image elements. */
import { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { CONFIG } from '@/config';
import { getActiveLimitedBanners } from '@/lib/active-banners';
import type { Banners } from '@/types/banner';
import type { Catalogs } from '@/types/catalog';

export const alt = 'Headhunt.cc — Active Arknights: Endfield banners';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-dynamic';

async function loadImage(path: string) {
  try {
    const response = await fetch(new URL(path, CONFIG.baseUrl), {
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return undefined;
    const bytes = await response.arrayBuffer();
    return `data:image/png;base64,${Buffer.from(bytes).toString('base64')}`;
  } catch {
    return undefined;
  }
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.some((value) => value === locale)) notFound();
  const [banners, catalogs] = await Promise.all([
    import(`@/data/tracker/banners/${locale}.json`).then(
      (m) => m.default as Banners
    ),
    import(`@/data/tracker/catalogs/${locale}.json`).then(
      (m) => m.default as Catalogs
    ),
  ]);
  const active = getActiveLimitedBanners(banners, Date.now() / 1000);
  const featured = [
    ...active.filter((b) => !b.id.startsWith('weponbox')),
    ...active.filter((b) => b.id.startsWith('weponbox')),
  ];
  const columns = Math.min(
    featured.length <= 3 ? 3 : Math.ceil(featured.length / 2),
    4
  );
  const rows = Math.max(1, Math.ceil(featured.length / columns));
  const gap = 12;
  const cardHeight = (334 - (rows - 1) * gap) / rows;
  const scale = Math.min(1, cardHeight / 200);
  const compact = rows > 1;
  const rotations = await Promise.all(
    featured.map(async (banner) =>
      Promise.all(
        (banner.id.startsWith('special')
          ? [...new Set(banner.rotate ?? [])].filter(
              (id) => id !== banner.rateup
            )
          : []
        ).map(async (id) => ({
          id,
          name: catalogs[id]?.name ?? id,
          icon: catalogs[id]?.icon
            ? await loadImage(`/assets/${catalogs[id].icon}.png`)
            : undefined,
        }))
      )
    )
  );
  const [logo, ...icons] = await Promise.all([
    loadImage('/headhunt-logo.png'),
    ...featured.map((banner) => {
      const icon = catalogs[banner.rateup]?.icon;
      return icon
        ? loadImage(`/assets/${icon}.png`)
        : Promise.resolve(undefined);
    }),
  ]);
  const isId = locale === 'id';

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: '#111113',
        color: '#fafafa',
        padding: '40px 48px',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {logo ? (
          <img
            src={logo}
            width={240}
            height={56}
            alt="Headhunt.cc"
            style={{ objectFit: 'contain' }}
          />
        ) : (
          <span style={{ fontSize: 34, fontWeight: 700 }}>Headhunt.cc</span>
        )}
        <span style={{ marginLeft: 'auto', fontSize: 20, color: '#a3a3a3' }}>
          ARKNIGHTS: ENDFIELD
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: 28,
          marginBottom: 22,
          fontSize: 44,
          fontWeight: 700,
          color: '#facc15',
        }}
      >
        {isId ? 'Banner aktif saat ini' : 'Current active banners'}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'flex-start',
          gap,
          height: 334,
        }}
      >
        {featured.length === 0 ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 30,
              color: '#a3a3a3',
            }}
          >
            {isId
              ? 'Belum ada banner terbatas yang aktif.'
              : 'No limited banners are currently active.'}
          </div>
        ) : (
          featured.map((banner, index) => (
            <div
              key={banner.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: (1104 - (columns - 1) * gap) / columns,
                height: cardHeight,
                position: 'relative',
                background: '#242426',
                borderRadius: 20,
                padding: `${20 * scale}px ${24 * scale}px`,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: compact ? 20 * scale : 140,
                }}
              >
                <span style={{ fontSize: 16 * scale, color: '#facc15' }}>
                  {banner.id.startsWith('weponbox') ? 'WEAPON' : 'OPERATOR'}
                </span>
                {icons[index] && (
                  <img
                    src={icons[index]}
                    width={compact ? 110 * scale : 140}
                    height={compact ? 110 * scale : 140}
                    alt=""
                    style={{
                      objectFit: 'contain',
                      position: compact ? 'absolute' : 'relative',
                      right: compact ? 16 : undefined,
                      top: compact ? 28 : undefined,
                    }}
                  />
                )}
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: 28 * scale,
                  width: compact
                    ? (1104 - (columns - 1) * gap) / columns - 140 * scale
                    : undefined,
                  fontWeight: 700,
                  marginTop: 10 * scale,
                }}
              >
                {catalogs[banner.rateup]?.name ?? banner.rateup}
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: 19 * scale,
                  width: compact
                    ? (1104 - (columns - 1) * gap) / columns - 140 * scale
                    : undefined,
                  marginTop: 8 * scale,
                  color: '#a3a3a3',
                }}
              >
                {banner.name}
              </div>
              {rotations[index].length > 0 && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10 * scale,
                    marginTop: 12 * scale,
                  }}
                >
                  {rotations[index].map((character) => (
                    <div
                      key={character.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6 * scale,
                      }}
                    >
                      {character.icon && (
                        <img
                          src={character.icon}
                          alt={character.name}
                          width={36 * scale}
                          height={36 * scale}
                          style={{ objectFit: 'contain', borderRadius: 6 }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: 22,
          color: '#a3a3a3',
          fontSize: 20,
        }}
      >
        {isId
          ? 'Pantau pity dan riwayat pull kamu'
          : 'Track your pity and pull history'}
        <span style={{ marginLeft: 'auto', color: '#fafafa' }}>
          headhunt.cc/{locale}
        </span>
      </div>
    </div>,
    {
      ...size,
      headers: { 'Cache-Control': 'public, max-age=300, s-maxage=300' },
    }
  );
}
