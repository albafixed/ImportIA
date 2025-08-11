import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="text-center my-16 bg-rose-900/30 border border-rose-500/50 p-6 md:p-8 rounded-lg max-w-lg mx-auto glow-border" style={{'--glow-color': 'rgba(244, 63, 94, 0.5)'} as React.CSSProperties}>
      <h3 className="text-xl font-bold text-rose-400 mb-2">Señal Interrumpida</h3>
      <p className="text-rose-300/90 mb-6 text-sm md:text-base">{message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700 transition-colors shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40"
      >
        Reintentar Conexión
      </button>
    </div>
  );
};

export default ErrorMessage;
