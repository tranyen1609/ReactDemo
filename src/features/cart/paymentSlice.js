import { createSlice } from '@reduxjs/toolkit';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: 0,
  reducers: {
    next(state) {
      return state + 1;
    },
    back(state) {
      return state - 1;
    },
    reset(state) {
      state = 0;
      return state;
    },
  },
});

const { actions, reducer } = paymentSlice;
export const { next, back, reset } = actions;
export default reducer;
