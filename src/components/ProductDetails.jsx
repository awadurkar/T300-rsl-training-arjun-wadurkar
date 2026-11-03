import { useCallback, useState } from 'react'
import AddToCartButton from './AddToCartButton'

export default function ProductDetails({ product }) {
  const [width, setWidth] = useState(0)

  const detailsRef = useCallback((node) => {
    if (!node) return

    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.round(entry.contentRect.width))
    })

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  if (!product) {
    return <p>Select a product to see its details.</p>
  }

  return (
    <section
      className="product-details"
      ref={detailsRef}
      aria-labelledby="details-heading"
    >
      <div className="product-details-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-details-info">
        <p className="product-category">{product.category}</p>
        <h2 id="details-heading">{product.title}</h2>
        {product.rating && (
          <p className="product-rating" aria-label={`Rated ${product.rating.rate} out of 5`}>
            <span aria-hidden="true">★</span> {product.rating.rate} / 5
            <span className="rating-count">
              ({product.rating.count} reviews)
            </span>
          </p>
        )}
        <strong className="product-details-price">
          ${product.price.toFixed(2)}
        </strong>
        <div>
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>
        <p className="details-measurement">
          Details section width: {width}px
        </p>
        <AddToCartButton product={product} />
      </div>
    </section>
  )
}