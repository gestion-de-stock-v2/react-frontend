
import { useQuery } from '@tanstack/react-query';
import { productRepository } from '../infrastructure/HttpProductRepository';

export const productKeys = {
  all: ['products'] as const,
  detail: (id: number) => [...productKeys.all, id] as const,
};

export function useProducts() {
  return useQuery({
    queryKey: productKeys.all,
    queryFn: () => productRepository.getAll(),
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productRepository.getById(id),
    enabled: !!id,
  });
}