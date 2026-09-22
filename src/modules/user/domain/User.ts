import type { Role } from '@/modules/auth/domain/Role';

export interface ManagedUser {
  id: number;
  username: string;
  nome: string;
  email: string;
  role: Role;
  actif: boolean;
}