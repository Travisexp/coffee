'use client';

import { useEffect } from 'react';
import Header from '@/components/ui/header/header';
import Footer from '@/components/ui/footer/footer';
import ProductCard from '@/components/ui/product-card/product-card';
import Link from 'next/link';
import { useProducts } from '@/hooks/use-products';

export default function Home() {
  const { getFeaturedProducts } = useProducts();
  const featuredProducts = getFeaturedProducts();

  // Mock data for categories
  const categories = [
    { id: '1', name: 'Category 1' },
    { id: '2', name: 'Category 2' },
    { id: '3', name: 'Category 3' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-gray-200">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[#2a1a20] py-16 md:py-24 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-[#e0a0b0] mb-4">
              Quality Products for Every Need
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Discover our curated collection of premium products designed to enhance your lifestyle.
            </p>
            <Link 
              href="/products" 
              className="inline-block bg-[#8b2942] hover:bg-[#a03050] text-white font-bold py-3 px-8 rounded-md transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </section>
        
        {/* Featured Products Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-[#e0a0b0] mb-12">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard 
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  discount={product.discount}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-16 bg-[#1a1a1a]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-[#e0a0b0] mb-12">
              Shop by Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Link 
                  key={category.id}
                  href={`/products?category=${category.id}`}
                  className="h-48 bg-[#2a2a2a] rounded-lg flex items-center justify-center text-2xl font-bold text-[#e0a0b0] hover:scale-[1.03] transition-transform"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-16 bg-[#8b2942] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Get 10% off!</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Subscribe to our newsletter and be the first to discover exclusive offers, and early access to special releases.
            </p>
            <form className="flex max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-l-md text-gray-800 focus:outline-none"
              />
              <button 
                type="submit" 
                className="bg-gray-800 hover:bg-gray-900 px-6 py-3 rounded-r-md font-bold transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
