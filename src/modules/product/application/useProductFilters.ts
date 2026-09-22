
import { useMemo, useState } from 'react';
import type { Product } from '../domain/Product';

export type SortField = 'nome' | 'preco' | 'quantidade';
export type SortOrder = 'asc' | 'desc';

export interface ProductFilters {
  search: string;
  categoriaId: number | null;
  lowStockOnly: boolean;
  sortField: SortField;
  sortOrder: SortOrder;
}

const DEFAULT_FILTERS: ProductFilters = {
  search: '',
  categoriaId: null,
  lowStockOnly: false,
  sortField: 'nome',
  sortOrder: 'asc',
};

export function useProductFilters(products: Product[] | undefined) {
  const [filters, setFilters] = useState<ProductFilters>(DEFAULT_FILTERS);

  const setSearch = (search: string) =>
    setFilters((f) => ({ ...f, search }));

  const setCategoriaId = (categoriaId: number | null) =>
    setFilters((f) => ({ ...f, categoriaId }));

  const setLowStockOnly = (lowStockOnly: boolean) =>
    setFilters((f) => ({ ...f, lowStockOnly }));

  const toggleSort = (field: SortField) => {
    setFilters((f) => {
      if (f.sortField === field) {
        return { ...f, sortOrder: f.sortOrder === 'asc' ? 'desc' : 'asc' };
      }
      return { ...f, sortField: field, sortOrder: 'asc' };
    });
  };

  const reset = () => setFilters(DEFAULT_FILTERS);

  const filtered = useMemo(() => {
    if (!products) return [];

    let result = [...products];

    // Recherche par nom
    if (filters.search.trim()) {
      const q = filters.search.trim().toLowerCase();
      result = result.filter((p) => p.nome.toLowerCase().includes(q));
    }

    // Filtre catégorie
    if (filters.categoriaId !== null) {
      result = result.filter((p) => p.categoriaId === filters.categoriaId);
    }

    // Filtre stock bas
    if (filters.lowStockOnly) {
      result = result.filter((p) => p.quantidade < 5);
    }

    // Tri
    result.sort((a, b) => {
      const dir = filters.sortOrder === 'asc' ? 1 : -1;
      if (filters.sortField === 'nome') {
        return a.nome.localeCompare(b.nome) * dir;
      }
      return (a[filters.sortField] - b[filters.sortField]) * dir;
    });

    return result;
  }, [products, filters]);

  return {
    filters,
    filtered,
    setSearch,
    setCategoriaId,
    setLowStockOnly,
    toggleSort,
    reset,
  };
}