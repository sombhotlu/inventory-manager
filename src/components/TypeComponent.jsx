import ManageTypes from '../pages/ManageTypes';

export default function TypeComponent({
  data,
  onCrossClickHandler,
  children,
  ...props
}) {
  let typeLabel = '';
  let typeValue = data?.object_type?.value ?? '';

  let titleLabel = '';
  let titleValue = '';

  return (
    <div className="w-full max-w-sm border-2">
      <header className="flex justify-between bg-gray-100 p-3">
        <div>{typeValue}</div>
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
      <main className="p-3">
        {children}
        {/* {data.main_fields.map((field) => (
          <MainFields
            key={field.name}
            name={field.name}
            value={field.value}
            {...props}></MainFields>
        ))}
        <div className="mt-4">Fields</div>
        {data.other_fields.map((field) => (
          <InputWithButton data={field} />
        ))}
        <div className="w-full mt-4">
          <ButtonDropdown />
        </div> */}
      </main>
    </div>
  );
}

export const MainField = ({ name, value, onChangeMainField }) => {
  return (
    <div className="mt-4">
      <label htmlFor="object_type" className="block text-gray-900 text-sm mb-2">
        {name}
      </label>
      <input
        type="text"
        className="border-2 rounded w-full h-8 px-2 py-1"
        // defaultValue={value}
        value={value}
        onChange={(e) => onChangeMainField(name, e.currentTarget.value)}
      />
    </div>
  );
};

export const InputWithButton = ({
  data,
  onChangeOtherFieldName,
  onChangeOtherFieldType,
}) => {
  //   console.log('the value of data is -->', data);
  return (
    <div className="mt-2 flex w-full">
      {data.type !== 'textarea' ? (
        <input
          type={data.type}
          className=" border-2 rounded w-full p-1"
          value={data.name}
          onChange={(e) => onChangeOtherFieldName(e.target.value)}
        />
      ) : (
        <textarea
          className=" border-2 rounded w-full p-1"
          value={data.name}
          onChange={(e) => onChangeOtherFieldName(e.target.value)}
        />
      )}
      <div className="flex relative w-64">
        <select
          onChange={(e) => onChangeOtherFieldType(e?.currentTarget?.value)}
          value={data.type}
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight">
          <option value="text">Small Text</option>
          <option value="textarea">Long Text</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 top-0 bottom-0 flex items-center px-2 text-gray-700">
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

export const ButtonDropdown = ({ onNewFieldAddition }) => {
  return (
    <div key={Math.random()} className="inline-block relative w-full">
      <select
        onChange={(e) => onNewFieldAddition(e?.currentTarget?.value)}
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight w-full">
        <option defaultValue="" disabled>
          Add Field
        </option>
        <option value="text">Small Text</option>
        <option value="textarea">Long Text</option>
        <option value="number">Number</option>
        <option value="date">Date</option>
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

export const ButtonDropdownForObjectTitle = ({ data }) => {
  return (
    <div className="inline-block relative w-full">
      <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight w-full">
        {Object.keys(data.other_fields).map((idForField) => (
          <option key={idForField} value={data.other_fields[idForField].name}>
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
