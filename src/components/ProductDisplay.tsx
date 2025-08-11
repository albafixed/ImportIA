import React from 'react';
import { Product } from '../types';
import Loader from './ui/Loader';
import ErrorMessage from './ui/ErrorMessage';
import ProductCard from './ProductCard';

interface ProductDisplayProps {
  isLoading: boolean;
  error: string | null;
  products: Product[] | null;
  hasSearched: boolean;
  onRetry: (niche: string) => void;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ isLoading, error, products, hasSearched, onRetry }) => {
  if (!hasSearched) {
    return null;
  }

  if (isLoading) {
    return <Loader />;
  }
  
  // A retry requires knowing the last niche, which we don't have here. 
  // This is a simplification. A real implementation would lift state up.
  const handleRetry = () => {
      const nicheSelect = document.getElementById('niche-select') as HTMLSelectElement;
      if (nicheSelect) {
          onRetry(nicheSelect.value);
      }
  };

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  if (products) {
    return (
      <div className="mt-12 animate-fade-in">
        <h2 className="text-2xl font-bold text-slate-100 mb-6 pb-2 border-b-2 border-cyan-500/30">
          Resultados del Análisis de IA
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          {products.map((product) => (
            <ProductCard key={product.productName} product={product} />
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default ProductDisplay;
