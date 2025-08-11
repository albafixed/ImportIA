import React from 'react';

function Loader(): React.ReactNode {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 my-16">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-20 w-20 animate-spin rounded-full border-4 border-dashed border-sky-500"></div>
        <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-dashed border-cyan-400" style={{ animationDirection: 'reverse' }}></div>
        <div className="text-cyan-300 font-semibold">AI</div>
      </div>
      <p className="text-slate-400 text-lg">Buscando tendencias...</p>
    </div>
  );
}

export default Loader;
