import { NextResponse } from 'next/server';
import { FEATURED_CREATORS } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json({
    success: true,
    total: FEATURED_CREATORS.length,
    creators: FEATURED_CREATORS
  });
}
