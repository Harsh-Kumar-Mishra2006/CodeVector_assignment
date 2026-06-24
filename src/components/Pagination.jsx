import React from 'react';

const Pagination = ({ 
  hasMore, 
  onLoadMore, 
  onLoadFirst, 
  loading, 
  returnedCount,
  totalCount 
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
      <div className="text-sm text-gray-500">
        {returnedCount > 0 && (
          <span>
            Showing <span className="font-medium text-gray-700">{returnedCount}</span> products
            {totalCount && ` of ${totalCount}`}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onLoadFirst}
          disabled={loading}
          className="btn-secondary text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          First Page
        </button>

        <button
          onClick={onLoadMore}
          disabled={!hasMore || loading}
          className="btn-primary text-sm px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </>
          ) : (
            <>
              Load More
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </>
          )}
        </button>
      </div>

      {!hasMore && returnedCount > 0 && (
        <div className="text-sm text-gray-500">
          ✓ All products loaded
        </div>
      )}
    </div>
  );
};

export default Pagination;