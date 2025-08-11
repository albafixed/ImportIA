
import React, { useState } from 'react';
import { SearchIcon } from './icons/SearchIcon';

const NICHES = [
  'Tecnología y Gadgets',
  'Hogar Inteligente',
  'Fitness y Bienestar',
  'Juguetes y Hobbies RC',
  'Deportes y Aire Libre',
  'Moda y Accesorios Urbanos',
  'Belleza y Cuidado Personal',
  'Componentes Automotrices',
];

const MARKETPLACES = [
  { code: 'uy', name: 'Uruguay' },
  { code: 'ar', name: 'Argentina' },
  { code: 'cl', name: 'Chile' },
  { code: 'co', name: 'Colombia' },
  { code: 'mx', name: 'México' },
  { code: 'pe', name: 'Perú' },
];

interface ControlPanelProps {
  onSearch: (niche: string) => void;
  isLoading: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onSearch, isLoading }) => {
  const [selectedNiche, setSelectedNiche] = useState<string>(NICHES[0]);
  const [selectedMarketplace, setSelectedMarketplace] = useState<string>(MARKETPLACES[0].code);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedNiche) {
      onSearch(selectedNiche);
    }
  };
  
  // Store marketplace in localStorage for ProductCard to access
  React.useEffect(() => {
    localStorage.setItem('selectedMarketplace', selectedMarketplace);
  }, [selectedMarketplace]);

  return (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/60 rounded-xl shadow-2xl p-6 md:p-8 glow-border">
      <div className="text-center">
        <p className="text-slate-300 mt-2 text-base md:text-lg max-w-2xl mx-auto">
          Descubre tendencias ocultas en Alibaba. 
          <strong className="font-semibold text-cyan-400"> Elige un nicho</strong> para que la IA revele productos económicos con alto potencial de reventa.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4 md:space-y-0 md:flex md:items-end md:space-x-4">
        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="niche-select" className="block text-sm font-medium text-slate-300 mb-2">
              Nicho de Mercado
            </label>
            <select
              id="niche-select"
              value={selectedNiche}
              onChange={(e) => setSelectedNiche(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
              aria-label="Seleccionar un nicho de mercado"
            >
              {NICHES.map(niche => (
                <option key={niche} value={niche}>{niche}</option>
              ))}
            </select>
          </div>
          <div>
             <label htmlFor="marketplace-select" className="block text-sm font-medium text-slate-300 mb-2">
                Mercado Local
            </label>
            <select
                id="marketplace-select"
                value={selectedMarketplace}
                onChange={(e) => setSelectedMarketplace(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                aria-label="Seleccionar mercado local"
            >
                {MARKETPLACES.map(market => (
                  <option key={market.code} value={market.code}>{market.name}</option>
                ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full md:w-auto flex-shrink-0 flex items-center justify-center px-6 py-2.5 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 hover:shadow-lg hover:shadow-cyan-500/40"
        >
          <SearchIcon className="w-5 h-5 mr-2" />
          {isLoading ? 'Analizando...' : 'Analizar Tendencias'}
        </button>
      </form>
    </div>
  );
};

export default ControlPanel;
