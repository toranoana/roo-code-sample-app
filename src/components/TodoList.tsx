"use client";

import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { useOpenAIChat } from '../hooks/useOpenAIChat';
import { Todo } from '../lib/types';
import Image from 'next/image';

const TodoList: React.FC = () => {
  const { todos, addTodo, completeTodo, uncompleteTodo, deleteTodo } = useTodos();
  const { loading, response, error, sendMessage } = useOpenAIChat();
  const [newTitle, setNewTitle] = useState('');

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {response && (
        <div className="mb-4 p-2 border bg-gray-100 flex items-center">
          <Image
            src="/35_coffebreak.png"
            alt="キャラクター"
            width={60}
            height={60}
            className="rounded-full mr-2 flex-shrink-0"
          />
          <div className="flex-grow break-words">
            {response.choices[0]?.message.content}
          </div>
        </div>
      )}
      <div className="mb-4">
        <input
          type="text"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          className="border p-2 mr-2"
          placeholder="新しいTODOを入力"
        />
        <button
          onClick={() => {
            if (newTitle.trim()) {
              addTodo(newTitle.trim());
              setNewTitle('');
            }
          }}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          追加
        </button>
        <button
          onClick={() => sendMessage(newTitle)}
          className="bg-purple-500 text-white px-4 py-2 rounded ml-1"
        >
          TALK
        </button>
      </div>
      {
        todos.length === 0 ? (
          <p>TODOはありません。</p>
        ) : (
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">タイトル</th>
                <th className="border px-1 py-2">完了</th>
                <th className="border px-1 py-2">削除</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo: Todo) => (
                <tr key={todo.id}>
                  <td className="border px-4 py-2">
                    {todo.completed ? (
                      <span className="line-through text-gray-500">{todo.title}</span>
                    ) : (
                      <span>{todo.title}</span>
                    )}
                  </td>
                  <td className="border px-1 py-2 text-center">
                    {todo.completed ? (
                      <button
                        onClick={() => uncompleteTodo(todo.title)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        完了取消し
                      </button>
                    ) : (
                      <button
                        onClick={() => completeTodo(todo.title)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        完了
                      </button>
                    )}
                  </td>
                  <td className="border px-1 py-2 text-center">
                    <button
                      onClick={() => deleteTodo(todo.title)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </div>
  );
};

export default TodoList; 