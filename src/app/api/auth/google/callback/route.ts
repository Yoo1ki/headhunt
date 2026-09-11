import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  getGoogleOAuthConfig,
  getGoogleRedirectUri,
  getGoogleReturnTo,
  GOOGLE_RETURN_COOKIE,
  GOOGLE_STATE_COOKIE,
  GOOGLE_TOKEN_COOKIE,
} from '@/lib/google-oauth';

export const GET = async (request: NextRequest) => {
  const config = getGoogleOAuthConfig();
  const state = request.nextUrl.searchParams.get('state');
  const storedState = request.cookies.get(GOOGLE_STATE_COOKIE)?.value;
  const returnTo = getGoogleReturnTo(
    request.cookies.get(GOOGLE_RETURN_COOKIE)?.value,
    request.nextUrl.origin
  );
  if (!config || !state || state !== storedState) {
    return NextResponse.redirect(new URL(returnTo, request.nextUrl.origin));
  }

  const code = request.nextUrl.searchParams.get('code');
  if (!code)
    return NextResponse.redirect(new URL(returnTo, request.nextUrl.origin));

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uri: getGoogleRedirectUri(request.nextUrl.origin),
      grant_type: 'authorization_code',
    }),
  });
  const token = (await tokenResponse.json()) as { refresh_token?: string };
  const response = NextResponse.redirect(
    new URL(returnTo, request.nextUrl.origin)
  );
  response.cookies.delete(GOOGLE_STATE_COOKIE);
  response.cookies.delete(GOOGLE_RETURN_COOKIE);
  if (tokenResponse.ok && token.refresh_token) {
    response.cookies.set(GOOGLE_TOKEN_COOKIE, token.refresh_token, {
      httpOnly: true,
      secure: request.nextUrl.protocol === 'https:',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    });
  }
  return response;
};
