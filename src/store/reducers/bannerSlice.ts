import { createSlice } from '@reduxjs/toolkit';

type BannerState = {
  snackbarMessage: string;
};

const initialState: BannerState = {
  snackbarMessage: '',
};

export const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    setValue: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setValue } = bannerSlice.actions;
export default bannerSlice.reducer;
