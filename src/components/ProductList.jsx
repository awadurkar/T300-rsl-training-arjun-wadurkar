import { use, useState, useTransition } from 'react'
import { getProducts } from '../data/products'
import { useCart } from '../context/CartContext'

function ProductActions({ product, canSelect, onSelectProduct }) {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')
  const { addToCart } = useCart()

  function handleAddToCart() {
    setMessage('')

    startTransition(async () => {
      const succeeded = await addToCart(product, false)
      setMessage(
        succeeded
          ? `${product.title} added to cart.`
          : `Could not add ${product.title} to cart.`,
      )
    })
  }

  return (
    <>
      <div className="product-card-actions">
        <button type="button" onClick={() => onSelectProduct(product)}>
          {canSelect ? 'View details' : 'Register to view details'}
        </button>
        {canSelect && (
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isPending}
          >
            {isPending ? 'Adding…' : 'Add to cart'}
          </button>
        )}
      </div>
      {message && (
        <p className="visually-hidden" role="status">
          {message}
        </p>
      )}
    </>
  )
}

export default function ProductList({
  query,
  canSelect,
  onSelectProduct,
}) {
  const products = use(getProducts())
  const normalizedQuery = query.trim().toLowerCase()

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(normalizedQuery),
  )

  return (
    <section aria-labelledby="products-heading">
      <h2 id="products-heading">Products</h2>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p className="product-category">Category: {product.category}</p>
            <strong>Price: ${product.price.toFixed(2)}</strong>
            <ProductActions
              product={product}
              canSelect={canSelect}
              onSelectProduct={onSelectProduct}
            />
          </article>
        ))}
      </div>
    </section>
  )
}