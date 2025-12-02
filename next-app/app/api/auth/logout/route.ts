import { NextRequest, NextResponse } from 'next/server';
import { SupabaseAuthService } from '@/lib/supabaseAuthService';

// ログアウト
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization') ?? '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!token) {
    return NextResponse.json(
      { error: 'No access token provided' },
      { status: 400 }
    );
  }

  const { json, status } = await SupabaseAuthService.logout(token);

  // 204 の場合は body ではなく 200 と message を返す
  return NextResponse.json(
    json?.error ? json : { message: 'Logout successful' },
    { status: 200 }
  );
}
