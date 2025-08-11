
import React from 'react';
import { TrendUpIcon } from './icons/TrendUpIcon';

function Header(): React.ReactNode {
  return (
    <header className="bg-slate-900/70 backdrop-blur-md sticky top-0 z-50 border-b border-slate-700/50">
      <nav className="container mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center space-x-3">
          <TrendUpIcon className="h-8 w-8 text-blue-400" />
          <span className="text-2xl font-bold text-white">TrendSpotter AI</span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
