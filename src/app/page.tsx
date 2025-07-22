import TodoList from '../components/TodoList';

export default function Page() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">TODOアプリ</h1>
      <TodoList />
    </div>
  );
}