const repositoryUrl = 'https://github.com/Yoo1ki/headhunt';
const rawRepositoryUrl =
  'https://raw.githubusercontent.com/Yoo1ki/headhunt/refs/heads/main';

export const TRACKER_CONFIG = {
  api: {
    baseUrl: 'https://ef-webview.gryphline.com',
    characterRecordPath: '/api/record/char',
  },
  import: {
    autoServerId: 'auto',
    language: 'en-us',
    characterPoolType: 'E_CharacterGachaPoolType_Special',
    serverIds: ['2', '3'],
    officialRecordBookUrl: 'https://act.skport.com/endfield/recordBook',
    powershellScriptUrl: `${repositoryUrl}/blob/main/get-record-url.ps1`,
    powershellScriptRawUrl: `${rawRepositoryUrl}/get-record-url.ps1`,
  },
  profiles: {
    maxCount: 3,
  },
  backup: {
    maxFileSizeBytes: 10 * 1024 * 1024,
    historyPageSize: 5,
  },
} as const;

export const TRACKER_IMPORT_URL_BASE = new URL(
  TRACKER_CONFIG.api.characterRecordPath,
  TRACKER_CONFIG.api.baseUrl
).toString();

export const TRACKER_IMPORT_URL_EXAMPLE = `${TRACKER_IMPORT_URL_BASE}?...`;
