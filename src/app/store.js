import { configureStore } from '@reduxjs/toolkit';
import productTypesReducer from '../features/inventory/productTypes-slice';
import productsReducer from '../features/inventory/products-slice';
import initialState from '../SeedData/data';

const persistedState = localStorage.getItem('data')
  ? JSON.parse(localStorage.getItem('data'))
  : initialState();

export const store = configureStore({
  reducer: {
    productTypes: productTypesReducer,
    products: productsReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  localStorage.setItem('data', JSON.stringify(store.getState()));
});
