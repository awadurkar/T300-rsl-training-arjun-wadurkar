import { Suspense, use, useCallback, useRef, useState } from 'react'
import { preconnect, preload } from 'react-dom'
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { UserContext, useUser } from './context/UserContext'
import { useCart } from './context/CartContext'
import { CartProvider } from './context/CartProvider'
import { getProducts, products } from './data/products'
import CartPage from './components/CartPage'
import ProductDetails from './components/ProductDetails'
import ProductErrorBoundary from './components/ProductErrorBoundary'
import ProductList from './components/ProductList'
import ProductListSkeleton from './components/ProductListSkeleton'
import RegistrationForm from './components/RegistrationForm'
import { SearchInput } from './components/ProductSearch'
import './App.css'

preconnect('https://fakestoreapi.com')

function CatalogPage() {
  const { user } = useUser()
  const [query, setQuery] = useState('')
  const searchRef = useRef(null)
  const navigate = useNavigate()

  preload(products[0].image, { as: 'image' })

  function selectProduct(product) {
    const detailsPath = `/products/${product.id}`

    if (user) {
      navigate(detailsPath)
      return
    }

    navigate('/register', { state: { from: detailsPath } })
  }

  return (
    <>
      <title>Mini E-Commerce Store – Products</title>
      <meta
        name="description"
        content="Browse products at the Mini E-Commerce Store."
      />

      <section className="catalog-tools">
        <h2>Products</h2>
        <div className="search-controls">
          <SearchInput
            ref={searchRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button
            type="button"
            onClick={() => searchRef.current?.focus()}
          >
            Focus search
          </button>
        </div>
      </section>

      <ProductList
        query={query}
        canSelect={Boolean(user)}
        onSelectProduct={selectProduct}
      />
    </>
  )
}

function ProtectedProductPage() {
  const { user } = useUser()
  const location = useLocation()

  if (!user) {
    return (
      <Navigate
        to="/register"
        replace
        state={{ from: location.pathname }}
      />
    )
  }

  return <ProductPage />
}

function ProductPage() {
  const { productId } = useParams()
  const productList = useProducts()
  const product = productList.find(
    (item) => String(item.id) === productId,
  )

  if (!product) {
    return (
      <section>
        <title>Product not found – Mini E-Commerce Store</title>
        <h2>Product not found</h2>
        <Link to="/">Back to products</Link>
      </section>
    )
  }

  return (
    <>
      <title>{`${product.title} – Mini E-Commerce Store`}</title>
      <meta name="description" content={product.description} />
      <Link className="back-link" to="/">
        ← Back to products
      </Link>
      <ProductDetails product={product} />
    </>
  )
}

function useProducts() {
  return use(getProducts())
}

function RegistrationPage() {
  const { user } = useUser()
  const location = useLocation()
  const navigate = useNavigate()
  const requestedPath = location.state?.from
  const returnTo =
    typeof requestedPath === 'string' &&
    requestedPath.startsWith('/') &&
    requestedPath !== '/register'
      ? requestedPath
      : '/'
  const handleRegistered = useCallback(
    () => navigate(returnTo, { replace: true }),
    [navigate, returnTo],
  )

  if (user) {
    return <Navigate to={returnTo} replace />
  }

  return (
    <>
      <title>Register – Mini E-Commerce Store</title>
      <meta
        name="description"
        content="Register to view product details and shop."
      />
      <Link className="back-link" to="/">
        ← Back to products
      </Link>
      <RegistrationForm onRegistered={handleRegistered} />
    </>
  )
}

function StoreRoutes() {
  return (
    <BrowserRouter>
      <main className="store">
        <StoreHeader />

        <ProductErrorBoundary>
          <Suspense fallback={<ProductListSkeleton />}>
            <Routes>
              <Route path="/" element={<CatalogPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/products/:productId"
                element={<ProtectedProductPage />}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </ProductErrorBoundary>
      </main>
    </BrowserRouter>
  )
}

function StoreHeader() {
  const { user } = useUser()
  const { itemCount } = useCart()

  return (
    <header className="store-header">
      <Link to="/" className="store-title">
        <h1>Mini E-Commerce Store</h1>
      </Link>
      <nav className="header-actions" aria-label="Store navigation">
        {user ? (
          <div className="header-user" aria-label="Registered user">
            <span className="header-user-name">{user.name}</span>
            <span className="header-user-email">{user.email}</span>
          </div>
        ) : (
          <Link className="header-register" to="/register">
            Register
          </Link>
        )}
        <Link
          className="header-cart"
          to="/cart"
          aria-label={`Cart, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
        >
          <span aria-hidden="true">🛒</span>
          <span>Cart</span>
          <span className="cart-count" aria-live="polite">
            {itemCount}
          </span>
        </Link>
      </nav>
    </header>
  )
}

export default function App() {
  const [user, setUser] = useState(null)

  return (
    <UserContext value={{ user, setUser }}>
      <CartProvider>
        <StoreRoutes />
      </CartProvider>
    </UserContext>
  )
}
