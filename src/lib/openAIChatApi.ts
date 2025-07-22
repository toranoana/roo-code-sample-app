export type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export interface ChatResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: ChatMessage;
    finish_reason: string | null;
  }>;
}

export async function callChatApi(
  messages: ChatMessage[],
  systemInstruction: string = "あなたはツンデレな幼馴染キャラクターです。ユーザーには素っ気ない言葉遣いですが、時折本当は気にかけている様子を見せてください。"
): Promise<ChatResponse> {
  const apiKey = process.env.OPENAI_API_KEY;
  const apiUrl = process.env.OPENAI_API_URL;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not defined in environment variables');
  }
  if (!apiUrl) {
    throw new Error('OPENAI_API_URL is not defined in environment variables');
  }

  const payload = {
    model: "o4-mini",
    messages: [
      { role: 'system', content: systemInstruction },
      ...messages.map(msg => ({ role: msg.role, content: msg.content })),
    ],
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${text}`);
  }

  return response.json();
}
