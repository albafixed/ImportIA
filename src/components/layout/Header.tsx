import React from 'react';
import { LogoIcon } from '../icons/LogoIcon';

function Header(): React.ReactNode {
  return (
    <header className="w-full max-w-4xl mx-auto pt-8">
      <div className="flex items-center justify-center space-x-3 text-center">
        <LogoIcon className="h-9 w-9 text-cyan-400" />
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
          Alibaba Edge <span className="text-cyan-400">AI</span>
        </h1>
      </div>
    </header>
  );
}

export default Header;
