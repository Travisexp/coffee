'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="w-full">
      <div className="bg-[#8b2942] text-white text-center py-2 text-sm">
        FREE STANDARD SHIPPING WHEN YOU SPEND $70+ - UPGRADE TO FREE EXPRESS SHIPPING FOR ORDERS OVER $110
      </div>
      <div className="bg-[#1e1e1e] shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-[#e0a0b0] text-2xl font-bold">RETAIL BRAND</Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/products" className="text-gray-300 hover:text-white">Shop</Link>
            <Link href="/products?category=featured" className="text-gray-300 hover:text-white">Featured</Link>
            <Link href="/about" className="text-gray-300 hover:text-white">About</Link>
            <Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white">
              <Search size={20} />
            </button>
            <Link href="/account" className="text-gray-300 hover:text-white">
              <User size={20} />
            </Link>
            <Link href="/cart" className="text-gray-300 hover:text-white">
              <ShoppingCart size={20} />
            </Link>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-gray-300 hover:text-white"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1e1e1e] border-t border-gray-700">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/products" 
                className="text-gray-300 hover:text-white py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                href="/products?category=featured" 
                className="text-gray-300 hover:text-white py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Featured
              </Link>
              <Link 
                href="/about" 
                className="text-gray-300 hover:text-white py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-300 hover:text-white py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
