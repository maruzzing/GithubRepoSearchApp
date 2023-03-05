import { combineReducers } from '@reduxjs/toolkit';

import repositoryReducer from '@/store/reducers/repositorySlice';
import searchReducer from '@/store/reducers/searchSlice';
import bannerReducer from '@/store/reducers/bannerSlice';

export const rootReducer = combineReducers({
  repositories: repositoryReducer,
  search: searchReducer,
  banner: bannerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
