
import React, { useState, useCallback } from 'react';
import { Product } from './types';
import { fetchProductRecommendations } from './services/apiClient';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ControlPanel from './components/ControlPanel';
import ProductDisplay from './components/ProductDisplay';

function App(): React.ReactNode {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = useCallback(async (niche: string) => {
    setIsLoading(true);
    setError(null);
    setProducts(null);
    setHasSearched(true);
    try {
      const recommendedProducts = await fetchProductRecommendations(niche);
      setProducts(recommendedProducts);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen text-slate-200 flex flex-col items-center justify-between font-sans p-4 bg-transparent">
      <Header />
      <main className="w-full max-w-4xl mx-auto my-10 md:my-16 flex-grow">
        <ControlPanel onSearch={handleSearch} isLoading={isLoading} />
        <ProductDisplay
          isLoading={isLoading}
          error={error}
          products={products}
          hasSearched={hasSearched}
          onRetry={handleSearch}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
