import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../components/globalsubcomponentes/modalSlice';
import formReducer from './slices/formSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    form: formReducer,
  },
});

export default store;
