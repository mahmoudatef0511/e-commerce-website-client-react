// AttributesList.jsx
import Attribute from "./Attribute";

function AttributesList({ attributes, onAttributeSelect, selectedAttributes }) {
  return (
    <div>
      {attributes.map((attribute, index) => (
        <Attribute
          attribute={attribute}
          key={`${attribute.id}-${index}`}
          onAttributeSelect={onAttributeSelect}
          selectedValue={selectedAttributes[attribute.name] || ""}
        />
      ))}
    </div>
  );
}

export default AttributesList;