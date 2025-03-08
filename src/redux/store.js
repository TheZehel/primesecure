import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../components/globalsubcomponentes/modalSlice';
import formReducer from './slices/formSlice';
import popupsReducer from './slices/popupsSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    form: formReducer,
    popups: popupsReducer,
  },
});

export default store;
