import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="text-center my-16 bg-rose-900/20 border border-rose-500/50 p-8 rounded-lg max-w-lg mx-auto">
      <h3 className="text-2xl font-bold text-rose-400 mb-2">¡Ups! Algo salió mal.</h3>
      <p className="text-rose-300 mb-6">{message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700 transition-colors"
      >
        Intentar de Nuevo
      </button>
    </div>
  );
};

export default ErrorMessage;
