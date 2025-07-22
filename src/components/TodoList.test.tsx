import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';
import { vi } from 'vitest';

// useTodosフックをモックする
const mockUseTodos = vi.fn(() => []);
const mockDeleteTodo = vi.fn();
vi.mock('../hooks/useTodos', () => ({
  useTodos: () => ({ todos: mockUseTodos(), deleteTodo: mockDeleteTodo }),
}));

 // useOpenAIChatフックをモックする
 const mockUseOpenAIChat = vi.fn(() => ({ loading: false, response: null, error: null, sendMessage: vi.fn() }));
 vi.mock('../hooks/useOpenAIChat', () => ({
   useOpenAIChat: () => mockUseOpenAIChat(),
 }));

describe('TodoListコンポーネント', () => {
  beforeEach(() => {
    mockUseTodos.mockReset();
  });

  it('初期状態でTODOがない場合はメッセージを表示する', () => {
    mockUseTodos.mockReturnValue([]);
    render(<TodoList />);
    expect(screen.getByText('TODOはありません。')).toBeInTheDocument();
  });

  it('TODOが存在する場合はテーブル行を表示する', () => {
    mockUseTodos.mockReturnValue([{ id: 1, title: 'Sample', completed: false }]);
    render(<TodoList />);
    expect(screen.getByText('Sample')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '完了' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '削除' })).toBeInTheDocument();
  });

  it('完了済みのTODOには打ち消し線が適用され、完了取消しボタンを表示する', () => {
    mockUseTodos.mockReturnValue([{ id: 2, title: '完了済みT', completed: true }]);
    render(<TodoList />);
    const title = screen.getByText('完了済みT');
    expect(title).toHaveClass('line-through');
    const undoBtn = screen.getByRole('button', { name: '完了取消し' });
    expect(undoBtn).toBeInTheDocument();
  });

  it('削除ボタンをクリックするとdeleteTodoが呼ばれる', () => {
    mockUseTodos.mockReturnValue([{ id: 3, title: 'Sample', completed: false }]);
    render(<TodoList />);
    const deleteBtn = screen.getByRole('button', { name: '削除' });
    fireEvent.click(deleteBtn);
    expect(mockDeleteTodo).toHaveBeenCalledWith('Sample');
  });

  it('TALKボタンをクリックするとsendMessageが呼ばれる', () => {
    const mockSend = vi.fn();
    mockUseOpenAIChat.mockReturnValue({ loading: false, response: null, error: null, sendMessage: mockSend });
    render(<TodoList />);
    const input = screen.getByPlaceholderText('新しいTODOを入力');
    fireEvent.change(input, { target: { value: 'こんにちは' } });
    const talkBtn = screen.getByRole('button', { name: 'TALK' });
    fireEvent.click(talkBtn);
    expect(mockSend).toHaveBeenCalledWith('こんにちは');
  });

  it('loading中はLoading...を表示する', () => {
    mockUseOpenAIChat.mockReturnValue({ loading: true, response: null, error: null, sendMessage: vi.fn() });
    render(<TodoList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('errorがあるとエラーメッセージを表示する', () => {
    mockUseOpenAIChat.mockReturnValue({ loading: false, response: null, error: 'エラー', sendMessage: vi.fn() });
    render(<TodoList />);
    expect(screen.getByText('エラー')).toBeInTheDocument();
  });

  it('responseがあるとレスポンスを表示する', () => {
    const choiceResponse = { choices: [{ index: 0, message: { role: 'assistant', content: 'レスポンス' }, finish_reason: null }] };
    mockUseOpenAIChat.mockReturnValue({ loading: false, response: choiceResponse, error: null, sendMessage: vi.fn() });
    render(<TodoList />);
    expect(screen.getByText('レスポンス')).toBeInTheDocument();
  });
}); 