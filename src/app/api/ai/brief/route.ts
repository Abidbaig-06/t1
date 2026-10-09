import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    return NextResponse.json({
      success: true,
      data: {
        ...data,
        status: 'structured',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
