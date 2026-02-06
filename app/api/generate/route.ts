import { NextRequest, NextResponse } from 'next/server';

// Access the global simulation function set by server.js
declare global {
  var simulateGeneration: (
    generationId: string,
    prompt: string
  ) => Promise<void>;
}

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const generationId = `gen-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Start the generation simulation asynchronously
    if (global.simulateGeneration) {
      global.simulateGeneration(generationId, prompt).catch(console.error);
    }

    return NextResponse.json({
      id: generationId,
      prompt,
      status: 'pending',
      progress: 0,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to start generation' },
      { status: 500 }
    );
  }
}
