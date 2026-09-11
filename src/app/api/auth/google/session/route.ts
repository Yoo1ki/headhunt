import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getGoogleOAuthConfig, GOOGLE_TOKEN_COOKIE } from '@/lib/google-oauth';

export const GET = async (request: NextRequest) => {
  const config = getGoogleOAuthConfig();
  const refreshToken = request.cookies.get(GOOGLE_TOKEN_COOKIE)?.value;
  if (!config || !refreshToken) return NextResponse.json({ connected: false });

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      grant_type: 'refresh_token',
    }),
  });
  const token = (await tokenResponse.json()) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
  };
  if (!tokenResponse.ok || !token.access_token) {
    if (tokenResponse.status !== 400 || token.error !== 'invalid_grant') {
      return NextResponse.json(
        { error: 'Failed to refresh Google session' },
        { status: 503 }
      );
    }
    const response = NextResponse.json({ connected: false });
    response.cookies.delete(GOOGLE_TOKEN_COOKIE);
    return response;
  }

  const userResponse = await fetch(
    'https://openidconnect.googleapis.com/v1/userinfo',
    {
      headers: { Authorization: `Bearer ${token.access_token}` },
    }
  );
  const user = (await userResponse.json()) as { email?: string };
  return NextResponse.json({
    connected: true,
    email: user.email ?? '',
    accessToken: token.access_token,
    expiresAt: Date.now() + (token.expires_in ?? 3600) * 1000,
  });
};
