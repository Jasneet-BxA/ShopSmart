'use client';

import { Button } from '@/components/ui/button';
import { CartItem, useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  const grandTotal = cart.reduce(
    (total: number, item: CartItem) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item: CartItem) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-contain"
                />
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>

                  <div className="flex items-center space-x-2 mt-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1} // disable when quantity = 1
                      className={item.quantity === 1 ? 'cursor-not-allowed opacity-50' : ''}
                    >
                      -
                    </Button>
                    <span className="min-w-[24px] text-center">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </p>
                <Button
                  variant="destructive"
                  onClick={() => removeFromCart(item.id)}
                  className="mt-2"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}

          <div className="text-right pt-6 border-t mt-8">
            <p className="text-xl font-bold">Grand Total: ${grandTotal.toFixed(2)}</p>
            <div className="flex justify-end gap-4 mt-4">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
