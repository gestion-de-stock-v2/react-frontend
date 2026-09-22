export type MovementType = 'ENTRADA' | 'SAIDA';

export interface StockMovement {
  id: number;
  tipo: MovementType;
  quantidade: number;
  observacao?: string;
  data: string;
  produtoId: number;
  produtoNome?: string;
}

export interface CreateStockMovementData {
  tipo: MovementType;
  quantidade: number;
  observacao?: string;
  produtoId: number;
}