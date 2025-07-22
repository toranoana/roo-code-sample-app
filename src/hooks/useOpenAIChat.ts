import { useState } from 'react';
import { ChatResponse } from '../lib/openAIChatApi';

/**
 * OpenAI Chat APIとのやりとりを行うカスタムフック
 */
export function useOpenAIChat() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ChatResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * メッセージを送信し、APIルートを呼び出してレスポンスを受け取る
   */
  const sendMessage = async (content: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/openai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'user', content }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }
      const data: ChatResponse = await res.json();
      setResponse(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    response,
    error,
    sendMessage,
  };
}