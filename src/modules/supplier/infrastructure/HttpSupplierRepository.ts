import { httpClient } from '@/shared/infrastructure/HttpClient';
import { ENDPOINTS } from '@/config/endpoints';
import type { SupplierRepository } from '../domain/SupplierRepository';
import type { Supplier, CreateSupplierData, UpdateSupplierData } from '../domain/Supplier';

export class HttpSupplierRepository implements SupplierRepository {
  async getAll(): Promise<Supplier[]> {
    const { data } = await httpClient.get<Supplier[]>(ENDPOINTS.suppliers.list);
    return data;
  }

  async getById(id: number): Promise<Supplier> {
    const { data } = await httpClient.get<Supplier>(ENDPOINTS.suppliers.detail(id));
    return data;
  }

  async create(payload: CreateSupplierData): Promise<Supplier> {
    const { data } = await httpClient.post<Supplier>(ENDPOINTS.suppliers.list, payload);
    return data;
  }

  async update(id: number, payload: UpdateSupplierData): Promise<Supplier> {
    const { data } = await httpClient.put<Supplier>(ENDPOINTS.suppliers.detail(id), payload);
    return data;
  }

  async delete(id: number): Promise<void> {
    await httpClient.delete(ENDPOINTS.suppliers.detail(id));
  }
}

export const supplierRepository = new HttpSupplierRepository();