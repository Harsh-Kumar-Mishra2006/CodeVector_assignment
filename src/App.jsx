import React from 'react';
import { useProducts } from './hooks/useProduct';
import ProductList from './components/ProductList';
import CategoryFilter from './components/CategoryFilter';
import Pagination from './components/Pagination';

function App() {
  const {
    products,
    categories,
    selectedCategory,
    loading,
    error,
    pagination,
    hasLoaded,
    loadNextPage,
    loadFirstPage,
    changeCategory,
    fetchProducts,
  } = useProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Product Catalog
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Browse our collection of {categories.length} categories
              </p>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                {products.length} products loaded
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="mb-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={changeCategory}
            loading={!hasLoaded && loading}
          />
        </div>

        {/* Product Grid */}
        <ProductList
          products={products}
          loading={loading}
          error={error}
          hasLoaded={hasLoaded}
        />

        {/* Pagination */}
        {hasLoaded && products.length > 0 && (
          <div className="mt-8">
            <Pagination
              hasMore={pagination.hasMore}
              onLoadMore={loadNextPage}
              onLoadFirst={loadFirstPage}
              loading={loading}
              returnedCount={pagination.returnedCount}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <span>© 2024 Product Catalog. All rights reserved.</span>
            <span>Built with React + Tailwind CSS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;