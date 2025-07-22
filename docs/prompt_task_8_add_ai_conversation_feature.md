## AIとの会話機能を追加する

### プロンプト

1.  **APIユーティリティの作成**:
    *   `src/lib/OpenAIChatApi.ts` に、OpenAI APIへのリクエストを送信する `callChatApi` 非同期関数を作成してください。
    *   この関数は `messages` を引数に取り、OpenAI APIが期待するJSON形式 (`{"model": "o4-mini", "messages": [{ role: ..., "content": ...}}]`) でリクエストを構築します。
    *   APIキー、API URLは `.env.local` ファイルから取得するようにしてください。
    *   レスポンスの型定義 `ChatResponse` も含めてください。

2.  **APIルートの作成**:
    *   `src/app/api/openai-chat/route.ts` に Next.js の App Router を利用した API ルートを作成してください。
    *   このルートは `POST` リクエストを受け付け、リクエストボディからユーザーメッセージ（`{role: "user", content: ...}`）を抽出します。
    *   システムプロンプトは、`"あなたはツンデレな幼馴染キャラクターです。ユーザーには素っ気ない言葉遣いですが、時折本当は気にかけている様子を見せてください。"` を指定するようにしてください。
    *   抽出したメッセージを `ChatResponse` に渡し、その結果をクライアントに返却してください。
    *   エラーハンドリングも行ってください。

3.  **カスタムフックの作成**:
    *   `src/hooks/useOpenAIChat.ts` に `useOpenAIChat` というカスタムフックを作成してください。
    *   このフックは `loading`（API通信中か）、`response`（APIからのレスポンス）、`error`（エラーメッセージ）、`sendMessage`（APIルートを呼び出す関数）を返却します。
    *   `sendMessage` 関数は `/api/openai-chat` APIルートを呼び出すように実装してください。

4.  **UIへの組み込み**:
    *   `src/components/TodoList.tsx` に `useOpenAIChat` フックをインポートし、利用してください。
    *   TODO追加用のテキストボックスの横に「TALK」ボタンを追加してください。
    *   「TALK」ボタンがクリックされたら、テキストボックスの現在の内容をユーザーメッセージとして `useOpenAIChat` の `sendMessage` 関数に渡してください。
    *   APIレスポンスが表示されるエリアをテキストボックスの上に配置し、`loading`、`error`、`response`の状態に応じて表示を切り替えてください。
    *   `response` がある場合、その `choice[0].message.content` を表示してください。
    *   レスポンス表示の横に、`public`ディレクトリに配置したキャラクター画像（例: `/35_coffebreak.png`）を表示してください。画像はレスポンステキストの左側に配置し、垂直方向の中央に揃えてください。 