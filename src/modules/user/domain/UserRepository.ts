import type { ManagedUser } from './User';

export interface UserRepository {
  getAll(): Promise<ManagedUser[]>;
  delete(id: number): Promise<void>;
  toggleActif(id: number): Promise<ManagedUser>;
}