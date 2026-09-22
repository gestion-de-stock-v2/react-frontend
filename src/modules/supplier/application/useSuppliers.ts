
import { useQuery } from '@tanstack/react-query';
import { supplierRepository } from '../infrastructure/HttpSupplierRepository';

export const supplierKeys = {
  all: ['suppliers'] as const,
  detail: (id: number) => [...supplierKeys.all, id] as const,
};

export function useSuppliers() {
  return useQuery({
    queryKey: supplierKeys.all,
    queryFn: () => supplierRepository.getAll(),
  });
}

export function useSupplier(id: number) {
  return useQuery({
    queryKey: supplierKeys.detail(id),
    queryFn: () => supplierRepository.getById(id),
    enabled: !!id,
  });
}