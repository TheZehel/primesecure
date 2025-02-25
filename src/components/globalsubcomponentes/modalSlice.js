import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    openCount: 0,
  },
  reducers: {
    incrementOpenCount: (state) => {
      state.openCount += 1;
    },
    // Se precisar de outras ações, adicione aqui
  },
});

export const { incrementOpenCount } = modalSlice.actions;
export default modalSlice.reducer;
