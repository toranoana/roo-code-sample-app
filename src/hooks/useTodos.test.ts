import { renderHook, act } from '@testing-library/react';
import { useTodos } from './useTodos';

describe('useTodos', () => {
  it('初期状態で空の配列を返すこと', () => {
    const { result } = renderHook(() => useTodos());

    expect(result.current.todos).toEqual([]);
  });

  it('TODOを追加できること', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.addTodo('テストTODO');
    });
      expect(result.current.todos).toEqual([
      { id: 1, title: 'テストTODO', completed: false },
    ]);
  });

  it('TODOを完了済みにできること', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.addTodo('完了TODO');
    });
    act(() => {
      result.current.completeTodo('完了TODO');
    });
    expect(result.current.todos).toEqual([
      { id: 1, title: '完了TODO', completed: true },
    ]);
  });

  it('TODOの完了済みを戻せること', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.addTodo('リセットTODO');
      result.current.completeTodo('リセットTODO');
      result.current.uncompleteTodo('リセットTODO');
    });
    expect(result.current.todos).toEqual([
      { id: 1, title: 'リセットTODO', completed: false },
    ]);
  });

  it('TODOを削除できること', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.addTodo('削除TODO');
    });
    act(() => {
      result.current.deleteTodo('削除TODO');
    });
    expect(result.current.todos).toEqual([]);
  });
}); 