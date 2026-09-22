import type { Role } from './Role';

export interface User {
  id: number;
  username: string;
  nome: string;
  email: string;
  role: Role;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface LoginResponse extends User {
  token: string;
}