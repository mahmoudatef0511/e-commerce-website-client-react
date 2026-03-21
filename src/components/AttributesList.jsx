import { useState } from "react";
import Attribute from "./Attribute";

function AttributesList({
  attributes,
  onCompleteAttribute,
  getSelectedAttributesCount,
}) {
  const [selectedAttributesCount, setSelectedAttributesCount] = useState(
    attributes.map((attribute) => attribute.name),
  );

  const [selectedAttributes, setSelectedAttributes] = useState({});

  const attributeObject = {};
  attributes.forEach(({ name }) => {
    attributeObject[name] = selectedAttributes[name] ? selectedAttributes[name] : "";
  });
  function handleCompleteAttribute(selectedAttribute) {
    Object.keys(selectedAttribute).forEach((key) => {
      attributeObject[key] = selectedAttribute[key];
    });
    onCompleteAttribute(attributeObject);
    setSelectedAttributes(current => {
      return {...current, ...selectedAttribute};
    })
  }

  function checkEntered(attributeName) {
    setSelectedAttributesCount((current) => current.filter((a) => a !== attributeName));
    setSelectedAttributes(current => {
      return {...attributeObject, ...current}
    })
  }

  getSelectedAttributesCount(selectedAttributesCount.length);

  return (
    <div>
      {attributes.map((attribute, index) => (
        <Attribute
          entered={checkEntered}
          attribute={attribute}
          key={`${attribute.id}-${index}`}
          selectedAttribute={handleCompleteAttribute}
        />
      ))}
    </div>
  );
}

export default AttributesList;
