import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import logger from 'redux-logger';

import { rootReducer } from '@/store/reducers';

export const store = configureStore({
  reducer: rootReducer,
  ...(__DEV__ && { middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger) }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
