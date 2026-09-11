import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  getGoogleOAuthConfig,
  getGoogleRedirectUri,
  getGoogleReturnTo,
  GOOGLE_OAUTH_SCOPE,
  GOOGLE_RETURN_COOKIE,
  GOOGLE_STATE_COOKIE,
} from '@/lib/google-oauth';

export const GET = (request: NextRequest) => {
  const config = getGoogleOAuthConfig();
  if (!config) {
    return NextResponse.json(
      { error: 'Google OAuth is not configured' },
      { status: 503 }
    );
  }

  const state = crypto.randomUUID();
  const requestedReturnTo = request.nextUrl.searchParams.get('returnTo') ?? '/';
  const returnTo = getGoogleReturnTo(requestedReturnTo, request.nextUrl.origin);
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: getGoogleRedirectUri(request.nextUrl.origin),
    response_type: 'code',
    scope: GOOGLE_OAUTH_SCOPE,
    access_type: 'offline',
    prompt: 'consent',
    include_granted_scopes: 'true',
    state,
  });
  const response = NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params}`
  );
  const cookieOptions = {
    httpOnly: true,
    secure: request.nextUrl.protocol === 'https:',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 600,
  };
  response.cookies.set(GOOGLE_STATE_COOKIE, state, cookieOptions);
  response.cookies.set(GOOGLE_RETURN_COOKIE, returnTo, cookieOptions);
  return response;
};
