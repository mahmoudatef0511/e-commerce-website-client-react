import { Route, Routes } from "react-router";
import NavBar from "./NavBar";
import Category from "../pages/Category";
import PDP from "../pages/PDP";
import CartOverlay from "../pages/CartOverlay";
import { useState, useEffect } from "react";
import {
  graphqlURL,
  getAllProductsQuery,
  getCategoriesQuery,
  createOrderMutation,
} from "../graphql/operations";

import { categories } from "../data";

function App() {
  const [currentCategory, setCurrentCategory] = useState("all");
  const [products, setProducts] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const totalCartItemsCount = cartProducts.reduce(
      (acc, cur) => (acc += cur.count),
      0,
    );
    if (!totalCartItemsCount) setIsCartOpen(false);
  }, [cartProducts]);

  useEffect(() => {
    // const fetchProducts = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await fetch(graphqlURL, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(getAllProductsQuery("all")),
    //     });
    //     if (!response.ok) throw new Error("Failed to fetch");
    //     const data = await response.json();
    //     setProducts(data.data.products);
    //   } catch (err) {
    //     setError(err.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // const fetchCategories = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await fetch(graphqlURL, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(getCategoriesQuery()),
    //     });
    //     if (!response.ok) throw new Error("Failed to fetch");
    //     const data = await response.json();
    //     setCategories(data.data.categories);
    //   } catch (err) {
    //     setError(err.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchCategories();
    // fetchProducts();

    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesRes, productsRes] = await Promise.all([
          fetch(graphqlURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(getCategoriesQuery()),
          }),
          fetch(graphqlURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(getAllProductsQuery("all")),
          }),
        ]);

        if (!categoriesRes.ok || !productsRes.ok)
          throw new Error("Failed to fetch");

        // const categoriesData = await categoriesRes.json();
        const productsData = await productsRes.json();

        // setCategories(categoriesData.data.categories);
        setProducts(productsData.data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty array = run once on mount

  const createOrder = async (order) => {
    try {
      setLoading(true);
      const response = await fetch(graphqlURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createOrderMutation(order)),
      });
      if (!response.ok) throw new Error("Failed to fetch");
      await response.json();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  function handleCategory(e) {
    setCurrentCategory(e.target.innerText.toLowerCase());
  }
  function handleChangeItemCount(items) {
    setCartProducts(items);
  }
  function handlePlaceOrder(order) {
    createOrder(order);
    setCartProducts([]);
    setIsCartOpen(false);
  }
  function toggleCart() {
    if (cartProducts.length) setIsCartOpen((current) => !current);
  }
  function checkIfProductExistsInCart(product, cartProducts) {
    let productFound = false,
      attributesEqual = true;
    for (const cartProduct of cartProducts) {
      if (product.id === cartProduct.id) {
        productFound = true;
        const cartProductAttributesKeys = Object.keys(
          cartProduct.selectedAttributes,
        );
        for (const attributeKey of cartProductAttributesKeys) {
          if (
            product.selectedAttributes[attributeKey] !==
            cartProduct.selectedAttributes[attributeKey]
          ) {
            attributesEqual = false;
            break;
          }
        }
      }
      if (!attributesEqual) break;
    }
    if (!productFound || (productFound && !attributesEqual)) {
      return false;
    }
    return true;
  }
  function handleAddToCart(product) {
    setCurrentCategory("all");
    setCartProducts((current) => {
      if (!current.length) return [product];
      if (!checkIfProductExistsInCart(product, current)) {
        return [...current, product];
      }
      return [
        ...current.map((prod) => {
          if (prod.id === product.id) return { ...prod, count: prod.count + 1 };
          return { ...prod };
        }),
      ];
    });
  }

  return (
    <div className="position-relative">
      <NavBar
        handleCategory={handleCategory}
        activeCategory={currentCategory}
        cartProductsCount={cartProducts.reduce(
          (acc, cur) => (acc += cur.count),
          0,
        )}
        toggleCart={toggleCart}
        categories={categories}
      />
      {isCartOpen && (
        <CartOverlay
          cartItems={cartProducts}
          onChangeItemCount={handleChangeItemCount}
          onPlaceOrder={handlePlaceOrder}
          currentActiveCategory={currentCategory}
        />
      )}
      {isCartOpen && (
        <div className="overlay" onClick={() => setIsCartOpen(false)}></div>
      )}
      <div className="container" style={isCartOpen ? { opacity: "40%" } : {}}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <Category
                  products={products}
                  onFastShopping={handleAddToCart}
                  category={categories[0].name}
                />
              }
            />
            {categories.map((category) => {
              return (
                <Route
                  path={`/${category.name}`}
                  element={
                    <Category
                      products={products}
                      category={category.name}
                      onFastShopping={handleAddToCart}
                    />
                  }
                />
              );
            })}
            {products.map((product) => {
              return (
                <Route
                  path={`/${product.category}/${product.id}`}
                  element={
                    <PDP product={product} onAddToCart={handleAddToCart} />
                  }
                />
              );
            })}
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
