import { httpClient } from '@/shared/infrastructure/HttpClient';
import { ENDPOINTS } from '@/config/endpoints';
import type { CategoryRepository } from '../domain/CategoryRepository';
import type { Category, CreateCategoryData, UpdateCategoryData } from '../domain/Category';

export class HttpCategoryRepository implements CategoryRepository {
  async getAll(): Promise<Category[]> {
    const { data } = await httpClient.get<Category[]>(ENDPOINTS.categories.list);
    return data;
  }

  async getById(id: number): Promise<Category> {
    const { data } = await httpClient.get<Category>(ENDPOINTS.categories.detail(id));
    return data;
  }

  async create(payload: CreateCategoryData): Promise<Category> {
    const { data } = await httpClient.post<Category>(ENDPOINTS.categories.list, payload);
    return data;
  }

  async update(id: number, payload: UpdateCategoryData): Promise<Category> {
    const { data } = await httpClient.put<Category>(ENDPOINTS.categories.detail(id), payload);
    return data;
  }

  async delete(id: number): Promise<void> {
    await httpClient.delete(ENDPOINTS.categories.detail(id));
  }
}

export const categoryRepository = new HttpCategoryRepository();