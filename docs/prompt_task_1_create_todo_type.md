## TODO型の作成

### プロンプト

`src/lib/types/index.ts` に以下の内容で `Todo` 型を作成してください。
`Todo` は `id` (数値)、`title` (文字列)、`completed` (真偽値) のプロパティを持つようにします。

```typescript
export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};
``` 