import { useState } from "react";
import ProductDetails from "../components/ProductDetails";

function PDP({ product, onAddToCart }) {
  const {
    product_id,
    id,
    name,
    attributes,
    prices,
    gallery,
    description,
    inStock,
  } = product;
  const { amount, currency } = prices[0];

  const [mainSliderImage, setMainSliderImage] = useState(gallery[0]);
  const [fullAttributeObject, setFullAttributeObject] = useState({});

  function parseDescription(desc) {
    const parser = new DOMParser();
    const parsedDoc = parser.parseFromString(desc, "text/html");
    return parsedDoc.body.textContent;
  }

  function getFullAttribute(attributeObject) {
    setFullAttributeObject({ ...attributeObject });
  }

  function handleNextImage() {
    const currentImageIndex = gallery.indexOf(mainSliderImage);
    if (currentImageIndex === gallery.length - 1)
      setMainSliderImage(gallery[0]);
    else setMainSliderImage(gallery[currentImageIndex + 1]);
  }

  function handlePreviousImage() {
    const currentImageIndex = gallery.indexOf(mainSliderImage);
    if (currentImageIndex === 0)
      setMainSliderImage(gallery[gallery.length - 1]);
    else setMainSliderImage(gallery[currentImageIndex - 1]);
  }

  function addProductToCart() {
    const attributesValues = Object.values(fullAttributeObject);
    if (attributes.length > 0 && attributesValues.length !== attributes.length)
      return;
    const cartProduct = {
      productId: product_id,
      id: id + attributesValues.join("-"),
      name,
      price: amount,
      currency,
      attributes,
      count: 1,
      selectedAttributes: fullAttributeObject,
      image: gallery[0],
    };
    onAddToCart(cartProduct);
  }

  function handleClickImage(e) {
    setMainSliderImage(e.target.src);
  }

  return (
    <div className="container text-left pdp-container p-5">
      <div className="row">
        <div className="col-7">
          <div className="row justify-content-end">
            <div className="col-2">
              <div className="gallery-container" data-testid="product-gallery">
                <div className="d-flex flex-column">
                  {gallery.map((galleryImage) => (
                    <div key={galleryImage} className="slider-image">
                      <img
                        src={galleryImage}
                        alt={name}
                        onClick={handleClickImage}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-8 position-relative">
              <button
                className="next-btn position-absolute"
                onClick={handleNextImage}
              >
                <img src="/rightArrow.png" alt="" />
              </button>
              <button
                className="previous-btn position-absolute"
                onClick={handlePreviousImage}
              >
                <img src="/leftArrow.png" alt="" />
              </button>
              <div>
                <img
                  src={mainSliderImage}
                  className="main-slider-image"
                  alt={name}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-5">
          <ProductDetails
            name={name}
            attributes={attributes}
            currency={currency}
            amount={amount}
            addProductToCart={addProductToCart}
            inStock={inStock}
            description={parseDescription(description)}
            getFullAttribute={getFullAttribute}
          />
        </div>
      </div>
    </div>
  );
}

export default PDP;