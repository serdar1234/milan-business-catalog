import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/layers/04_shared/lib/store/';

interface UiState {
  isMobile: boolean;
}

const initialState: UiState = {
  isMobile: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
  },
});

export const { setIsMobile } = uiSlice.actions;

export const selectIsMobile = (state: RootState) => state.ui.isMobile;

export default uiSlice.reducer;
