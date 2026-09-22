import { httpClient } from '@/shared/infrastructure/HttpClient';
import { ENDPOINTS } from '@/config/endpoints';
import type { StockMovementRepository } from '../domain/StockMovementRepository';
import type { StockMovement, CreateStockMovementData } from '../domain/StockMovement';

export class HttpStockMovementRepository implements StockMovementRepository {
  async getByProduct(produtoId: number): Promise<StockMovement[]> {
    const { data } = await httpClient.get<StockMovement[]>(
      ENDPOINTS.movements.list,
      { produtoId }
    );
    return data;
  }

  async create(payload: CreateStockMovementData): Promise<StockMovement> {
    const { data } = await httpClient.post<StockMovement>(
      ENDPOINTS.movements.create,
      payload
    );
    return data;
  }
}

export const stockMovementRepository = new HttpStockMovementRepository();