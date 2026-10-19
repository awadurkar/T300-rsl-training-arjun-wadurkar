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
    <section ref={detailsRef} aria-labelledby="details-heading">
      <h2 id="details-heading">{product.title}</h2>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <strong>${product.price.toFixed(2)}</strong>
      <p>Details section width: {width}px</p>

      <AddToCartButton product={product} />
    </section>
  )
}