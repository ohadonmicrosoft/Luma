import React, { useState } from 'react';
import { Specification } from './TechnicalSpecs';
import { useTranslation } from 'next-i18next';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
// Comment out or remove the Tag import since we don't have that component yet
// import { Tag } from '@/components/ui/Tag';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  specifications: Specification[];
}

export interface ProductComparisonProps {
  products: Product[];
  onClose: () => void;
}

const ProductComparison: React.FC<ProductComparisonProps> = ({ products, onClose }) => {
  // We're creating a simple placeholder component for now
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t p-4 z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Product Comparison</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex overflow-x-auto pb-4">
        {products.map((product) => (
          <div key={product.id} className="min-w-[250px] p-4 border-r">
            <h4 className="font-medium">{product.name}</h4>
            <p className="text-sm text-gray-500 mt-1">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductComparison;
