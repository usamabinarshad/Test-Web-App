import { NextResponse } from 'next/server';
import { questions } from '@/data/questions';

export async function GET() {
  const sanitized = questions.map(({ id, text, options }) => ({
    id,
    text,
    options,
  }));

  return NextResponse.json({
    success: true,
    data: sanitized,
  });
}
