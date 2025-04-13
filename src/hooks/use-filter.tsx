'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface FilterContextType {
  category: string | null;
  priceRange: [number, number];
  sortBy: 'featured' | 'price-low-high' | 'price-high-low';
  setCategory: (category: string | null) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sort: 'featured' | 'price-low-high' | 'price-high-low') => void;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [category, setCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low-high' | 'price-high-low'>('featured');

  const resetFilters = () => {
    setCategory(null);
    setPriceRange([0, 100]);
    setSortBy('featured');
  };

  return (
    <FilterContext.Provider value={{
      category,
      priceRange,
      sortBy,
      setCategory,
      setPriceRange,
      setSortBy,
      resetFilters
    }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
