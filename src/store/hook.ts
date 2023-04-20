
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { Action, AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'

import store from '.';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type MyThunkAction = ThunkAction<void, RootState, unknown, AnyAction>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
