# Mini E-Commerce Store

A React 19 and Vite training application demonstrating product browsing,
registration, protected product details, and a shared shopping cart.

## Run locally

```bash
npm install
npm run dev
```

## Application flow

- `/` displays the product listing and search.
- Selecting a product while not registered takes the shopper to `/register`
  and remembers the selected product.
- After successful registration, the shopper is taken to that product's
  `/products/:productId` details page. Registered shoppers can select a product
  and go directly to its details.
- Product details show the image, title, category, rating, price, and
  description. Use **Back to products** or the browser Back button to return to
  the listing.
- The header shows registration details at the top right and a cart link with
  the current item count.
- `/cart` lists cart items, allows quantity increases and decreases, removes
  items, and displays the subtotal.

Registration and cart state are stored in React Context for the current page
session. The demo registration keeps only the user's name and email; refreshing
the page resets both. No password is persisted.

## React 19 features

- **`use()` and Suspense:** `src/data/products.js` exposes a cached Promise.
  `ProductList` and the product details route read it using React's `use()`.
  Their Suspense boundary shows the animated product-card skeleton in
  `src/components/ProductListSkeleton.jsx` while the Promise is pending.
  `ProductErrorBoundary` handles rendering and data errors separately from the
  Suspense loading state.
- **Form Actions:** `RegistrationForm` submits with `<form action={...}>` and
  `useActionState()` to validate inputs and simulate an asynchronous request.
  Its child submit button calls `useFormStatus()` to show the pending state.
- **Context:** The registered user uses the React 19
  `<UserContext value={...}>` syntax. The shared cart uses
  `<CartContext value={...}>` in `src/context/CartProvider.jsx`.
- **Optimistic cart:** `useOptimistic()` in `CartProvider` updates the shared
  cart immediately while the simulated add request runs. Product cards and the
  product details page can add items; a failure on the details page restores
  the actual cart state and shows an inline error.
- **Document metadata:** React 19 `<title>` and `<meta name="description">`
  elements set route-specific browser metadata.
- **Asset loading:** `preconnect()` connects early to the Fake Store image
  host; `preload()` prioritizes the first product image on the catalog page.
- **Refs:** `ProductSearch` accepts `ref` directly as a React 19 prop and uses
  it to focus the search field. `ProductDetails` uses a callback ref to observe
  its size and returns cleanup to disconnect the `ResizeObserver`.

## Server Components and React Compiler

This Vite project renders on the client and does not implement React Server
Components. With a framework that supports RSC, such as Next.js, product
details could be fetched and rendered by a Server Component. The interactive
Add to Cart control would remain a Client Component to handle clicks and
optimistic cart updates. A server-rendered product page could pass serializable
product data to that control.

React Compiler can automatically optimize component rendering and
memoization. In a larger catalog, it could reduce unnecessary product-card
work when unrelated cart state changes. React Compiler is not enabled in this
Vite project.
