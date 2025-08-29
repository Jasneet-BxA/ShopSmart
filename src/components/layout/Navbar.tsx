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

export default function Navbar() {
  const router = useRouter();

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
        <Link href="/cart" className="text-gray-700 hover:text-gray-900">
          Cart
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
