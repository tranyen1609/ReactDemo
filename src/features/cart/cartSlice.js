import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'counter',
  initialState: JSON.parse(localStorage.getItem('cartData')) || [],
  reducers: {
    increase(state, action) {
      const dataItem = state?.find((data) => data.productId === action.payload);
      if (dataItem) {
        dataItem.quantity = dataItem.quantity + 1;
      } else {
        state.push({
          productId: action.payload,
          quantity: 1,
        });
      }
      return state;
    },
    decrease(state, action) {
      const dataItem = state?.find((data) => data.productId === action.payload);
      if (dataItem) {
        dataItem.quantity = dataItem.quantity - 1;
      } else {
        state.push({
          productId: action.payload,
          quantity: 1,
        });
      }
      return state;
    },
    remove(state, action) {
      state = state?.filter((item) => item.productId !== action.payload);
      return state;
    },
    removeAll(state) {
      state = [];
      return state;
    },
  },
});

const { actions, reducer } = cartSlice;
export const { increase, decrease, remove, removeAll } = actions;
export default reducer;
