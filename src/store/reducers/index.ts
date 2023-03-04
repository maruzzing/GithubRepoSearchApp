import { combineReducers } from '@reduxjs/toolkit';

import repositorySlice from '@/store/reducers/repositorySlice';

export const rootReducer = combineReducers({ repositories: repositorySlice });

export type RootState = ReturnType<typeof rootReducer>;
