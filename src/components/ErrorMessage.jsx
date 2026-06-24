import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
      <div className="flex flex-col items-center">
        <svg className="h-12 w-12 text-red-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-medium text-red-800">Something went wrong</h3>
        <p className="mt-2 text-sm text-red-600">{message || 'Failed to load products'}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 btn-primary bg-red-600 hover:bg-red-700"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;