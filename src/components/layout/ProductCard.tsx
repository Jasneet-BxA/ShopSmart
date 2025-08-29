"use client"
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();  
    e.stopPropagation(); 

    console.log(`Added product ${product.id} to cart`);
  };

  return (
    <Link
      href={`/product/${product.id}`} 
      className="block border rounded-md p-4 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
      style={{ cursor: 'pointer' }}
    >
      <div className="relative w-full h-48 mb-4">
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
          className="rounded-md"
        />
      </div>
      <h3 className="text-lg font-semibold line-clamp-2">{product.title}</h3>
      {/* <p className="text-sm text-gray-500 mt-1 line-clamp-3">{product.description}</p> */}
      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="text-primary font-bold text-lg">${product.price.toFixed(2)}</span>
        <Button size="sm" onClick={handleAddToCartClick}>
          Add to Cart
        </Button>
      </div>
    </Link>
  );
};

export default ProductCard;
