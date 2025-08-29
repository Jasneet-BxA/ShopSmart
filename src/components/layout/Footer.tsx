import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600">
        {/* Left */}
        <div>
          <h2 className="text-lg font-semibold mb-2">ShopSmart</h2>
          <p className="text-gray-500">
            Your one-stop destination for quality and affordable products.
          </p>
        </div>

        {/* Center Links */}
        <div className="flex flex-col space-y-2">
          <Link href="/" className="hover:text-primary">Home</Link>
          <Link href="/product" className="hover:text-primary">Products</Link>
          <Link href="/about" className="hover:text-primary">About</Link>
          <Link href="/contact" className="hover:text-primary">Contact</Link>
        </div>

        {/* Right */}
        <div className="flex flex-col space-y-2">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Support</span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t py-4 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} ShopSmart. All rights reserved.
      </div>
    </footer>
  );
}
