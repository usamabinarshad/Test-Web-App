import { renderHook, act, waitFor } from '@testing-library/react';
import { useLocalStorage } from '../hooks/useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with default value and marks loaded', async () => {
    const { result } = renderHook(() => useLocalStorage('test_key', { count: 0 }));

    expect(result.current.value).toEqual({ count: 0 });
    await waitFor(() => {
      expect(result.current.loaded).toBe(true);
    });
  });

  it('updates state and persists to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test_key', 'init'));

    act(() => {
      result.current.update('updated');
    });

    expect(result.current.value).toBe('updated');
    expect(JSON.parse(localStorage.getItem('test_key') || '""')).toBe('updated');
  });

  it('clears state back to initial value and removes item from localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test_key', 'init'));

    act(() => {
      result.current.update('updated');
    });
    expect(localStorage.getItem('test_key')).not.toBeNull();

    act(() => {
      result.current.clear();
    });

    expect(result.current.value).toBe('init');
    expect(localStorage.getItem('test_key')).toBeNull();
  });
});
