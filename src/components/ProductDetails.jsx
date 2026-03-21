// ProductDetails.jsx
import { useState } from "react";
import AttributesList from "./AttributesList";
import BoldPTag from "./BoldPTag";
import CustomButton from "./CustomButton";

function ProductDetails({
  name,
  attributes,
  currency,
  amount,
  addProductToCart,
  getFullAttribute,
  inStock,
  description,
}) {
  const [selectedAttributes, setSelectedAttributes] = useState({});

  const selectedCount = Object.keys(selectedAttributes).filter(
    (key) => selectedAttributes[key] !== ""
  ).length;

  const allSelected = selectedCount === attributes.length;

  function handleAttributeSelect(attributeName, value) {
    const updated = { ...selectedAttributes, [attributeName]: value };
    setSelectedAttributes(updated);
    getFullAttribute(updated);
  }

  return (
    <>
      <h3>{name}</h3>
      <AttributesList
        attributes={attributes}
        onAttributeSelect={handleAttributeSelect}
        selectedAttributes={selectedAttributes}
      />
      <BoldPTag>PRICE:</BoldPTag>
      <BoldPTag>
        {currency}
        {amount}
      </BoldPTag>
      <p>
        <CustomButton
          dataTestID={"add-to-cart"}
          onClick={() => addProductToCart(selectedCount)}
          disabled={!inStock || (attributes.length > 0 && !allSelected)}
        >
          ADD TO CART
        </CustomButton>
      </p>
      <p data-testid="product-description">{description}</p>
    </>
  );
}

export default ProductDetails;