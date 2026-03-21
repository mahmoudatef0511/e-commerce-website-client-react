import { useEffect, useState } from "react";
import Attribute from "./Attribute";

function AttributesList({
  attributes,
  onCompleteAttribute,
  getSelectedAttributesCount,
}) {
  const [selectedAttributes, setSelectedAttributes] = useState({});

  const totalAttributes = attributes.length;
  const selectedCount = Object.keys(selectedAttributes).filter(
    (key) => selectedAttributes[key] !== ""
  ).length;

  useEffect(() => {
    getSelectedAttributesCount(totalAttributes - selectedCount);
  }, [selectedAttributes]);

  const attributeObject = {};
  attributes.forEach(({ name }) => {
    attributeObject[name] = selectedAttributes[name] || "";
  });

  function handleCompleteAttribute(selectedAttribute) {
    Object.keys(selectedAttribute).forEach((key) => {
      attributeObject[key] = selectedAttribute[key];
    });
    onCompleteAttribute(attributeObject);
    setSelectedAttributes((current) => ({ ...current, ...selectedAttribute }));
  }

  function checkEntered(attributeName) {
    setSelectedAttributes((current) => ({
      ...current,
      [attributeName]: current[attributeName] || "pending",
    }));
  }

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