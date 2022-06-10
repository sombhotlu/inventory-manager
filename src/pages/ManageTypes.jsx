import React from 'react';
import TypeComponent from '../components/TypeComponent';
import {
  MainField,
  InputWithButton,
  ButtonDropdown,
  ButtonDropdownForObjectTitle,
} from '../components/TypeComponent';
import { OBJECT_TITLE, OBJECT_TYPE } from '../SeedData/data';

import { useDispatch, useSelector } from 'react-redux';
import {
  addType,
  updateMainFieldName,
  updateOtherFieldName,
  updateOtherFieldType,
  removeType,
  newFieldAddition,
} from '../features/inventory/productTypes-slice';
import { removeMultipleProductIds } from '../features/inventory/products-slice';

const buttonDropdownOptions = [
  {
    name: 'Add field',
    value: '',
    otherFields: {
      disabled: true,
    },
  },
  {
    name: 'Small Text',
    value: 'text',
  },
  {
    name: 'Long Text',
    value: 'textarea',
  },
  {
    name: 'Number',
    value: 'number',
  },
  {
    name: 'Date',
    value: 'date',
  },
];
export default function ManageTypes() {
  const currentData = useSelector((state) => state.productTypes);
  const productsData = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const onClickAddTypeHandler = () => {
    dispatch(addType());
  };

  const onChangeMainField = (id, name, value) => {
    dispatch(updateMainFieldName({ id, name, value }));
  };

  const onChangeOtherFieldName = (parentId, childId, name) => {
    dispatch(updateOtherFieldName({ parentId, childId, name }));
  };

  const onChangeOtherFieldType = (parentId, childId, type) => {
    dispatch(updateOtherFieldType({ parentId, childId, type }));
  };

  const onCloseClickHandler = (id) => {
    dispatch(removeType({ id }));
    let productIds = Object.keys(productsData).filter((productId) => {
      return String(productsData[productId].productTypeId) === String(id);
    });

    dispatch(removeMultipleProductIds({ productIds }));
  };

  const onNewFieldAddition = (parentId, type) => {
    dispatch(newFieldAddition({ parentId, type }));
  };

  return (
    <main>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex gap-5 flex-wrap">
        {Object.keys(currentData).map((parentId) => {
          return (
            <TypeComponent
              key={parentId}
              data={currentData[parentId]?.object_type?.value ?? ''}
              onCrossClickHandler={() => onCloseClickHandler(parentId)}>
              <MainField
                key={currentData[parentId].object_type.name}
                name={currentData[parentId].object_type.name}
                value={currentData[parentId].object_type.value}
                onChangeMainField={(value) =>
                  onChangeMainField(parentId, OBJECT_TYPE, value)
                }></MainField>
              <div className="mt-4">
                <label
                  htmlFor="object_title"
                  className="block text-gray-900 text-sm mb-2">
                  Object Title
                </label>
                <ButtonDropdownForObjectTitle
                  onChange={(value) =>
                    onChangeMainField(parentId, OBJECT_TITLE, value)
                  }
                  data={currentData[parentId]}
                />
              </div>
              <div className="mt-4">Fields</div>
              {Object.keys(currentData[parentId].other_fields).map(
                (idForField) => (
                  <InputWithButton
                    key={idForField}
                    data={currentData[parentId].other_fields[idForField]}
                    onChangeOtherFieldName={(name) =>
                      onChangeOtherFieldName(parentId, idForField, name)
                    }
                    onChangeOtherFieldType={(type) =>
                      onChangeOtherFieldType(parentId, idForField, type)
                    }
                  />
                ),
              )}
              <div className="w-full mt-4">
                <ButtonDropdown
                  data={buttonDropdownOptions}
                  onNewFieldAddition={(type) =>
                    onNewFieldAddition(parentId, type)
                  }
                />
              </div>
            </TypeComponent>
          );
        })}
        <div className="text-white grow">
          <button
            onClick={onClickAddTypeHandler}
            className="bg-gray-600 px-6 py-2 rounded  w-full max-w-sm">
            Add Type
          </button>
        </div>
      </div>
    </main>
  );
}
