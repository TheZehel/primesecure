// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../globalsubcomponentes/modalSlice';

const store = configureStore({
  reducer: {
    modal: modalReducer,
    // outros reducers se necessário
  },
});

export default store;
