import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    counts: {}, // Objeto para armazenar a contagem por productId
    isPromotionOpen: true, // Estado para controle do popup de promoção
  },
  reducers: {
    incrementProductCount: (state, action) => {
      const productId = action.payload;
      if (!state.counts[productId]) {
        state.counts[productId] = 0;
      }
      state.counts[productId] += 1;
    },
    closePromotion: (state) => {
      state.isPromotionOpen = false;
    },
    openPromotion: (state) => {
      state.isPromotionOpen = true;
    },
  },
});

export const { incrementProductCount, closePromotion, openPromotion } =
  modalSlice.actions;
export default modalSlice.reducer;
