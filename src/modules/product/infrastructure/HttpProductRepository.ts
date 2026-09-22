import { httpClient } from '@/shared/infrastructure/HttpClient';
import { ENDPOINTS } from '@/config/endpoints';
import type { ProductRepository } from '../domain/ProductRepository';
import type { Product, CreateProductData, UpdateProductData } from '../domain/Product';

export class HttpProductRepository implements ProductRepository {
  async getAll(): Promise<Product[]> {
    const { data } = await httpClient.get<Product[]>(ENDPOINTS.products.list);
    return data;
  }

  async getById(id: number): Promise<Product> {
    const { data } = await httpClient.get<Product>(ENDPOINTS.products.detail(id));
    return data;
  }

  async create(payload: CreateProductData): Promise<Product> {
    const { data } = await httpClient.post<Product>(ENDPOINTS.products.list, payload);
    return data;
  }

  async update(id: number, payload: UpdateProductData): Promise<Product> {
    const { data } = await httpClient.put<Product>(ENDPOINTS.products.detail(id), payload);
    return data;
  }

  async delete(id: number): Promise<void> {
    await httpClient.delete(ENDPOINTS.products.detail(id));
  }
}

export const productRepository = new HttpProductRepository();