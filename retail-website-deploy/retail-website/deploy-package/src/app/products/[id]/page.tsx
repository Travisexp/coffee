'use client';

import { useState } from 'react';
import Header from '@/components/ui/header/header';
import Footer from '@/components/ui/footer/footer';
import ProductCard from '@/components/ui/product-card/product-card';
import { Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { useProducts } from '@/hooks/use-products';
import { useCart, CartItem } from '@/hooks/use-cart';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { getProduct, getRelatedProducts } = useProducts();
  const { addItem } = useCart();
  
  const product = getProduct(params.id);
  const relatedProducts = getRelatedProducts(params.id);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  // Handle cases where product is not found
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-[#121212] text-gray-200">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-[#e0a0b0] mb-4">Product Not Found</h1>
          <p className="mb-8">The product you are looking for does not exist or has been removed.</p>
          <Link 
            href="/products" 
            className="inline-block bg-[#8b2942] hover:bg-[#a03050] text-white font-bold py-3 px-8 rounded-md transition-colors"
          >
            Browse Products
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    // Validate that size and color are selected if they exist
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Please select a size');
      return;
    }
    
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert('Please select a color');
      return;
    }
    
    // Create cart item
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor
    };
    
    // Add to cart
    addItem(cartItem);
    
    // Show confirmation
    alert('Product added to cart!');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-gray-200">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm mb-8">
          <Link href="/" className="text-gray-400 hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="text-gray-400 hover:text-white">All Products</Link>
          <span className="mx-2">/</span>
          <span className="text-[#e0a0b0]">{product.name}</span>
        </div>
        
        {/* Product Detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1 space-y-4">
              {[1, 2, 3, 4].map((index) => (
                <div 
                  key={index}
                  className="h-20 bg-[#2a2a2a] rounded-md flex items-center justify-center text-gray-500 cursor-pointer"
                >
                  Thumb {index}
                </div>
              ))}
            </div>
            <div className="col-span-4 h-[500px] bg-[#2a2a2a] rounded-md flex items-center justify-center text-gray-500">
              Main Product Image
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-100 mb-4">{product.name}</h1>
            <p className="text-2xl font-bold text-[#e0a0b0] mb-4">${product.price.toFixed(2)}</p>
            
            {product.discount && (
              <div className="inline-block bg-[#3a1a25] text-[#e0a0b0] px-3 py-1 rounded-md text-sm font-bold mb-6">
                20% OFF AT CHECKOUT
              </div>
            )}
            
            <div className="mb-8">
              <p className="text-gray-300 mb-4">{product.description}</p>
            </div>
            
            {/* Product Options */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-4">
                <label className="block font-bold mb-2">Size</label>
                <select 
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full p-3 bg-[#2a2a2a] border border-gray-700 rounded-md text-white"
                >
                  <option value="">Select Size</option>
                  {product.sizes.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            )}
            
            {product.colors && product.colors.length > 0 && (
              <div className="mb-8">
                <label className="block font-bold mb-2">Color</label>
                <select 
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full p-3 bg-[#2a2a2a] border border-gray-700 rounded-md text-white"
                >
                  <option value="">Select Color</option>
                  {product.colors.map((color) => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>
            )}
            
            {/* Quantity Selector */}
            <div className="flex items-center mb-8">
              <div className="flex items-center border border-gray-700 rounded-md">
                <button 
                  onClick={decreaseQuantity}
                  className="w-10 h-10 flex items-center justify-center bg-[#2a2a2a] text-white rounded-l-md"
                >
                  <Minus size={16} />
                </button>
                <input 
                  type="text" 
                  value={quantity}
                  readOnly
                  className="w-16 h-10 text-center bg-[#2a2a2a] text-white border-x border-gray-700"
                />
                <button 
                  onClick={increaseQuantity}
                  className="w-10 h-10 flex items-center justify-center bg-[#2a2a2a] text-white rounded-r-md"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart}
              className="w-full py-4 bg-[#8b2942] hover:bg-[#a03050] text-white font-bold rounded-md transition-colors mb-8"
            >
              Add to Cart
            </button>
            
            {/* Product Meta */}
            <div className="border-t border-gray-700 pt-6 space-y-2 text-gray-400">
              {product.sku && <div>SKU: <span className="text-gray-200">{product.sku}</span></div>}
              {product.category && <div>Category: <span className="text-gray-200">{product.category}</span></div>}
              {product.tags && <div>Tags: <span className="text-gray-200">{product.tags.join(', ')}</span></div>}
            </div>
          </div>
        </div>
        
        {/* Product Tabs */}
        <div className="mb-16">
          <div className="flex border-b border-gray-700 mb-8">
            <button 
              onClick={() => setActiveTab('description')}
              className={`py-4 px-6 font-medium relative ${
                activeTab === 'description' 
                  ? 'text-[#e0a0b0] border-b-2 border-[#8b2942]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Description
            </button>
            <button 
              onClick={() => setActiveTab('additional')}
              className={`py-4 px-6 font-medium relative ${
                activeTab === 'additional' 
                  ? 'text-[#e0a0b0] border-b-2 border-[#8b2942]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Additional Information
            </button>
            <button 
              onClick={() => setActiveTab('usage')}
              className={`py-4 px-6 font-medium relative ${
                activeTab === 'usage' 
                  ? 'text-[#e0a0b0] border-b-2 border-[#8b2942]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Usage Guide
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-6 font-medium relative ${
                activeTab === 'reviews' 
                  ? 'text-[#e0a0b0] border-b-2 border-[#8b2942]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Reviews
            </button>
          </div>
          
          <div className="text-gray-300">
            {activeTab === 'description' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-100 mb-4">Product Description</h3>
                <p className="mb-4">{product.description}</p>
                <p className="mb-6">{product.description}</p>
                
                {product.features && product.features.length > 0 && (
                  <>
                    <h3 className="text-2xl font-bold text-gray-100 mb-4">Features</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
            
            {activeTab === 'additional' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-100 mb-4">Additional Information</h3>
                <p>Additional product information would be displayed here.</p>
              </div>
            )}
            
            {activeTab === 'usage' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-100 mb-4">Usage Guide</h3>
                <p>Product usage instructions would be displayed here.</p>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-100 mb-4">Customer Reviews</h3>
                <p>Product reviews would be displayed here.</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Related Products */}
        <div>
          <h2 className="text-3xl font-bold text-center text-[#e0a0b0] mb-12">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
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
      </main>
      
      <Footer />
    </div>
  );
}
