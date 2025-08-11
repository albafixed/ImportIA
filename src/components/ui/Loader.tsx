import React, { useState, useEffect } from 'react';

const LOADING_PHRASES = [
  "Analizando mercado...",
  "Buscando productos ganadores...",
  "Consultando a la IA...",
  "Identificando tendencias ocultas...",
  "Filtrando las mejores oportunidades...",
  "Compilando recomendaciones...",
];

function Loader(): React.ReactNode {
  const [phrase, setPhrase] = useState(LOADING_PHRASES[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPhrase(prevPhrase => {
        const currentIndex = LOADING_PHRASES.indexOf(prevPhrase);
        const nextIndex = (currentIndex + 1) % LOADING_PHRASES.length;
        return LOADING_PHRASES[nextIndex];
      });
    }, 2500); // Change phrase every 2.5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);


  return (
    <div className="flex flex-col items-center justify-center space-y-4 my-20" aria-label="Cargando resultados">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full"></div>
        <div className="absolute inset-2 border-2 border-cyan-500/30 rounded-full animate-spin-slow"></div>
        <div className="absolute inset-4 border-2 border-cyan-500 rounded-full animate-ping"></div>
        <div className="absolute inset-0 flex items-center justify-center text-cyan-400 font-bold text-2xl">
          AI
        </div>
      </div>
      <p className="text-slate-400 text-lg tracking-wider text-center min-h-[28px]">
        {phrase}
      </p>
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default Loader;