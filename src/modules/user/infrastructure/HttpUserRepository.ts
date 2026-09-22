import { httpClient } from '@/shared/infrastructure/HttpClient';
import { ENDPOINTS } from '@/config/endpoints';
import type { UserRepository } from '../domain/UserRepository';
import type { ManagedUser } from '../domain/User';

export class HttpUserRepository implements UserRepository {
  async getAll(): Promise<ManagedUser[]> {
    const { data } = await httpClient.get<ManagedUser[]>(ENDPOINTS.users.list);
    return data;
  }

  async delete(id: number): Promise<void> {
    await httpClient.delete(ENDPOINTS.users.detail(id));
  }

  async toggleActif(id: number): Promise<ManagedUser> {
    const { data } = await httpClient.patch<ManagedUser>(
      `${ENDPOINTS.users.detail(id)}/actif`
    );
    return data;
  }
}

export const userRepository = new HttpUserRepository();