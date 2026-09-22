
import { useQuery } from '@tanstack/react-query';
import { stockMovementRepository } from '../infrastructure/HttpStockMovementRepository';

export const movementKeys = {
  all: ['movements'] as const,
  byProduct: (produtoId: number) => [...movementKeys.all, 'product', produtoId] as const,
};

export function useStockMovements(produtoId: number) {
  return useQuery({
    queryKey: movementKeys.byProduct(produtoId),
    queryFn: () => stockMovementRepository.getByProduct(produtoId),
    enabled: !!produtoId,
  });
}