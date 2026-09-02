import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { GOOGLE_TOKEN_COOKIE } from '@/lib/google-oauth';

export const POST = async (request: NextRequest) => {
  const refreshToken = request.cookies.get(GOOGLE_TOKEN_COOKIE)?.value;
  if (refreshToken) {
    await fetch(
      `https://oauth2.googleapis.com/revoke?token=${encodeURIComponent(refreshToken)}`,
      { method: 'POST' }
    ).catch(() => undefined);
  }

  const response = NextResponse.json({ connected: false });
  response.cookies.delete(GOOGLE_TOKEN_COOKIE);
  return response;
};
