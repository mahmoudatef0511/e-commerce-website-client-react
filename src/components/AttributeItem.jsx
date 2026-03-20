function AttributeItem({
  item,
  type,
  selected,
  onSelect,
  attributeName,
  inCart,
}) {
  const { displayValue, value } = item;
  return (
    <div
      className="col-2"
      data-testid={`${inCart ? "cart-item" : "product"}-attribute-${attributeName.toLowerCase().split(" ").join("-")}-${value}${selected ? "-selected" : ""}`}
    >
      {type === "text" && (
        <p
          className={`attribute-item ${selected ? "attribute-item-text-selected" : ""}`}
          onClick={onSelect}
        >
          {value}
        </p>
      )}
      {type === "swatch" && (
        <p
          className={`attribute-item attribute-item-swatch ${selected ? "attribute-item-swatch-selected" : ""}`}
          style={{ backgroundColor: `${value}` }}
          onClick={onSelect}
        ></p>
      )}
    </div>
  );
}

export default AttributeItem;
