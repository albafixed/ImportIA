import React, { useState, useCallback } from 'react';
import { Product } from './types';
import { fetchProductRecommendations } from './services/geminiService';
import ProductCard from './components/ProductCard';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import { SearchIcon } from './components/icons/SearchIcon';
import { ProductsIcon } from './components/icons/ProductsIcon';

const NICHES = [
  'Herramientas',
  'Tecnología',
  'Hogar y Jardín',
  'Juguetes y Hobbies',
  'Deportes y Aire Libre',
  'Moda y Accesorios',
  'Salud y Belleza',
  'Automotriz',
];

const MARKETPLACES = [
  { code: 'uy', name: 'Uruguay' },
  { code: 'ar', name: 'Argentina' },
];

function App(): React.ReactNode {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedNiche, setSelectedNiche] = useState<string>(NICHES[0]);
  const [selectedMarketplace, setSelectedMarketplace] = useState<string>(MARKETPLACES[0].code);

  const getRecommendations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setProducts(null);
    try {
      const recommendedProducts = await fetchProductRecommendations(selectedNiche);
      setProducts(recommendedProducts);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido al procesar tu solicitud.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedNiche]);

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return <ErrorMessage message={error} onRetry={getRecommendations} />;
    }
    if (products) {
      return (
        <div className="mt-10 animate-fade-in">
          <h2 className="flex items-center text-2xl font-bold text-slate-100 mb-4 pb-2 border-b-2 border-sky-500/50">
            <ProductsIcon className="w-7 h-7 mr-3 text-sky-400" />
            Productos Destacados
          </h2>
          <div className="space-y-4 mt-6">
            {products.map((product) => (
              <ProductCard key={product.productName} product={product} marketplace={selectedMarketplace} />
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen text-slate-200 flex flex-col items-center justify-start font-sans p-4">
      <main className="w-full max-w-3xl mx-auto my-10 md:my-16">
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700/80 rounded-xl shadow-2xl p-6 md:p-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Tu Asistente de Importación IA
            </h1>
            <p className="text-slate-300 mt-3 text-base md:text-lg max-w-2xl mx-auto">
              Analiza las últimas tendencias en Alibaba y descubre productos novedosos con alto potencial.
              <br />
              <strong className="font-semibold text-sky-400">Selecciona un nicho</strong> para recibir recomendaciones de artículos económicos y fáciles de importar.
            </p>
          </div>

          <div className="mt-8 space-y-4 md:space-y-0 md:flex md:items-end md:space-x-4">
            <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="niche-select" className="block text-sm font-medium text-slate-300 mb-2">
                  Selecciona un Nicho:
                </label>
                <select
                  id="niche-select"
                  value={selectedNiche}
                  onChange={(e) => setSelectedNiche(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                >
                  {NICHES.map(niche => (
                    <option key={niche} value={niche}>{niche}</option>
                  ))}
                </select>
              </div>
              <div>
                 <label htmlFor="marketplace-select" className="block text-sm font-medium text-slate-300 mb-2">
                    Mercado Local:
                </label>
                <select
                    id="marketplace-select"
                    value={selectedMarketplace}
                    onChange={(e) => setSelectedMarketplace(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                >
                    {MARKETPLACES.map(market => (
                      <option key={market.code} value={market.code}>{market.name}</option>
                    ))}
                </select>
              </div>
            </div>
            <button
              onClick={getRecommendations}
              disabled={isLoading}
              className="w-full md:w-auto flex-shrink-0 flex items-center justify-center px-6 py-2.5 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-sky-500/30"
            >
              <SearchIcon className="w-5 h-5 mr-2" />
              Buscar Tendencias
            </button>
          </div>

          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;