import { createSlice } from '@reduxjs/toolkit';
import initialState from '../../SeedData/data';
import ShortUniqueId from 'short-unique-id';
import { OBJECT_TITLE, OBJECT_TYPE } from '../../SeedData/data';

const productTypesSlice = createSlice({
  name: 'productTypes',
  initialState: initialState(),
  reducers: {
    addType(state) {
      const uidForNewCategory = new ShortUniqueId();
      const uidForNewField = new ShortUniqueId();

      let fieldId = uidForNewField();
      state[uidForNewCategory()] = {
        [OBJECT_TYPE]: {
          name: 'Object Type',
          value: '',
        },
        [OBJECT_TITLE]: {
          name: 'Object Title',
          value: fieldId,
        },
        other_fields: {
          [fieldId]: {
            name: 'Model',
            type: 'text',
          },
        },
      };
    },
    updateMainFieldName(state, action) {
      const { id, name, value } = action.payload;
      console.log('the value of id, name ,value is -->', id, name, value);
      state[id][name].value = value;
    },
    updateOtherFieldName(state, action) {
      const { parentId, childId, name } = action.payload;
      state[parentId].other_fields[childId].name = name;
    },
    updateOtherFieldType(state, action) {
      const { parentId, childId, type } = action.payload;
      state[parentId].other_fields[childId].type = type;
    },
    removeType(state, action) {
      const { id } = action.payload;
      delete state[id];
    },
    newFieldAddition(state, action) {
      const { parentId, type } = action.payload;
      const uidForNewField = new ShortUniqueId();
      state[parentId].other_fields[uidForNewField()] = {
        name: '',
        type,
      };
    },
  },
});

export const {
  addType,
  updateMainFieldName,
  updateOtherFieldName,
  updateOtherFieldType,
  removeType,
  newFieldAddition,
} = productTypesSlice.actions;
export default productTypesSlice.reducer;
