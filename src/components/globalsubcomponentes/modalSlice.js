import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    counts: {}, // Objeto para armazenar a contagem por productId
  },
  reducers: {
    incrementProductCount: (state, action) => {
      const productId = action.payload;
      if (!state.counts[productId]) {
        state.counts[productId] = 0;
      }
      state.counts[productId] += 1;
    },
    // Se precisar, adicione outros reducers, como resetProductCount, etc.
  },
});

export const { incrementProductCount } = modalSlice.actions;
export default modalSlice.reducer;
