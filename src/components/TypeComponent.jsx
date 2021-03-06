import React from 'react';
import { OBJECT_TITLE } from '../SeedData/data';

export default function TypeComponent({ data, onCrossClickHandler, children }) {
  return (
    <div className="w-full max-w-sm border-2">
      <header className="flex justify-between bg-gray-100 p-3">
        <div>{data}</div>
        <div onClick={onCrossClickHandler} className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </header>
      <main className="p-3">{children}</main>
    </div>
  );
}

export const MainField = ({
  name,
  value,
  onChangeMainField,
  type = 'text',
}) => {
  return (
    <div className="mt-4">
      <label htmlFor="object_type" className="block text-gray-900 text-sm mb-2">
        {name}
      </label>
      {type === 'textarea' ? (
        <textarea
          className="border-2 rounded w-full h-8 px-2 py-1"
          value={value}
          onChange={(e) => onChangeMainField(e.currentTarget.value)}
        />
      ) : (
        <input
          type={type}
          className="border-2 rounded w-full h-8 px-2 py-1"
          value={value}
          onChange={(e) => onChangeMainField(e.currentTarget.value)}
        />
      )}
    </div>
  );
};

export const InputWithButton = ({
  data,
  onChangeOtherFieldName,
  onChangeOtherFieldType,
}) => {
  return (
    <div className="mt-2 flex w-full">
      <input
        type="text"
        className=" border-2 rounded w-full p-1"
        value={data.name}
        onChange={(e) => onChangeOtherFieldName(e.target.value)}
      />

      <div className="flex relative w-64">
        <select
          onChange={(e) => onChangeOtherFieldType(e?.currentTarget?.value)}
          value={data.type}
          className="bg-gray-600 text-white block appearance-none w-full border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight">
          <option value="text">Small Text</option>
          <option value="textarea">Long Text</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
        </select>
        <div className="text-white pointer-events-none absolute inset-y-0 right-0 top-0 bottom-0 flex items-center px-2">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export const ButtonDropdown = ({ onNewFieldAddition, data }) => {
  return (
    <div className="inline-block relative w-full text-white">
      <select
        value=""
        onChange={(e) => {
          onNewFieldAddition(e?.currentTarget?.value);
        }}
        className="bg-gray-600 block appearance-none w-full border  border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight">
        {data.map((option) => {
          return (
            <option
              key={option.value}
              value={option.value}
              {...option.otherFields}>
              {option.name}
            </option>
          );
        })}
      </select>
      <div className="text-white pointer-events-none absolute inset-y-0 right-0 top-0 flex items-center px-2">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export const ButtonDropdownForObjectTitle = ({ data, onChange }) => {
  return (
    <div className="inline-block relative w-full">
      <select
        onChange={(e) => onChange(e.currentTarget?.value)}
        value={data[OBJECT_TITLE].value}
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight">
        {Object.keys(data.other_fields).map((idForField) => (
          <option key={idForField} value={idForField}>
            {data.other_fields[idForField].name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 top-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};
