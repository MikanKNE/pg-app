import { NextRequest, NextResponse } from 'next/server';

const DIFY_API_URL = process.env.DIFY_API_URL;
const DIFY_API_KEY = process.env.DIFY_API_KEY;

export async function POST(req: NextRequest) {
  try {
    console.log('DIFY_API_URL:', DIFY_API_URL);
    console.log('DIFY_API_KEY:', DIFY_API_KEY ? 'OK' : 'NG');

    const { query } = await req.json();

    if (!query) {
      return NextResponse.json(
        { error: 'query is required' },
        { status: 400 }
      );
    }

    if (!DIFY_API_URL || !DIFY_API_KEY) {
      return NextResponse.json(
        { error: 'Dify env not set' },
        { status: 500 }
      );
    }

    const res = await fetch(DIFY_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${DIFY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: {
          query,
        },
        response_mode: 'blocking',
        user: 'memo-app',
      }),
    });

    const data = await res.json();
    console.log('Dify response:', data);

    const summary =
      data?.data?.outputs?.text ??
      data?.data?.outputs?.summary ??
      data?.answer ??
      '要約を取得できませんでした';

    return NextResponse.json({ summary });
  } catch (e) {
    console.error('AI summary error:', e);
    return NextResponse.json(
      { error: 'AI summary failed' },
      { status: 500 }
    );
  }
}
