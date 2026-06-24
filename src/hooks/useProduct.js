import { useState, useEffect, useCallback } from 'react';
import { productApi } from '../api/api';

export const useProducts = (initialCategory = '') => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    nextCursor: null,
    hasMore: false,
    limit: 20,
    returnedCount: 0,
  });
  const [hasLoaded, setHasLoaded] = useState(false);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await productApi.getCategories();
      setCategories(response.data || []);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  }, []);

  // Fetch products with cursor pagination
  const fetchProducts = useCallback(async (category = selectedCategory, cursor = null) => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        limit: pagination.limit,
        category: category || undefined,
      };

      if (cursor) {
        params.cursorCreatedAt = cursor.created_at;
        params.cursorId = cursor.id;
      }

      const response = await productApi.getProducts(params);
      
      // Handle both array and object responses
      let productsData = response.data || [];
      if (!Array.isArray(productsData)) {
        productsData = [productsData];
      }

      const paginationData = response.pagination || {};
      
      setProducts(productsData);
      setPagination({
        nextCursor: paginationData.next_cursor || null,
        hasMore: paginationData.has_more || false,
        limit: paginationData.limit || 20,
        returnedCount: paginationData.returned_count || 0,
      });
      setHasLoaded(true);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, pagination.limit]);

  // Load next page
  const loadNextPage = useCallback(() => {
    if (pagination.hasMore && pagination.nextCursor) {
      fetchProducts(selectedCategory, pagination.nextCursor);
    }
  }, [pagination.hasMore, pagination.nextCursor, selectedCategory, fetchProducts]);

  // Load previous page (reset to first page)
  const loadFirstPage = useCallback(() => {
    fetchProducts(selectedCategory, null);
  }, [selectedCategory, fetchProducts]);

  // Change category
  const changeCategory = useCallback((category) => {
    setSelectedCategory(category);
    fetchProducts(category, null);
  }, [fetchProducts]);

  // Initial load
  useEffect(() => {
    fetchCategories();
    fetchProducts(initialCategory, null);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    products,
    categories,
    selectedCategory,
    loading,
    error,
    pagination,
    hasLoaded,
    fetchProducts,
    loadNextPage,
    loadFirstPage,
    changeCategory,
  };
};