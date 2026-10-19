import { useOptimistic, useState, useTransition } from 'react'

export default function AddToCartButton({ product }) {
  const [cartCount, setCartCount] = useState(0)
  const [optimisticCount, addOptimistic] = useOptimistic(
    cartCount,
    (currentCount, amount) => currentCount + amount,
  )
  const [isPending, startTransition] = useTransition()
  const [shouldFail, setShouldFail] = useState(false)
  const [error, setError] = useState('')

  function handleAddToCart() {
    setError('')

    startTransition(async () => {
      addOptimistic(1)

      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (shouldFail) {
        setError('The request failed. Your cart was not changed.')
        return
      }

      setCartCount((count) => count + 1)
    })
  }

  return (
    <div>
      <p aria-live="polite">Cart: {optimisticCount}</p>

      <button type="button" onClick={handleAddToCart} disabled={isPending}>
        {isPending ? 'Adding…' : `Add ${product.title} to cart`}
      </button>

      <label>
        <input
          type="checkbox"
          checked={shouldFail}
          onChange={(event) => setShouldFail(event.target.checked)}
        />
        Simulate API failure
      </label>

      {error && <p role="alert">{error}</p>}
    </div>
  )
}