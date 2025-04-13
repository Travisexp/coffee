'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description: string;
  category: string;
  discount?: boolean;
  featured?: boolean;
  sku: string;
  tags?: string[];
  sizes?: string[];
  colors?: string[];
  features?: string[];
}

interface ProductsContextType {
  products: Product[];
  getProduct: (id: string) => Product | undefined;
  getRelatedProducts: (id: string) => Product[];
  getFeaturedProducts: () => Product[];
  getProductsByCategory: (category: string) => Product[];
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

// Sample product data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Product Name 1',
    price: 24.99,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
    category: 'Category 1',
    discount: true,
    featured: true,
    sku: 'PRD-12345',
    tags: ['featured', 'new', 'sale'],
    sizes: ['Small', 'Medium', 'Large'],
    colors: ['Black', 'White', 'Gray'],
    features: ['Feature 1', 'Feature 2', 'Feature 3']
  },
  {
    id: '2',
    name: 'Product Name 2',
    price: 19.99,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
    category: 'Category 2',
    discount: true,
    featured: true,
    sku: 'PRD-12346',
    tags: ['featured', 'bestseller'],
    sizes: ['Small', 'Medium', 'Large'],
    colors: ['Black', 'White', 'Gray']
  },
  {
    id: '3',
    name: 'Product Name 3',
    price: 29.99,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
    category: 'Category 1',
    discount: true,
    featured: true,
    sku: 'PRD-12347',
    tags: ['featured', 'new'],
    sizes: ['Small', 'Medium', 'Large'],
    colors: ['Black', 'White', 'Gray']
  },
  {
    id: '4',
    name: 'Product Name 4',
    price: 34.99,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
    category: 'Category 3',
    discount: true,
    featured: true,
    sku: 'PRD-12348',
    tags: ['featured', 'limited'],
    sizes: ['Small', 'Medium', 'Large'],
    colors: ['Black', 'White', 'Gray']
  },
  {
    id: '5',
    name: 'Product Name 5',
    price: 44.99,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
    category: 'Category 2',
    discount: false,
    featured: false,
    sku: 'PRD-12349',
    tags: ['new'],
    sizes: ['Small', 'Medium', 'Large'],
    colors: ['Black', 'White']
  },
  {
    id: '6',
    name: 'Product Name 6',
    price: 39.99,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
    category: 'Category 3',
    discount: false,
    featured: false,
    sku: 'PRD-12350',
    tags: ['bestseller'],
    sizes: ['Small', 'Medium', 'Large'],
    colors: ['Black', 'Gray']
  }
];

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products] = useState<Product[]>(sampleProducts);

  const getProduct = (id: string) => {
    return products.find(product => product.id === id);
  };

  const getRelatedProducts = (id: string) => {
    const product = getProduct(id);
    if (!product) return [];
    
    return products
      .filter(p => p.id !== id && p.category === product.category)
      .slice(0, 4);
  };

  const getFeaturedProducts = () => {
    return products.filter(product => product.featured).slice(0, 4);
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };

  return (
    <ProductsContext.Provider value={{
      products,
      getProduct,
      getRelatedProducts,
      getFeaturedProducts,
      getProductsByCategory
    }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
