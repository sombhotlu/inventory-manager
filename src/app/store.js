import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from '../features/inventory/inventory-slice';
import initialState from '../SeedData/data';

const persistedState = localStorage.getItem('data')
  ? JSON.parse(localStorage.getItem('data'))
  : initialState();

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  localStorage.setItem('data', JSON.stringify(store.getState()));
});
