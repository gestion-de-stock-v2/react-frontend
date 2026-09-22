
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { stockMovementRepository } from '../infrastructure/HttpStockMovementRepository';
import { movementKeys } from './useStockMovements';
import { productKeys } from '@/modules/product/application/useProducts';
import type { CreateStockMovementData } from '../domain/StockMovement';

export function useCreateMovement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateStockMovementData) => stockMovementRepository.create(data),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: movementKeys.byProduct(variables.produtoId) });
      // Le stock du produit change → on rafraîchit aussi la liste des produits
      qc.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}