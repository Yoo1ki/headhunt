import { TRACKER_CONFIG, TRACKER_IMPORT_PAGE_URL } from '@/config/tracker';

export const OFFICIAL_RECORDBOOK_URL =
  TRACKER_CONFIG.import.officialRecordBookUrl;

// This runs only when the user opens the bookmark on the official Record Book.
// It reads the short-lived gacha token already exposed to that page, creates a
// Headhunt.cc-compatible URL, and copies it locally. No network request is made.
export const WEB_IMPORT_BOOKMARKLET = [
  'javascript:(async()=>{',
  'try{',
  "let token='';",
  'for(const[key,value]of Object.entries(sessionStorage)){',
  "if(key.startsWith('APP_ROLE_U8_TOKEN:')){",
  "token=String(value).split(':')[0];",
  'break;',
  '}',
  '}',
  "if(!token)throw new Error('Token not found. Log in, select your character, then refresh the page.');",
  `const importUrl='${TRACKER_IMPORT_PAGE_URL}?token='+encodeURIComponent(token)+'&server_id=${TRACKER_CONFIG.import.autoServerId}';`,
  'try{',
  'await navigator.clipboard.writeText(importUrl);',
  "alert('Import URL copied. Return to Headhunt.cc and paste it.');",
  '}catch{',
  "prompt('Copy this import URL:',importUrl);",
  '}',
  '}catch(error){',
  "alert('Error: '+(error instanceof Error?error.message:String(error)));",
  '}',
  '})();',
].join('');
