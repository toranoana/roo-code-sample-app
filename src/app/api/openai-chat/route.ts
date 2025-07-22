import { NextResponse } from 'next/server';
import { callChatApi, ChatMessage } from '../../../lib/openAIChatApi';

export async function POST(request: Request) {
  try {
    const body = await request.json() as { role: string; content: string };
    const { role, content } = body;
    if (role !== 'user' || typeof content !== 'string') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
    const messages: ChatMessage[] = [{ role, content }];
    const result = await callChatApi(messages);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}