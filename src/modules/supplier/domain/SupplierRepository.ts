import type { Supplier, CreateSupplierData, UpdateSupplierData } from './Supplier';

export interface SupplierRepository {
  getAll(): Promise<Supplier[]>;
  getById(id: number): Promise<Supplier>;
  create(data: CreateSupplierData): Promise<Supplier>;
  update(id: number, data: UpdateSupplierData): Promise<Supplier>;
  delete(id: number): Promise<void>;
}