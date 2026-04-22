import { NextResponse } from "next/server";

export interface ApiResponse<T = unknown> {
  error?: string;
  data?: T;
}

export const jsonSuccess = <T>(data: T, status = 200) =>
  NextResponse.json<ApiResponse<T>>({ data }, { status });

export const jsonError = (error: string, status = 400) =>
  NextResponse.json<ApiResponse<null>>({ error }, { status });
