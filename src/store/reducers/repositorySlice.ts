import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

const STORE_KEY = 'repositories';

export const repositorySlice = createSlice({
  name: 'repositories',
  initialState: { loading: true, error: null, data: [] },
  reducers: {},
});

export default repositorySlice.reducer;
