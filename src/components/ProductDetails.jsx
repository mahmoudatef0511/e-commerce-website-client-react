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
  const [selectedAttributesCount, setSelectedAttributesCount] = useState(0);

  return (
    <>
      <h3>{name}</h3>
      <AttributesList
        attributes={attributes}
        onCompleteAttribute={getFullAttribute}
        getSelectedAttributesCount={(count) =>
          setSelectedAttributesCount(attributes.length - count)
        }
      />
      <BoldPTag>PRICE:</BoldPTag>
      <BoldPTag>
        {currency}
        {amount}
      </BoldPTag>
      <p>
        <CustomButton
          dataTestID={"add-to-cart"}
          onClick={() => addProductToCart(selectedAttributesCount)}
          isDisabled={
            !inStock ||
            (attributes.length && selectedAttributesCount !== attributes.length)
          }
        >
          ADD TO CART
        </CustomButton>
      </p>
      <p data-testid="product-description">{description}</p>
    </>
  );
}

export default ProductDetails;
