
import { useQuery } from '@tanstack/react-query';
import { categoryRepository } from '../infrastructure/HttpCategoryRepository';

export const categoryKeys = {
  all: ['categories'] as const,
  detail: (id: number) => [...categoryKeys.all, id] as const,
};

export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: () => categoryRepository.getAll(),
  });
}

export function useCategory(id: number) {
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: () => categoryRepository.getById(id),
    enabled: !!id,
  });
}