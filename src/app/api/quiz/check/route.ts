import { NextResponse } from 'next/server';
import { questions } from '@/data/questions';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid request payload' },
        { status: 400 }
      );
    }

    const { questionId, selectedIndex } = body;

    if (!questionId || typeof questionId !== 'string') {
      return NextResponse.json(
        { success: false, error: 'questionId is required and must be a string' },
        { status: 400 }
      );
    }

    if (
      selectedIndex === undefined ||
      typeof selectedIndex !== 'number' ||
      selectedIndex < 0 ||
      selectedIndex > 4
    ) {
      return NextResponse.json(
        { success: false, error: 'selectedIndex must be a number between 0 and 4' },
        { status: 400 }
      );
    }

    const question = questions.find((q) => q.id === questionId);

    if (!question) {
      return NextResponse.json(
        { success: false, error: 'Question not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        correct: question.correctIndex === selectedIndex,
        correctIndex: question.correctIndex,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
