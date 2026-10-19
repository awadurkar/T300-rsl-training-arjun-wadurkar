import { useCallback, useOptimistic, useState } from 'react'
import { CartContext } from './CartContext'

function addProduct(cartItems, product) {
  const existingItem = cartItems.find((item) => item.id === product.id)

  if (existingItem) {
    return cartItems.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    )
  }

  return [...cartItems, { ...product, quantity: 1 }]
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [optimisticCartItems, addOptimisticProduct] = useOptimistic(
    cartItems,
    addProduct,
  )

  const addToCart = useCallback(
    async (product, shouldFail) => {
      addOptimisticProduct(product)
      await new Promise((resolve) => setTimeout(resolve, 900))

      if (shouldFail) {
        return false
      }

      setCartItems((currentItems) => addProduct(currentItems, product))
      return true
    },
    [addOptimisticProduct],
  )

  const changeQuantity = useCallback((productId, amount) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item,
      ),
    )
  }, [])

  const removeFromCart = useCallback((productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    )
  }, [])

  const itemCount = optimisticCartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  )

  return (
    <CartContext
      value={{
        cartItems: optimisticCartItems,
        itemCount,
        addToCart,
        changeQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext>
  )
}
