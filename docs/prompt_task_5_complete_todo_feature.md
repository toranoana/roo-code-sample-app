## TODOを完了済みにする機能を実装する

### プロンプト

1.  `src/hooks/useTodos.ts` に `completeTodo` 関数を追加してください。この関数はTODOのタイトルを受け取り、対応するTODOの `completed` フラグを `true` に設定するようにTODOリストを更新します。
2.  `src/components/TodoList.tsx` のTODOリストで、各TODOの「完了」ボタンがクリックされたら、対応するTODOが完了済みに切り替わるように実装してください。
3.  TODOが完了済みになったら、タイトルに打ち消し線（`line-through`）を適用し、完了ボタンを「完了済み」というテキストに表示を切り替えてください。 