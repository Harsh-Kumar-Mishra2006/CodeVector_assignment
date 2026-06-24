import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, loading }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
          Categories
        </h3>
        {loading && (
          <div className="animate-pulse">
            <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange('')}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
            ${!selectedCategory 
              ? 'bg-primary-600 text-white shadow-md shadow-primary-200' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          All Products
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${selectedCategory === category
                ? 'bg-primary-600 text-white shadow-md shadow-primary-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="text-sm text-gray-500">
          Showing products in <span className="font-medium text-gray-700">{selectedCategory}</span>
          <button
            onClick={() => onCategoryChange('')}
            className="ml-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            (Clear filter)
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;