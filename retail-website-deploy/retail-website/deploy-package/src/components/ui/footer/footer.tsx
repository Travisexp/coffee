'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#1e1e1e] text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-[#e0a0b0] text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="hover:text-white transition-colors">Shop</Link></li>
              <li><Link href="/products?category=featured" className="hover:text-white transition-colors">Featured</Link></li>
              <li><Link href="/products?sort=newest" className="hover:text-white transition-colors">New Arrivals</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[#e0a0b0] text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[#e0a0b0] text-lg font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/sustainability" className="hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[#e0a0b0] text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Pinterest</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Retail Brand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
