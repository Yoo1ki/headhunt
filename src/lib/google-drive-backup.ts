const DRIVE_API_URL = 'https://www.googleapis.com/drive/v3';
const DRIVE_UPLOAD_URL = 'https://www.googleapis.com/upload/drive/v3';
const LEGACY_BACKUP_FILE_NAME = 'headhunt-backup.json';
const BACKUP_FILE_PREFIX = 'headhunt-backup-';

export type GoogleDriveSession = {
  accessToken: string;
  expiresAt: number;
  email?: string;
};

export const getGoogleDriveSession =
  async (): Promise<GoogleDriveSession | null> => {
    const response = await fetch('/api/auth/google/session', {
      cache: 'no-store',
    });
    if (!response.ok)
      throw new GoogleDriveError(
        'Failed to restore Google session',
        response.status
      );
    const data = (await response.json()) as {
      connected: boolean;
      accessToken?: string;
      expiresAt?: number;
      email?: string;
    };
    if (!data.connected || !data.accessToken || !data.expiresAt) return null;
    return {
      accessToken: data.accessToken,
      expiresAt: data.expiresAt,
      email: data.email,
    };
  };

export const beginGoogleDriveConnection = (returnTo: string) => {
  window.location.assign(
    `/api/auth/google/start?${new URLSearchParams({ returnTo })}`
  );
};

export const disconnectGoogleDriveSession = async () => {
  await fetch('/api/auth/google/disconnect', { method: 'POST' });
};

export const unlinkGoogleDriveSession = async () => {
  await fetch('/api/auth/google/unlink', { method: 'POST' });
};

export type GoogleDriveBackupFile = {
  id: string;
  name: string;
  createdTime: string;
  modifiedTime: string;
  size: number;
  contentHash?: string;
};

export class GoogleDriveError extends Error {
  constructor(
    message: string,
    public readonly status?: number
  ) {
    super(message);
    this.name = 'GoogleDriveError';
  }
}

const driveFetch = async (
  accessToken: string,
  input: string,
  init?: RequestInit
) => {
  const response = await fetch(input, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new GoogleDriveError('Google Drive request failed', response.status);
  }

  return response;
};

export const listGoogleDriveBackups = async (
  session: GoogleDriveSession
): Promise<GoogleDriveBackupFile[]> => {
  const params = new URLSearchParams({
    spaces: 'appDataFolder',
    q: `(name contains '${BACKUP_FILE_PREFIX}' or name = '${LEGACY_BACKUP_FILE_NAME}') and trashed = false`,
    fields:
      'nextPageToken,files(id,name,createdTime,modifiedTime,size,appProperties)',
    orderBy: 'modifiedTime desc',
    pageSize: '100',
  });
  const backups: GoogleDriveBackupFile[] = [];
  let nextPageToken: string | undefined;
  do {
    if (nextPageToken) params.set('pageToken', nextPageToken);
    const response = await driveFetch(
      session.accessToken,
      `${DRIVE_API_URL}/files?${params}`
    );
    const data = (await response.json()) as {
      nextPageToken?: string;
      files?: Array<
        Omit<GoogleDriveBackupFile, 'size' | 'contentHash'> & {
          size?: string;
          appProperties?: { contentHash?: string };
        }
      >;
    };
    backups.push(
      ...(data.files ?? []).map((file) => ({
        ...file,
        size: Number(file.size ?? 0),
        contentHash: file.appProperties?.contentHash,
      }))
    );
    nextPageToken = data.nextPageToken;
  } while (nextPageToken);
  return backups;
};

export const setGoogleDriveBackupHash = async (
  session: GoogleDriveSession,
  fileId: string,
  contentHash: string
) => {
  await driveFetch(session.accessToken, `${DRIVE_API_URL}/files/${fileId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ appProperties: { contentHash } }),
  });
};

export const deleteAllGoogleDriveBackups = async (
  session: GoogleDriveSession
) => {
  const backups = await listGoogleDriveBackups(session);
  await Promise.all(
    backups.map((backup) =>
      driveFetch(session.accessToken, `${DRIVE_API_URL}/files/${backup.id}`, {
        method: 'DELETE',
      })
    )
  );
};

export const uploadGoogleDriveBackup = async (
  session: GoogleDriveSession,
  backup: TrackerBackup
): Promise<GoogleDriveBackupFile> => {
  const content = JSON.stringify(backup);
  const contentHash = await calculateTrackerBackupHash(backup);
  const timestamp = new Date().toISOString().replaceAll(':', '-');
  const metadata = JSON.stringify({
    name: `${BACKUP_FILE_PREFIX}${timestamp}.json`,
    parents: ['appDataFolder'],
    mimeType: 'application/json',
    appProperties: { contentHash },
  });
  const boundary = `headhunt-${crypto.randomUUID()}`;
  const body = [
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metadata}`,
    `--${boundary}\r\nContent-Type: application/json\r\n\r\n${content}`,
    `--${boundary}--`,
  ].join('\r\n');

  const response = await driveFetch(
    session.accessToken,
    `${DRIVE_UPLOAD_URL}/files?uploadType=multipart&fields=id,name,createdTime,modifiedTime,size,appProperties`,
    {
      method: 'POST',
      headers: { 'Content-Type': `multipart/related; boundary=${boundary}` },
      body,
    }
  );
  const file = (await response.json()) as Omit<
    GoogleDriveBackupFile,
    'size' | 'contentHash'
  > & { size?: string; appProperties?: { contentHash?: string } };
  return {
    ...file,
    size: Number(file.size ?? content.length),
    contentHash: file.appProperties?.contentHash ?? contentHash,
  };
};

export const downloadGoogleDriveBackup = async (
  session: GoogleDriveSession,
  fileId?: string
): Promise<unknown> => {
  const resolvedFileId =
    fileId ?? (await listGoogleDriveBackups(session))[0]?.id;
  if (!resolvedFileId)
    throw new GoogleDriveError('Backup file was not found', 404);

  const response = await driveFetch(
    session.accessToken,
    `${DRIVE_API_URL}/files/${resolvedFileId}?alt=media`
  );
  return response.json() as Promise<unknown>;
};
import {
  calculateTrackerBackupHash,
  type TrackerBackup,
} from './tracker-backup';
