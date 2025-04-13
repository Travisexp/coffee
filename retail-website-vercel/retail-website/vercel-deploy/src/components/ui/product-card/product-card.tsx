'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  discount?: boolean;
}

const ProductCard = ({ id, name, price, image, discount = false }: ProductCardProps) => {
  return (
    <div className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-lg transition-transform hover:translate-y-[-5px] hover:shadow-xl">
      <Link href={`/products/${id}`}>
        <div className="h-64 bg-[#2a2a2a] flex items-center justify-center text-gray-500">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          ) : (
            'Product Image'
          )}
        </div>
        <div className="p-4">
          <h3 className="text-gray-200 text-lg font-medium mb-2">{name}</h3>
          <p className="text-[#e0a0b0] font-bold mb-2">${price.toFixed(2)}</p>
          {discount && (
            <Badge className="bg-[#3a1a25] text-[#e0a0b0] hover:bg-[#3a1a25]">
              20% OFF AT CHECKOUT
            </Badge>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
