import AddToCartButton from '@/components/layout/AddToCart';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('https://fakestoreapi.com/products', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const products = await fetchProducts();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded p-4 shadow hover:shadow-md transition flex flex-col"
          >
            <Link href={`/product/${product.id}`} className="flex-1 block">
              <img
                src={product.image}
                alt={product.title}
                className="h-48 w-full object-contain mb-4"
              />
              <h2 className="font-semibold text-lg">{product.title}</h2>
              <p className="font-bold">${product.price.toFixed(2)}</p>
            </Link>
            <div className="mt-4">
              <AddToCartButton
                id={product.id}
                name={product.title}
                price={product.price}
                image={product.image}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
