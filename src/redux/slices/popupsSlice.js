// src/redux/slices/popupsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  promotionPopupOpen: false,
  backPopupAllowed: false,
  backPopupCooldown: false,
};

const popupsSlice = createSlice({
  name: 'popups',
  initialState,
  reducers: {
    openPromotionPopup: (state) => {
      state.promotionPopupOpen = true;
      // Enquanto o promotion estiver aberto, o back não pode aparecer.
      state.backPopupAllowed = false;
      state.backPopupCooldown = true;
    },
    closePromotionPopup: (state) => {
      state.promotionPopupOpen = false;
    },
    enableBackPopup: (state) => {
      state.backPopupAllowed = true;
      state.backPopupCooldown = false;
    },
    resetPopups: (state) => {
      state.promotionPopupOpen = false;
      state.backPopupAllowed = false;
      state.backPopupCooldown = false;
    },
  },
});

export const {
  openPromotionPopup,
  closePromotionPopup,
  enableBackPopup,
  resetPopups,
} = popupsSlice.actions;

// Thunk para fechar o promotion popup e, após um cooldown, habilitar o back popup
export const closePromotionPopupWithCooldown = () => (dispatch) => {
  dispatch(closePromotionPopup());
  setTimeout(() => {
    dispatch(enableBackPopup());
  }, 10000); // 10 segundos de cooldown
};

export default popupsSlice.reducer;
