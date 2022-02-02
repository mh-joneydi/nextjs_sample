import { useMemo } from 'react'
import { createStore, applyMiddleware, Store, PreloadedState, Dispatch, AnyAction } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import reducers from 'reducers'
import actionTypes from 'actions/types'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import globalStorage from 'lib/globalStorage'
import { TAlertActions } from 'reducers/slices/alertReducer'
import { TUserReducerActions } from 'reducers/slices/userReducer'
import { TNewsActions } from 'reducers/slices/newsReducer'
import { TDialogActions } from 'reducers/slices/dialogReducer'

let store: any;

function initStore(initialState?: PreloadedState<any>) {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}

function firstInitStore(initialState: PreloadedState<any>) {
    if(typeof window !== 'undefined' ) {
      globalStorage.getItem('USER_TOKEN')
      ? initialState = { ...initialState,  user: { isLogin: true, userInfo: globalStorage.getItem('USER_INFO') } } 
      : globalStorage.clear()
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
  if (!store) store = _store;

  return _store
}

export function useStore(initialState: any) {
  const store = useMemo( () => initializeStore(initialState), [initialState] )
  return store
}

// typescript

export type TAction<TActionType extends actionTypes, TActionPayload=void> = TActionPayload extends void 
? { type: TActionType } 
: { type: TActionType, payload: TActionPayload }

type RemoveIndex<T> = {
  [ K in keyof T as string extends K ? never : number extends K ? never : K ] : T[K]
};
type TStoreDispatch = ReturnType<typeof STORE_INSTANCE.dispatch>;
// type TValidActions = TStoreDispatch extends any ? RemoveIndex<AnyAction> : never;
type TValidActions = TUserReducerActions|TAlertActions|TNewsActions|TDialogActions;


const STORE_INSTANCE = initStore();
export type RootState = ReturnType<typeof STORE_INSTANCE.getState>;
export type AppDispatch = ( action : TValidActions|void )=> void
export type TActionCreator = TValidActions

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;