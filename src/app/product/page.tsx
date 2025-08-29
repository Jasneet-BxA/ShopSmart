import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('https://fakestoreapi.com/products', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const selectedCategory = searchParams.category || 'all';

  const products = await fetchProducts();
  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Category Filter */}
      <div className="mb-6 space-x-3">
        <Link
          href="/products"
          className={`px-4 py-2 rounded ${
            selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category}
            href={`/products?category=${encodeURIComponent(category)}`}
            className={`px-4 py-2 rounded ${
              selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {category}
          </Link>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="border rounded p-4 shadow hover:shadow-md transition block"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-48 w-full object-contain mb-4"
            />
            <h2 className="font-semibold text-lg">{product.title}</h2>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {product.description}
            </p>
            <p className="font-bold">${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
