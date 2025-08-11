import React from 'react';
import { Product } from '../types';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';

interface ProductCardProps {
  product: Product;
  marketplace: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, marketplace }) => {
  const searchKeywords = product.alibabaSearchKeywords.join(' ');
  const alibabaSearchUrl = `https://www.alibaba.com/trade/search?SearchText=${encodeURIComponent(searchKeywords)}`;
  const mercadoLibreSearchUrl = `https://listado.mercadolibre.com.${marketplace}/${encodeURIComponent(product.productName)}`;

  return (
    <div
      className="bg-slate-800/60 rounded-xl p-5 border border-slate-700/60 transition-all duration-300 hover:border-sky-500/70 hover:shadow-xl hover:shadow-sky-500/10"
    >
      <h3 className="text-xl font-bold text-sky-400">{product.productName}</h3>
      <p className="text-slate-400 mt-2 mb-4">{product.description}</p>
      
      <div className="border-t border-slate-700/60 my-4"></div>

      <div className="space-y-3 text-sm">
        {product.pros.map((pro, index) => (
          <div key={`pro-${index}`} className="flex items-start">
            <CheckCircleIcon className="w-5 h-5 mr-2.5 flex-shrink-0 text-emerald-400" />
            <span className="text-slate-300">{pro}</span>
          </div>
        ))}
        {product.cons.map((con, index) => (
          <div key={`con-${index}`} className="flex items-start">
            <XCircleIcon className="w-5 h-5 mr-2.5 flex-shrink-0 text-rose-400" />
            <span className="text-slate-300">{con}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={alibabaSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-sky-600/90 text-white text-sm font-semibold rounded-md hover:bg-sky-600 transition-colors"
        >
          Ver en Alibaba
          <ExternalLinkIcon className="w-4 h-4 ml-2" />
        </a>
        <a
          href={mercadoLibreSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-yellow-400 text-slate-900 text-sm font-semibold rounded-md hover:bg-yellow-500 transition-colors"
        >
          Comprobar en ML
          <ExternalLinkIcon className="w-4 h-4 ml-2" />
        </a>
      </div>
    </div>
  );
};

export default ProductCard;