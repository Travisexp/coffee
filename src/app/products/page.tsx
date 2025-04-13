'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/ui/header/header';
import Footer from '@/components/ui/footer/footer';
import ProductCard from '@/components/ui/product-card/product-card';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { useProducts } from '@/hooks/use-products';
import { useFilter } from '@/hooks/use-filter';
import { useSearchParams } from 'next/navigation';

export default function ProductsPage() {
  const { products } = useProducts();
  const { 
    categoryFilter, 
    priceFilter, 
    sortOption, 
    setCategory, 
    setPrice, 
    setSort 
  } = useFilter();
  
  const [filterOpen, setFilterOpen] = useState(false);
  const searchParams = useSearchParams();

  // Apply URL query parameters to filters on initial load
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setCategory(category);
    }
    
    const sort = searchParams.get('sort');
    if (sort) {
      setSort(sort);
    }
  }, [searchParams, setCategory, setSort]);

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    // Filter by category
    if (categoryFilter && product.category !== categoryFilter) {
      return false;
    }
    
    // Filter by price
    if (priceFilter) {
      const price = product.price;
      if (priceFilter === '0-25' && (price < 0 || price > 25)) {
        return false;
      } else if (priceFilter === '25-50' && (price < 25 || price > 50)) {
        return false;
      } else if (priceFilter === '50+' && price < 50) {
        return false;
      }
    }
    
    return true;
  });

  // Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-low') {
      return a.price - b.price;
    } else if (sortOption === 'price-high') {
      return b.price - a.price;
    } else if (sortOption === 'newest') {
      // In a real app, we would sort by date
      return 0;
    }
    // Default: featured
    return 0;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-gray-200">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#e0a0b0] mb-4">All Products</h1>
          <div className="flex items-center justify-center text-sm">
            <a href="/" className="text-gray-400 hover:text-white">Home</a>
            <span className="mx-2">/</span>
            <span className="text-[#e0a0b0]">All Products</span>
          </div>
        </div>
        
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-6">
          <button 
            onClick={toggleFilter}
            className="w-full flex items-center justify-between bg-[#1e1e1e] p-4 rounded-md"
          >
            <div className="flex items-center">
              <Filter size={18} className="mr-2" />
              <span>Filter & Sort</span>
            </div>
            {filterOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          
          {filterOpen && (
            <div className="bg-[#1e1e1e] mt-2 p-4 rounded-md">
              <div className="mb-4">
                <label className="block mb-2 font-medium">Category</label>
                <select 
                  value={categoryFilter}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 bg-[#2a2a2a] border border-gray-700 rounded-md text-white"
                >
                  <option value="">All Categories</option>
                  <option value="Category 1">Category 1</option>
                  <option value="Category 2">Category 2</option>
                  <option value="Category 3">Category 3</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 font-medium">Price</label>
                <select 
                  value={priceFilter}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-2 bg-[#2a2a2a] border border-gray-700 rounded-md text-white"
                >
                  <option value="">All Prices</option>
                  <option value="0-25">$0 - $25</option>
                  <option value="25-50">$25 - $50</option>
                  <option value="50+">$50+</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-2 font-medium">Sort By</label>
                <select 
                  value={sortOption}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full p-2 bg-[#2a2a2a] border border-gray-700 rounded-md text-white"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row">
          {/* Desktop Filter Sidebar */}
          <div className="hidden md:block w-64 mr-8">
            <div className="bg-[#1e1e1e] p-4 rounded-md mb-4">
              <h3 className="font-bold text-lg mb-4">Filter by Category</h3>
              <select 
                value={categoryFilter}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 bg-[#2a2a2a] border border-gray-700 rounded-md text-white mb-4"
              >
                <option value="">All Categories</option>
                <option value="Category 1">Category 1</option>
                <option value="Category 2">Category 2</option>
                <option value="Category 3">Category 3</option>
              </select>
              
              <h3 className="font-bold text-lg mb-4">Filter by Price</h3>
              <select 
                value={priceFilter}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 bg-[#2a2a2a] border border-gray-700 rounded-md text-white"
              >
                <option value="">All Prices</option>
                <option value="0-25">$0 - $25</option>
                <option value="25-50">$25 - $50</option>
                <option value="50+">$50+</option>
              </select>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="flex-grow">
            <div className="hidden md:flex justify-end mb-6">
              <select 
                value={sortOption}
                onChange={(e) => setSort(e.target.value)}
                className="p-2 bg-[#2a2a2a] border border-gray-700 rounded-md text-white"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
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
            
            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <nav className="flex items-center">
                <a href="#" className="px-3 py-2 border border-gray-700 rounded-l-md bg-[#1e1e1e] hover:bg-[#2a2a2a]">
                  &laquo;
                </a>
                <a href="#" className="px-3 py-2 border-t border-b border-gray-700 bg-[#8b2942] text-white">
                  1
                </a>
                <a href="#" className="px-3 py-2 border-t border-b border-gray-700 bg-[#1e1e1e] hover:bg-[#2a2a2a]">
                  2
                </a>
                <a href="#" className="px-3 py-2 border-t border-b border-gray-700 bg-[#1e1e1e] hover:bg-[#2a2a2a]">
                  3
                </a>
                <a href="#" className="px-3 py-2 border border-gray-700 rounded-r-md bg-[#1e1e1e] hover:bg-[#2a2a2a]">
                  &raquo;
                </a>
              </nav>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
