'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/ui/header/header';
import Footer from '@/components/ui/footer/footer';
import Link from 'next/link';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';

export default function CartPage() {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    subtotal, 
    discount, 
    total 
  } = useCart();
  
  const [promoCode, setPromoCode] = useState('');
  const shipping = subtotal >= 70 ? 0 : 5.99;

  const applyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would validate the promo code with the backend
    alert(`Promo code "${promoCode}" applied!`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-gray-200">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#e0a0b0] mb-4">Your Shopping Cart</h1>
        </div>
        
        {items.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Looks like you haven't added any products to your cart yet.</p>
            <Link 
              href="/products" 
              className="inline-block bg-[#8b2942] hover:bg-[#a03050] text-white font-bold py-3 px-8 rounded-md transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-[#1e1e1e] rounded-lg overflow-hidden mb-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-4">Product</th>
                      <th className="text-left p-4 hidden md:table-cell">Price</th>
                      <th className="text-left p-4">Quantity</th>
                      <th className="text-left p-4 hidden md:table-cell">Total</th>
                      <th className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b border-gray-700">
                        <td className="p-4">
                          <div className="flex flex-col md:flex-row items-start">
                            <div className="w-20 h-20 bg-[#2a2a2a] flex items-center justify-center text-gray-500 mb-3 md:mb-0 md:mr-4">
                              {item.image ? (
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                'Image'
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              {item.size && <p className="text-sm text-gray-400">Size: {item.size}</p>}
                              {item.color && <p className="text-sm text-gray-400">Color: {item.color}</p>}
                              <p className="text-[#e0a0b0] font-bold md:hidden mt-2">
                                ${item.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <span className="text-[#e0a0b0] font-bold">
                            ${item.price.toFixed(2)}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center border border-gray-700 rounded-md w-24">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center bg-[#2a2a2a] text-white rounded-l-md"
                            >
                              <Minus size={14} />
                            </button>
                            <input 
                              type="text" 
                              value={item.quantity}
                              readOnly
                              className="w-8 h-8 text-center bg-[#2a2a2a] text-white border-x border-gray-700"
                            />
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center bg-[#2a2a2a] text-white rounded-r-md"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <span className="text-[#e0a0b0] font-bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-white"
                          >
                            <X size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="text-center md:text-left">
                <Link 
                  href="/products" 
                  className="text-[#e0a0b0] hover:underline"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#1e1e1e] rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#e0a0b0] font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Discount (20% OFF)</span>
                    <span className="text-[#e0a0b0] font-bold">-${discount.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between pt-4 border-t border-gray-700 text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#e0a0b0]">${(total + shipping).toFixed(2)}</span>
                  </div>
                </div>
                
                <button className="w-full py-3 bg-[#8b2942] hover:bg-[#a03050] text-white font-bold rounded-md transition-colors mb-6">
                  Proceed to Checkout
                </button>
                
                <div>
                  <h3 className="font-bold mb-2">Promo Code</h3>
                  <form onSubmit={applyPromoCode} className="flex">
                    <input 
                      type="text" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-grow px-3 py-2 bg-[#2a2a2a] border border-gray-700 rounded-l-md text-white focus:outline-none"
                    />
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-r-md transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
