import { useState, useTransition } from 'react'
import { useCart } from '../context/CartContext'

export default function AddToCartButton({ product }) {
  const [isPending, startTransition] = useTransition()
  const [shouldFail, setShouldFail] = useState(false)
  const [error, setError] = useState('')
  const { addToCart } = useCart()

  function handleAddToCart() {
    setError('')

    startTransition(async () => {
      const succeeded = await addToCart(product, shouldFail)

      if (!succeeded) {
        setError('The request failed. Your cart was not changed.')
      }
    })
  }

  return (
    <div>
      <button type="button" onClick={handleAddToCart} disabled={isPending}>
        {isPending ? 'Adding…' : `Add to cart`}
      </button>

      <div className="simulate-failure">
        <label htmlFor={`simulate-failure-${product.id}`}>
          Simulate API failure
        </label>
        <input
          id={`simulate-failure-${product.id}`}
          type="checkbox"
          checked={shouldFail}
          onChange={(event) => setShouldFail(event.target.checked)}
        />
      </div>

      {error && <p className="simulate-failure-text" role="alert">{error}</p>}
    </div>
  )
}