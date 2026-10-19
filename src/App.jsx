import { Suspense, useRef, useState } from 'react'
import { preconnect, preload } from 'react-dom'
import { UserContext } from './context/UserContext'
import { products } from './data/products'
import ProductDetails from './components/ProductDetails'
import ProductErrorBoundary from './components/ProductErrorBoundary'
import ProductList from './components/ProductList'
import RegistrationForm from './components/RegistrationForm'
import RegisteredUser from './components/RegisteredUser'
import { SearchInput } from './components/ProductSearch'
import './App.css'

export default function App() {
  const [user, setUser] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [query, setQuery] = useState('')
  const searchRef = useRef(null)

  preconnect('https://images.unsplash.com')
  preload(products[0].image, { as: 'image' })

  return (
    <UserContext value={{ user, setUser }}>
      <main className="store">
        <title>Mini E-Commerce Store – Products</title>
        <meta
          name="description"
          content="Browse products and register at the Mini E-Commerce Store."
        />

        <header>
          <h1>Mini E-Commerce Store</h1>
          <p>Cart items are shown in the selected product details.</p>
        </header>

        <RegistrationForm />
        <RegisteredUser />

        <section>
          <h2>Find a product</h2>
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
        </section>

        <ProductErrorBoundary>
          <Suspense fallback={<p role="status">Loading products…</p>}>
            <ProductList
              query={query}
              canSelect={Boolean(user)}
              onSelectProduct={setSelectedProduct}
            />
          </Suspense>
        </ProductErrorBoundary>

        <ProductDetails product={selectedProduct} />
      </main>
    </UserContext>
  )
}