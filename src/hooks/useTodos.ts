"use client";

import { useState, useRef } from 'react';
import { Todo } from '../lib/types';

export const useTodos = () => {
  const idRef = useRef(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string) => {
    idRef.current++;
    setTodos(prev => [...prev, { id: idRef.current, title, completed: false }]);
  };

  // TODOを完了済みにする関数
  const completeTodo = (title: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.title === title ? { ...todo, completed: true } : todo
      )
    );
  };

  // TODOの完了を取り消す関数
  const uncompleteTodo = (title: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.title === title ? { ...todo, completed: false } : todo
      )
    );
  };

  // TODOを削除する関数
  const deleteTodo = (title: string) => {
    setTodos(prev => prev.filter(todo => todo.title !== title));
  };

  return {
    todos,
    addTodo,
    completeTodo,
    uncompleteTodo,
    deleteTodo,
  };
}; 