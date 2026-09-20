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
  const clientId =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? CONFIG.googleClientId;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  return { clientId, clientSecret };
};

export const getGoogleRedirectUri = (origin: string) =>
  `${origin}/api/auth/google/callback`;

export const getGoogleReturnTo = (
  value: string | undefined,
  origin: string
) => {
  try {
    if (!value) return '/';
    const url = new URL(value, origin);
    if (url.origin !== origin) return '/';
    // Keep the absolute URL so a normalized pathname starting with // cannot
    // be interpreted as a different host when the callback resolves it again.
    return url.href;
  } catch {
    return '/';
  }
};
