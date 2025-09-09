'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

import { useCart } from '@/app/context/CartContext'; // adjust the path as needed

export default function Navbar() {
  const router = useRouter();
  const { cart } = useCart();

  // Calculate total quantity of items in the cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    console.log('User logged out');
    router.push('/login');
  };

  return (
    <nav className="w-full border-b bg-white px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold">
        MyStore
      </Link>

      <div className="flex items-center space-x-6">
        <Link href="/product" className="text-gray-700 hover:text-gray-900">
          All Products
        </Link>

        <Link href="/cart" className="relative text-gray-700 hover:text-gray-900">
          Cart <span className='text-black'>🛒</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>

        <Link href="/signup" className="text-gray-700 hover:text-gray-900">
          Sign Up
        </Link>
        <Link href="/login" className="text-gray-700 hover:text-gray-900">
          Login
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Account
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href="/orders">Orders</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
