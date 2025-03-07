import { createSlice } from '@reduxjs/toolkit';

// Get initial state from localStorage if available
const loadFormState = () => {
  try {
    const savedState = localStorage.getItem('formData');
    return savedState ? JSON.parse(savedState) : null;
  } catch (e) {
    console.error('Error loading form state from localStorage', e);
    return null;
  }
};

const initialState = loadFormState() || {
  name: '',
  email: '',
  phone: '',
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;

      // Save to localStorage
      try {
        localStorage.setItem('formData', JSON.stringify(state));
      } catch (e) {
        console.error('Error saving form state to localStorage', e);
      }
    },
    updateMultipleFields: (state, action) => {
      const fields = action.payload;
      Object.keys(fields).forEach((key) => {
        state[key] = fields[key];
      });

      // Save to localStorage
      try {
        localStorage.setItem('formData', JSON.stringify(state));
      } catch (e) {
        console.error('Error saving form state to localStorage', e);
      }
    },
    clearFormData: (state) => {
      Object.keys(state).forEach((key) => {
        state[key] = '';
      });

      // Clear from localStorage
      localStorage.removeItem('formData');
    },
  },
});

export const { updateFormField, updateMultipleFields, clearFormData } =
  formSlice.actions;
export default formSlice.reducer;
