// Attribute.jsx
import AttributeItem from "./AttributeItem";
import BoldPTag from "./BoldPTag";

function Attribute({
  attribute,
  onAttributeSelect,
  selectedValue,
  inCart = false,
}) {
  const { items, name, type } = attribute;

  function handleSelectAttribute(value) {
    if (!inCart) {
      onAttributeSelect(name, value);
    }
  }

  return (
    <div
      className="row g-1"
      data-testid={`${inCart ? "cart-item" : "product"}-attribute-${name.toLowerCase().split(" ").join("-")}`}
    >
      <BoldPTag>{name.toUpperCase()}:</BoldPTag>
      {items.map((item, index) => (
        <AttributeItem
          attributeName={name}
          item={item}
          key={`${item.id}-${index}-${type}`}
          type={type}
          selected={selectedValue === item.value}
          onSelect={() => handleSelectAttribute(item.value)}
          inCart={inCart}
        />
      ))}
    </div>
  );
}

export default Attribute;
