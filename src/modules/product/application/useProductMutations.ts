
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productRepository } from '../infrastructure/HttpProductRepository';
import { productKeys } from './useProducts';
import type { CreateProductData, UpdateProductData } from '../domain/Product';

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProductData) => productRepository.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: productKeys.all }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateProductData }) =>
      productRepository.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: productKeys.all }),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => productRepository.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: productKeys.all }),
  });
}