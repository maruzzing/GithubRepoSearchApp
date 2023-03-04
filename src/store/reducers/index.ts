import { combineReducers } from '@reduxjs/toolkit';

import repositoryReducer from '@/store/reducers/repositorySlice';
import searchReducer from '@/store/reducers/searchSlice';

export const rootReducer = combineReducers({ repositories: repositoryReducer, search: searchReducer });

export type RootState = ReturnType<typeof rootReducer>;
