import { CONFIG } from '@/config';

export const GOOGLE_TOKEN_COOKIE = 'headhunt_google_refresh_token';
export const GOOGLE_STATE_COOKIE = 'headhunt_google_oauth_state';
export const GOOGLE_RETURN_COOKIE = 'headhunt_google_oauth_return';
export const GOOGLE_OAUTH_SCOPE = [
  'openid',
  'email',
  'https://www.googleapis.com/auth/drive.appdata',
].join(' ');

export const getGoogleOAuthConfig = () => {
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!CONFIG.googleClientId || !clientSecret) return null;

  return { clientId: CONFIG.googleClientId, clientSecret };
};

export const getGoogleRedirectUri = (origin: string) =>
  `${origin}/api/auth/google/callback`;
