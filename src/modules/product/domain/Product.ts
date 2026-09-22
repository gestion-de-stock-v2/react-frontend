export interface Product {
  id: number;
  nome: string;
  descricao?: string;
  preco: number;
  quantidade: number;
  categoriaId?: number;
  categoriaNome?: string;
  fornecedorId?: number;
  fornecedorNome?: string;
}

export interface CreateProductData {
  nome: string;
  descricao?: string;
  preco: number;
  quantidade: number;
  categoriaId?: number;
  fornecedorId?: number;
}

export type UpdateProductData = CreateProductData;