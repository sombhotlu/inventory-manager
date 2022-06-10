import { createSlice } from '@reduxjs/toolkit';
import ShortUniqueId from 'short-unique-id';
import { initialStateForProducts } from '../../SeedData/data';

const productsSlice = createSlice({
  name: 'products',
  initialState: initialStateForProducts(),
  reducers: {
    addProduct(state, action) {
      const productId = new ShortUniqueId();
      const { productTypeId } = action.payload;
      state[productId()] = {
        productTypeId,
      };
    },

    updateFieldValues(state, action) {
      const { productId, fieldId, value } = action.payload;
      if (!state[productId][fieldId]) {
        state[productId][fieldId] = {
          value: '',
        };
      }

      state[productId][fieldId].value = value;
    },
    removeProduct(state, action) {
      const { productId } = action.payload;
      delete state[productId];
    },
  },
});

export const { addProduct, updateFieldValues, removeProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
