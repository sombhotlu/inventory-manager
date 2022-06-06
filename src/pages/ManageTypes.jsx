import React from 'react';
import TypeComponent from '../components/TypeComponent';
import ShortUniqueId from 'short-unique-id';
import {
  MainField,
  InputWithButton,
  ButtonDropdown,
  ButtonDropdownForObjectTitle,
} from '../components/TypeComponent';
import { useLocalStorage } from '../hooks/localStorage';
import getData, { OBJECT_TITLE, OBJECT_TYPE } from '../SeedData/data';

export default function ManageTypes() {
  let [currentData, setCurrentData] = useLocalStorage('data', getData());

  const onClickAddTypeHandler = () => {
    const uidForNewCategory = new ShortUniqueId();
    const uidForNewField = new ShortUniqueId();

    let newData = {
      ...currentData,
      [uidForNewCategory()]: {
        [OBJECT_TYPE]: {
          name: 'Object Type',
          value: '',
        },
        [OBJECT_TITLE]: {
          name: 'Object Title',
          value: '',
        },
        other_fields: {
          [uidForNewField()]: {
            name: 'Model',
            type: 'text',
          },
        },
      },
    };
    setCurrentData(newData);
  };

  const onChangeMainField = (id, name, value) => {
    let newData = {
      ...currentData,
      [id]: {
        ...currentData[id],
        [name]: {
          ...currentData[id][name],
          value,
        },
      },
    };

    setCurrentData(newData);
  };

  const onChangeOtherFieldName = (parentId, childId, name) => {
    let newData = {
      ...currentData,
      [parentId]: {
        ...currentData[parentId],
        other_fields: {
          ...currentData[parentId].other_fields,
          [childId]: {
            ...currentData[parentId].other_fields[childId],
            name,
          },
        },
      },
    };

    setCurrentData(newData);
  };

  const onChangeOtherFieldType = (parentId, childId, type) => {
    let newData = {
      ...currentData,
      [parentId]: {
        ...currentData[parentId],
        other_fields: {
          ...currentData[parentId].other_fields,
          [childId]: {
            ...currentData[parentId].other_fields[childId],
            type,
          },
        },
      },
    };

    setCurrentData(newData);
  };

  const onCloseClickHandler = (id) => {
    let newData = {
      ...currentData,
    };
    delete newData[id];
    setCurrentData(newData);
  };

  const onNewFieldAddition = (parentId, type) => {
    const newIdForNewField = new ShortUniqueId();
    let newData = {
      ...currentData,
      [parentId]: {
        ...currentData[parentId],
        other_fields: {
          ...currentData[parentId].other_fields,
          [newIdForNewField()]: {
            name: '',
            value: '',
            type,
          },
        },
      },
    };

    setCurrentData(newData);
  };

  return (
    <main>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex gap-5 flex-wrap">
        {Object.keys(currentData).map((parentId) => {
          return (
            <TypeComponent
              key={parentId}
              data={currentData[parentId]}
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
