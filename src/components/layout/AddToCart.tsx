'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/app/context/CartContext';

interface AddToCartButtonProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ id, name, price, image }) => {
  const { addToCart } = useCart();

  const handleAddToCartClick = () => {
    addToCart({
      id,
      name,
      price,
      quantity: 1,
      image,
    });
    alert(`Added ${name} to cart!`);
  };

  return (
    <Button size="sm" className='cursor-pointer' onClick={handleAddToCartClick}>
          Add to Cart
    </Button>
  );
};

export default AddToCartButton;
