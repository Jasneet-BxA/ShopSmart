'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';
import AddToCartButton from './AddToCart';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
    });

    console.log(`✅ Added product ${product.title} to cart`);
  };

  return (
    <div className="border rounded-md p-4 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      <Link href={`/product/${product.id}`}>
        <div className="relative w-full h-48 mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain rounded-md"
          />
        </div>
        <h3 className="text-lg font-semibold line-clamp-2">{product.title}</h3>
      </Link>

      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="text-primary font-bold text-lg">${product.price.toFixed(2)}</span>
        <AddToCartButton
                id={product.id}
                name={product.title}
                price={product.price}
                image={product.image}
              />
      </div>
    </div>
  );
};

export default ProductCard;
