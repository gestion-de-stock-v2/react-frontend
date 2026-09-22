export interface Supplier {
  id: number;
  nome: string;
  cnpj?: string;
  telefone?: string;
  email?: string;
}

export interface CreateSupplierData {
  nome: string;
  cnpj?: string;
  telefone?: string;
  email?: string;
}

export type UpdateSupplierData = CreateSupplierData;