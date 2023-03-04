import { createSlice } from '@reduxjs/toolkit';

export const bookmarkSlice = createSlice({ name: 'bookmark', initialState: { repo: [] }, reducers: {} });

export default bookmarkSlice.reducer;
