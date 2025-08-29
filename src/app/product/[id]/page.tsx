interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

export default async function ProductPage({ params, }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <main className="min-h-screen max-w-5xl mx-auto p-6 bg-white rounded-md shadow-md">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="relative w-full md:w-1/2 h-96">
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

        <div className="flex flex-col justify-between w-full md:w-1/2">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <p className="text-sm text-gray-500 mb-2">Category: {product.category}</p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-extrabold text-primary">${product.price.toFixed(2)}</span>
          </div>
        </div>
        
      </div>
    </main>
  );
}
