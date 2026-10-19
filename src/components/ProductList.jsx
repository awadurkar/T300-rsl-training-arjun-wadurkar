import { use } from 'react'
import { getProducts } from '../data/products'

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
            <p>Category: {product.category}</p>
            <strong>Price: ${product.price.toFixed(2)}</strong>

            <button
              type="button"
              disabled={!canSelect}
              onClick={() => onSelectProduct(product)}
            >
              {canSelect
                ? `View details`
                : 'Register to view details'}
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}