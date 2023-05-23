import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import paymentReducer from '../features/cart/paymentSlice';

const rootReducer = {
  cart: cartReducer,
  paymentStep: paymentReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

let currentValue;
function handleChange() {
  let previousValue = currentValue;
  currentValue = store.getState().cart;

  if (previousValue !== currentValue) {
    saveToLocalStorage(store.getState().cart);
  }
}

store.subscribe(() => handleChange());

function saveToLocalStorage(store) {
  localStorage.setItem('cartData', JSON.stringify(store));
}

export default store;
