import { combineReducers } from '@reduxjs/toolkit';

import bookmarkSlice from '@/store/reducers/bookmarkSlice';

export const rootReducer = combineReducers({ bookmark: bookmarkSlice });

export type RootState = ReturnType<typeof rootReducer>;
