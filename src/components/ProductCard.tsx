import React, { useMemo } from 'react';
import { Product } from '../types';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const marketplace = useMemo(() => localStorage.getItem('selectedMarketplace') || 'uy', []);

  const alibabaSearchUrl = `https://www.alibaba.com/trade/search?SearchText=${encodeURIComponent(product.alibabaSearchKeywords.join(' '))}`;
  const mercadoLibreSearchUrl = `https://listado.mercadolibre.com.${marketplace}/${encodeURIComponent(product.productName)}`;

  return (
    <div
      className="bg-slate-800/50 backdrop-blur-md rounded-xl p-5 border border-slate-700/60 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col md:flex-row gap-6"
    >
      <div className="md:w-1/3 flex-shrink-0">
        <img
          src={`data:image/jpeg;base64,${product.imageBase64}`}
          alt={`Imagen generada por IA de ${product.productName}`}
          className="w-full h-auto object-cover rounded-lg border border-slate-600/50 aspect-square"
        />
      </div>
      
      <div className="md:w-2/3 flex flex-col">
        <div>
          <h3 className="text-xl font-bold text-cyan-400">{product.productName}</h3>
          <p className="text-slate-300 mt-2 mb-4 text-sm">{product.description}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 my-4 border-t border-slate-700/60 pt-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-emerald-400 flex items-center">
              <CheckCircleIcon className="w-5 h-5 mr-2 flex-shrink-0" /> Ventajas
            </h4>
            <ul className="list-inside space-y-1.5 pl-1">
              {product.pros.map((pro, index) => (
                <li key={`pro-${index}`} className="text-slate-300 text-sm">{pro}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-rose-400 flex items-center">
              <XCircleIcon className="w-5 h-5 mr-2 flex-shrink-0" /> Consideraciones
            </h4>
            <ul className="list-inside space-y-1.5 pl-1">
              {product.cons.map((con, index) => (
                <li key={`con-${index}`} className="text-slate-300 text-sm">{con}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700/60 pt-4 mt-auto flex flex-col sm:flex-row gap-4 items-start sm:items-end justify-between">
          <div>
            <p className="text-xs text-slate-400 mb-1.5">Keywords para Alibaba:</p>
            <div className="flex flex-wrap gap-1.5">
              {product.alibabaSearchKeywords.map((keyword, index) => (
                  <span key={index} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full">{keyword}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <a
              href={alibabaSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-2 bg-orange-600/90 text-white text-sm font-semibold rounded-md hover:bg-orange-600 transition-colors"
            >
              En Alibaba
              <ExternalLinkIcon className="w-4 h-4 ml-2" />
            </a>
            <a
              href={mercadoLibreSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-2 bg-yellow-400 text-slate-900 text-sm font-semibold rounded-md hover:bg-yellow-500 transition-colors"
            >
              En Mercado Libre
              <ExternalLinkIcon className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;