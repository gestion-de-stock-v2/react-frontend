import type { Product, CreateProductData, UpdateProductData } from './Product';

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: number): Promise<Product>;
  create(data: CreateProductData): Promise<Product>;
  update(id: number, data: UpdateProductData): Promise<Product>;
  delete(id: number): Promise<void>;
}