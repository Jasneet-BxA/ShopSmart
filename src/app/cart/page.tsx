'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      title: 'Sample Product 1',
      price: 29.99,
      quantity: 2,
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    },
    {
      id: 2,
      title: 'Sample Product 2',
      price: 15.5,
      quantity: 1,
      image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    },
  ]);

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0)
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p>Add some products to your cart.</p>
      </div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <ul className="space-y-4">
        {cartItems.map(({ id, title, price, quantity, image }) => (
          <li
            key={id}
            className="flex items-center border rounded p-4 shadow-sm"
          >
            <img
              src={image}
              alt={title}
              className="w-24 h-24 object-contain rounded"
            />
            <div className="flex-1 ml-4">
              <h2 className="font-semibold text-lg">{title}</h2>
              <p>Price: ${price.toFixed(2)}</p>
              <p>Quantity: {quantity}</p>
              <p>Subtotal: ${(price * quantity).toFixed(2)}</p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeFromCart(id)}
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-between items-center">
        <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
        <Button variant="outline" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>
    </div>
  );
}
