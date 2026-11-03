import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { cartItems, changeQuantity, removeFromCart } = useCart()
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  return (
    <>
      <title>Your Cart – Mini E-Commerce Store</title>
      <meta
        name="description"
        content="Review and update the products in your shopping cart."
      />
      <section className="cart-page" aria-labelledby="cart-heading">
        <h2 id="cart-heading">Your cart</h2>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <Link to="/">Browse products</Link>
          </div>
        ) : (
          <>
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <div className="cart-item-details">
                    <h3>{item.title}</h3>
                    <p>${item.price.toFixed(2)} each</p>
                    <div
                      className="quantity-controls"
                      aria-label={`Quantity for ${item.title}`}
                    >
                      <button
                        type="button"
                        aria-label={`Decrease ${item.title} quantity`}
                        disabled={item.quantity === 1}
                        onClick={() => changeQuantity(item.id, -1)}
                      >
                        −
                      </button>
                      <span aria-live="polite">{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.title} quantity`}
                        onClick={() => changeQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <strong className="cart-line-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </strong>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                    <span className="visually-hidden"> {item.title}</span>
                  </button>
                </li>
              ))}
            </ul>

            <p className="cart-subtotal">
              Subtotal: <strong>${subtotal.toFixed(2)}</strong>
            </p>
            <Link className="continue-shopping" to="/">
              Continue shopping
            </Link>
          </>
        )}
      </section>
    </>
  )
}
