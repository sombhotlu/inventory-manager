import {
  removeProduct,
  updateFieldValues,
  addProduct,
} from 'features/inventory/products-slice';
import { useDispatch, useSelector } from 'react-redux';
import TypeComponent from '../components/TypeComponent';
import { MainField } from '../components/TypeComponent';
import { useParams } from 'react-router-dom';
import { ButtonDropdown } from '../components/TypeComponent';

export default function ProductListings() {
  const productsData = useSelector((state) => state.products);
  const productTypesData = useSelector((state) => state.productTypes);

  const dispatch = useDispatch();

  let { typeId } = useParams();

  const onCrossClickHandler = (productId) => {
    dispatch(removeProduct({ productId }));
  };

  const onChangeFieldValue = (productId, fieldId, value) => {
    dispatch(updateFieldValues({ productId, fieldId, value }));
  };

  const onAddItemHandler = (productTypeId) => {
    dispatch(
      addProduct({
        productTypeId,
      }),
    );
  };

  let defaultDropdownButtonValue = [
    {
      name: 'Add field',
      value: '',
      otherFields: {
        disabled: true,
      },
    },
  ];

  let otherDropdownButtonValue = [];
  if (!typeId) {
    otherDropdownButtonValue = Object.keys(productTypesData).map(
      (productTypeId) => {
        return {
          name: productTypesData[productTypeId].object_type.value,
          value: productTypeId,
        };
      },
    );
  }

  let buttonDropDownOptions = [
    ...defaultDropdownButtonValue,
    ...otherDropdownButtonValue,
  ];
  return (
    <main>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex gap-5 flex-wrap">
        {Object.keys(productsData)
          ?.filter((productId) => {
            if (!typeId) {
              return true;
            } else
              return (
                String(typeId) ===
                String(productsData[productId]?.productTypeId)
              );
          })
          ?.map((productId) => {
            let productData = productsData[productId];
            let productTypeId = productData?.productTypeId;
            let productTypeData = productTypesData[productTypeId];
            let productType = productTypeData?.object_type?.value;
            let productTitleId = productTypeData?.object_title?.value;

            let productTitle = productData[productTitleId]?.value;

            let title = productTitle
              ? `${productType} - ${productTitle}`
              : `${productType} - No Title`;

            return (
              <TypeComponent
                key={productId}
                data={title}
                onCrossClickHandler={() => onCrossClickHandler(productId)}>
                {Object.keys(productTypeData?.other_fields)?.map((fieldId) => {
                  let fieldData = productTypeData.other_fields[fieldId];
                  return (
                    <MainField
                      key={`${productId}${fieldId}`}
                      name={fieldData?.name}
                      value={productData?.[fieldId]?.value ?? ''}
                      type={fieldData?.type}
                      onChangeMainField={(value) => {
                        onChangeFieldValue(productId, fieldId, value);
                      }}
                    />
                  );
                })}
              </TypeComponent>
            );
          })}
        <div className="text-white w-full  max-w-sm">
          {!typeId ? (
            <ButtonDropdown
              data={buttonDropDownOptions}
              onNewFieldAddition={onAddItemHandler}
            />
          ) : (
            <button
              onClick={() => onAddItemHandler(typeId)}
              className="bg-gray-600 px-6 py-2 rounded  w-full max-w-sm">
              Add Type
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
