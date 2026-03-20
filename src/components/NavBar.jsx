import { Link } from "react-router";

function NavBar({
  handleCategory,
  activeCategory,
  cartProductsCount,
  toggleCart,
  categories,
}) {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top py-3 px-5 fs-4 row">
        <div className="col-6">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {categories.map((category) => (
              <li className="nav-item" key={category.name}>
                <a
                  href={`/${category.name}`}
                  className={`nav-link mx-2 ${category.name === activeCategory ? "active" : ""}`}
                  onClick={handleCategory}
                  data-testid={`${category.name === activeCategory ? "active-" : ""}category-link`}
                >
                  {category.name.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-5">
          <img src="/brand-icon.png" alt="brand-icon" />
        </div>
        <div className="col-1 cart-icon">
          <button
            data-testid="cart-btn"
            onClick={toggleCart}
            style={{ border: "none", backgroundColor: "transparent" }}
          >
            <img src="/empty-cart-icon.png" alt="empty-cart-icon" />
          </button>
          {cartProductsCount ? (
            <span className="cart-count" data-testid="cart-item-amount">
              {cartProductsCount}
            </span>
          ) : (
            ""
          )}
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
