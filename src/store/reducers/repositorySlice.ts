import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk, AnyAction, isAnyOf } from '@reduxjs/toolkit';

import type { Repository } from '@/types';

const STORE_KEY = 'repositories';

const STORAGE_MAX_LENGTH = 4;

interface RepositoryState {
  error: boolean;
  loading: boolean;
  data: Array<Repository>;
}

const initialState: RepositoryState = {
  loading: true,
  error: false,
  data: [],
};

export const getRepositories = createAsyncThunk<Array<Repository>>('repositories/getRepositories', async () => {
  const savedRepos = await AsyncStorage.getItem(STORE_KEY);
  return savedRepos ? JSON.parse(savedRepos) : [];
});

export const addRepository = createAsyncThunk<
  Array<Repository>,
  Repository,
  { state: { repositories: RepositoryState } }
>('repositories/addRepository', async (data, { getState }) => {
  const { data: currentData } = getState().repositories;
  if (currentData.length >= STORAGE_MAX_LENGTH) return currentData;
  const updatedData = [...currentData, data];
  await AsyncStorage.setItem(STORE_KEY, JSON.stringify(updatedData));
  return updatedData;
});

export const removeRepository = createAsyncThunk<
  Array<Repository>,
  Repository,
  { state: { repositories: RepositoryState } }
>('repositories/removeRepository', async (data, { getState }) => {
  const { data: currentData } = getState().repositories;
  const updatedData = currentData.filter(item => item.id === data.id);
  await AsyncStorage.setItem(STORE_KEY, JSON.stringify(updatedData));
  return updatedData;
});

const isActionTypeMatched = (action: AnyAction, targetType: 'rejected' | 'pending' | 'fulfilled') => {
  return action.type.endsWith('/' + targetType);
};

export const repositorySlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        isAnyOf(getRepositories.fulfilled, addRepository.fulfilled, removeRepository.fulfilled),
        (state, { payload }) => {
          state.error = false;
          state.loading = false;
          state.data = payload;
        },
      )
      .addMatcher(
        action => isActionTypeMatched(action, 'pending'),
        state => {
          state.error = false;
          state.loading = true;
        },
      )
      .addMatcher(
        action => action.type.endsWith('rejected'),
        state => {
          state.error = true;
          state.loading = false;
        },
      );
  },
});

export default repositorySlice.reducer;
