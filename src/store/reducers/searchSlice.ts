import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

type SearchState = {
  recentSearchKeywords: Array<string>;
};

const initialState: SearchState = { recentSearchKeywords: [] };

const STORE_KEY = 'recentSearchKeywords';

export const getSearchKeywords = createAsyncThunk('recentSearch/getSearchKeywords', async () => {
  const savedKeywords = await AsyncStorage.getItem(STORE_KEY);
  return savedKeywords ? JSON.parse(savedKeywords) : [];
});

export const updateSearchKeyword = createAsyncThunk<
  SearchState['recentSearchKeywords'],
  { type: 'add' | 'delete'; keyword: string },
  { state: { search: SearchState } }
>('recentSearch/updateSearchKeyword', async ({ type, keyword }, { getState }) => {
  const { recentSearchKeywords: currentData } = getState().search;
  const updatedData = currentData.filter(item => item !== keyword);
  if (type === 'add') updatedData.unshift(keyword);
  await AsyncStorage.setItem(STORE_KEY, JSON.stringify(updatedData));
  return updatedData;
});

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(isAnyOf(updateSearchKeyword.fulfilled, getSearchKeywords.fulfilled), (state, { payload }) => {
      state.recentSearchKeywords = payload;
    });
  },
});

export default searchSlice.reducer;
