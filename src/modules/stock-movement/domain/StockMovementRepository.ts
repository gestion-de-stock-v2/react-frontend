import type { StockMovement, CreateStockMovementData } from './StockMovement';

export interface StockMovementRepository {
  getByProduct(produtoId: number): Promise<StockMovement[]>;
  create(data: CreateStockMovementData): Promise<StockMovement>;
}