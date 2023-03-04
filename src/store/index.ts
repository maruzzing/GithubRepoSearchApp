import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { rootReducer } from '@/store/reducers';

export const store = configureStore({
  reducer: rootReducer,
  ...(__DEV__ && { middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger) }),
});

export type RootState = ReturnType<typeof store.getState>;
