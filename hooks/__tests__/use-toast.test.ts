import { renderHook, act } from '@testing-library/react'
import { useToast, reducer, genId } from '../use-toast'

describe('genId function', () => {
  it('generates unique sequential IDs', () => {
    const id1 = genId()
    const id2 = genId()
    const id3 = genId()
    
    expect(id1).not.toBe(id2)
    expect(id2).not.toBe(id3)
    expect(id1).not.toBe(id3)
  })

  it('generates string IDs', () => {
    const id = genId()
    expect(typeof id).toBe('string')
  })
})

describe('toast reducer', () => {
  const initialState = {
    toasts: []
  }

  it('handles ADD_TOAST action', () => {
    const toast = {
      id: '1',
      title: 'Test Toast',
      description: 'Test description'
    }

    const action = {
      type: 'ADD_TOAST' as const,
      toast
    }

    const newState = reducer(initialState, action)
    expect(newState.toasts).toHaveLength(1)
    expect(newState.toasts[0]).toEqual(toast)
  })

  it('handles UPDATE_TOAST action', () => {
    const initialStateWithToast = {
      toasts: [
        { id: '1', title: 'Original', description: 'Original desc' }
      ]
    }

    const action = {
      type: 'UPDATE_TOAST' as const,
      toast: {
        id: '1',
        title: 'Updated',
        description: 'Updated desc'
      }
    }

    const newState = reducer(initialStateWithToast, action)
    expect(newState.toasts[0].title).toBe('Updated')
    expect(newState.toasts[0].description).toBe('Updated desc')
  })

  it('handles DISMISS_TOAST action', () => {
    const initialStateWithToast = {
      toasts: [
        { id: '1', title: 'Test', open: true }
      ]
    }

    const action = {
      type: 'DISMISS_TOAST' as const,
      toastId: '1'
    }

    const newState = reducer(initialStateWithToast, action)
    expect(newState.toasts[0].open).toBe(false)
  })

  it('handles REMOVE_TOAST action', () => {
    const initialStateWithToast = {
      toasts: [
        { id: '1', title: 'Test' },
        { id: '2', title: 'Test 2' }
      ]
    }

    const action = {
      type: 'REMOVE_TOAST' as const,
      toastId: '1'
    }

    const newState = reducer(initialStateWithToast, action)
    expect(newState.toasts).toHaveLength(1)
    expect(newState.toasts[0].id).toBe('2')
  })

  it('limits toasts to TOAST_LIMIT', () => {
    const manyToasts = Array.from({ length: 10 }, (_, i) => ({
      id: `${i + 1}`,
      title: `Toast ${i + 1}`
    }))

    const initialStateWithManyToasts = {
      toasts: manyToasts
    }

    const action = {
      type: 'ADD_TOAST' as const,
      toast: { id: '11', title: 'New Toast' }
    }

    const newState = reducer(initialStateWithManyToasts, action)
    expect(newState.toasts).toHaveLength(1)
    expect(newState.toasts[0].id).toBe('11')
  })
})

describe('useToast hook', () => {
  it('provides toast function', () => {
    const { result } = renderHook(() => useToast())
    
    expect(typeof result.current.toast).toBe('function')
    expect(Array.isArray(result.current.toasts)).toBe(true)
  })

  it('adds toast when toast function is called', () => {
    const { result } = renderHook(() => useToast())
    
    act(() => {
      result.current.toast({
        title: 'Test Toast',
        description: 'Test description'
      })
    })

    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].title).toBe('Test Toast')
    expect(result.current.toasts[0].description).toBe('Test description')
  })

  it('returns dismiss function from toast call', () => {
    const { result } = renderHook(() => useToast())
    
    let dismissFunction: (() => void) | undefined
    
    act(() => {
      const toastResult = result.current.toast({
        title: 'Test Toast'
      })
      dismissFunction = toastResult.dismiss
    })

    expect(typeof dismissFunction).toBe('function')
  })
})