export const OBJECT_TYPE = 'object_type';
export const OBJECT_TITLE = 'object_title';

export default function initialData() {
  return {
    1: {
      object_type: {
        name: 'Object Type',
        value: 'Chainsaws',
      },
      object_title: {
        name: 'Object Title',
        value: '01',
      },
      other_fields: {
        '01': {
          name: 'Model',
          type: 'text',
        },
      },
    },
  };
}

export const initialStateForProducts = () => {
  return {
    11: {
      productTypeId: 1,
      '01': {
        value: '',
      },
    },
  };
};
