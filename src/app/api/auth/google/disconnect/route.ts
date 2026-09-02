import { NextResponse } from 'next/server';
import { GOOGLE_TOKEN_COOKIE } from '@/lib/google-oauth';

export const POST = async () => {
  const response = NextResponse.json({ connected: false });
  response.cookies.delete(GOOGLE_TOKEN_COOKIE);
  return response;
};
