import { useMemo } from 'react'
import { createStore, applyMiddleware, Store, PreloadedState } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import reducers from 'reducers'
import actionTypes from 'actions/types'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

let store: any

function initStore(initialState?: PreloadedState<any>) {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}

function firstInitStore(initialState: PreloadedState<any>) {
    if(typeof window !== 'undefined') {
        initialState = { ...initialState,  user: { inLogin: true, userInfo: { Name: 'akbar' } } } 
    }
    return initStore(initialState)
}

export const initializeStore = (preloadedState: PreloadedState<any>) => {
  let _store = store ?? firstInitStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}

// typescript
export interface Action<TActionType extends actionTypes, TActionPayload=undefined > {
    type: TActionType
    payload: TActionPayload
}

const STORE_INSTANCE = initStore();
export type RootState = ReturnType<typeof STORE_INSTANCE.getState>;
export type AppDispatch = typeof STORE_INSTANCE.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;