
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supplierRepository } from '../infrastructure/HttpSupplierRepository';
import { supplierKeys } from './useSuppliers';
import type { CreateSupplierData, UpdateSupplierData } from '../domain/Supplier';

export function useCreateSupplier() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSupplierData) => supplierRepository.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: supplierKeys.all }),
  });
}

export function useUpdateSupplier() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateSupplierData }) =>
      supplierRepository.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: supplierKeys.all }),
  });
}

export function useDeleteSupplier() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => supplierRepository.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: supplierKeys.all }),
  });
}