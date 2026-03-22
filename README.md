# E-Commerce Store — Frontend

A modern Single Page Application (SPA) built with React 19 and Vite, serving as the client side of a full-stack e-commerce platform. It communicates with a PHP GraphQL backend to display products, manage a shopping cart, and place orders.

## Live Demo

[https://mahmoud-store-ten.vercel.app](https://mahmoud-store-ten.vercel.app)

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| React Router | 7 | Client-side routing (SPA) |
| Vite | 7 | Build tool and dev server |
| Bootstrap | 5 | CSS utility classes and layout |
| GraphQL | 16 | API query language |

---

## Project Structure

```
src/
├── components/
│   ├── App.jsx               # Root component — state management, routing, data fetching
│   ├── NavBar.jsx            # Header with category links and cart button
│   ├── ProductCard.jsx       # Individual product card with quick-add functionality
│   ├── ProductsList.jsx      # Grid of product cards filtered by category
│   ├── ProductDetails.jsx    # Product info, attribute selector, add-to-cart button
│   ├── Attribute.jsx         # Single attribute group (e.g. Size, Color)
│   ├── AttributesList.jsx    # List of all attributes for a product
│   ├── AttributeItem.jsx     # Individual attribute option (swatch or text)
│   ├── CartItem.jsx          # Single item in the cart overlay
│   ├── CustomButton.jsx      # Reusable button with disabled state support
│   └── BoldPTag.jsx          # Reusable bold paragraph component
├── pages/
│   ├── Category.jsx          # Product Listing Page (PLP)
│   ├── PDP.jsx               # Product Details Page with image gallery
│   └── CartOverlay.jsx       # Sliding cart overlay with order placement
├── graphql/
│   └── operations.js         # GraphQL queries and mutations
├── main.jsx                  # Application entry point
└── index.css                 # Global styles
```

---

## Features

### Product Listing Page (PLP)
- Displays all products filtered by the selected category
- Each product card shows the main image, name, and price
- Out-of-stock products are greyed out with an "OUT OF STOCK" label
- Hovering over an in-stock product reveals a quick-add button that adds it to the cart with default attributes

### Product Details Page (PDP)
- Full product gallery with image carousel (previous/next arrows)
- Clickable thumbnail list on the left side
- Attribute selectors for text-based (e.g. size) and swatch-based (e.g. color) options
- Add to Cart button is disabled until all attributes are selected
- Product description rendered as plain text (HTML tags parsed safely using `DOMParser`)
- Adding a product automatically opens the cart overlay

### Cart Overlay
- Displays all cart items with name, image, price, and selected attributes
- Quantity can be increased or decreased per item
- Removing the last unit of an item removes it from the cart
- Shows total price and total item count
- Place Order button submits a GraphQL mutation and clears the cart
- Clicking outside the overlay closes it
- Page content is dimmed when the overlay is open

### Navigation
- Category links are dynamically generated from the backend
- Active category is highlighted
- Cart button shows item count bubble when cart is not empty

---

## GraphQL Operations

Defined in `src/graphql/operations.js`:

### Queries

**Get all products** (optionally filtered by category):
```graphql
{
  products(category: "all") {
    product_id
    id
    name
    category
    description
    inStock
    attributes {
      name
      type
      items {
        value
        displayValue
      }
    }
    prices {
      amount
      currency
    }
    gallery
  }
}
```

**Get all categories:**
```graphql
{
  categories {
    id
    name
  }
}
```

### Mutations

**Place an order:**
```graphql
mutation {
  placeOrder(items: [...], total: 99.99) {
    total
    createdAt
    items {
      product_id
      quantity
      selectedOptions {
        name
        value
      }
    }
  }
}
```

---

## Data Attributes (QA Testids)

The following `data-testid` attributes are present for automated testing:

| Element | `data-testid` value |
|---|---|
| Cart button in header | `cart-btn` |
| Category link | `category-link` |
| Active category link | `active-category-link` |
| Product card | `product-${product-name-in-kebab-case}` |
| Product attribute container (PDP) | `product-attribute-${attribute-name-in-kebab-case}` |
| Product attribute item (PDP) | `product-attribute-${attribute-name}-${value}` |
| Selected product attribute item (PDP) | `product-attribute-${attribute-name}-${value}-selected` |
| Product gallery | `product-gallery` |
| Product description | `product-description` |
| Add to cart button | `add-to-cart` |
| Cart overlay container | `cart-overlay` |
| Cart item attribute container | `cart-item-attribute-${attribute-name-in-kebab-case}` |
| Cart item attribute option | `cart-item-attribute-${attribute-name}-${value}` |
| Selected cart item attribute option | `cart-item-attribute-${attribute-name}-${value}-selected` |
| Cart item quantity indicator | `cart-item-amount` |
| Increase quantity button | `cart-item-amount-increase` |
| Decrease quantity button | `cart-item-amount-decrease` |
| Cart total | `cart-total` |

---

## Environment Variables

Create a `.env` file in the root of the frontend directory:

```env
VITE_API_URL=https://your-backend-url/graphql
```

If not set, defaults to `http://localhost:8000/graphql` for local development.

---

## Getting Started

### Prerequisites

- Node.js 16+
- npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Production Build

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

The built files will be in the `dist/` folder.

---

## Deployment

This project is deployed on **Vercel**.

### Steps

1. Push your code to GitHub
2. Import the repository on [vercel.com](https://vercel.com)
3. Set the **Root Directory** to `frontend` (if in a monorepo)
4. Set the environment variable `VITE_API_URL` to your backend GraphQL URL
5. Vercel auto-detects Vite and deploys automatically on every push

### SPA Routing

A `vercel.json` file is included to handle client-side routing correctly:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

This ensures direct URL access (e.g. `/tech/iphone-12-pro`) works without a 404 error.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
