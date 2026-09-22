export interface Category {
  id: number;
  nome: string;
}

export interface CreateCategoryData {
  nome: string;
}

export type UpdateCategoryData = CreateCategoryData;