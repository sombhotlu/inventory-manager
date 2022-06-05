import React, { useEffect } from 'react';
import TypeComponent from '../components/TypeComponent';
import ShortUniqueId from 'short-unique-id';
import {
  MainField,
  InputWithButton,
  ButtonDropdown,
  ButtonDropdownForObjectTitle,
} from '../components/TypeComponent';

function getData() {
  const data = JSON.parse(localStorage.getItem('data') ?? '{}');
  if (Object.keys(data).length) {
    return data;
  } else {
    return {
      1: {
        object_type: {
          name: 'Object Type',
          value: 'Chainsaws',
        },
        other_fields: {
          '01': {
            name: 'Model',
            value: '',
            type: 'text',
          },
        },
      },
    };
  }
}

export default function ManageTypes() {
  let [currentData, setCurrentData] = React.useState(getData());

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(currentData));
  }, [currentData]);

  const onClickAddTypeHandler = () => {
    const uidForNewCategory = new ShortUniqueId();
    const uidForNewField = new ShortUniqueId();

    let newData = {
      ...currentData,
      [uidForNewCategory()]: {
        object_type: {
          name: 'Object Type',
          value: '',
        },
        other_fields: {
          [uidForNewField()]: {
            name: 'Model',
            value: '',
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
        object_type: {
          ...currentData[id].object_type,
          name,
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
                onChangeMainField={(name, value) =>
                  onChangeMainField(parentId, name, value)
                }></MainField>
              <div className="mt-4">
                <label
                  htmlFor="object_title"
                  className="block text-gray-900 text-sm mb-2">
                  Object Title
                </label>
                <ButtonDropdownForObjectTitle data={currentData[parentId]} />
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
        {/* <TypeComponent /> */}

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
