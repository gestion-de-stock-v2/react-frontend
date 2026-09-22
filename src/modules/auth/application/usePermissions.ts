
import { useAuthStore } from './useAuthStore';
import type { Role } from '../domain/Role';

export type Permission =
  | 'dashboard'
  | 'products'
  | 'categories'
  | 'suppliers'
  | 'stock-movements'
  | 'users';

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  ADMIN: [
    'dashboard',
    'products',
    'categories',
    'suppliers',
    'stock-movements',
    'users',
  ],
  GERANT: [
    'dashboard',
    'products',
    'categories',
    'suppliers',
    'stock-movements',
  ],
  MAGASINIER: ['dashboard', 'products', 'stock-movements'],
  VENDEUR: ['dashboard', 'products', 'stock-movements'],
  ACHETEUR: ['dashboard', 'products', 'suppliers'],
  COMPTABLE: ['dashboard', 'products', 'categories', 'suppliers'],
  OBSERVATEUR: ['dashboard', 'products'],
};

export function usePermissions() {
  const user = useAuthStore((s) => s.user);

  const permissions: Permission[] = user ? ROLE_PERMISSIONS[user.role] ?? [] : [];

  const can = (permission: Permission): boolean =>
    permissions.includes(permission);

  const isAdmin = user?.role === 'ADMIN';

  const canWriteProducts = user?.role === 'ADMIN' || user?.role === 'GERANT';
  const canDeleteProducts = user?.role === 'ADMIN';

  const canWriteSuppliers =
    user?.role === 'ADMIN' ||
    user?.role === 'GERANT' ||
    user?.role === 'ACHETEUR';
  const canDeleteSuppliers = user?.role === 'ADMIN';

  const canWriteCategories = user?.role === 'ADMIN' || user?.role === 'GERANT';
  const canDeleteCategories = user?.role === 'ADMIN';

  const canWriteMovements =
    user?.role === 'ADMIN' ||
    user?.role === 'GERANT' ||
    user?.role === 'MAGASINIER' ||
    user?.role === 'VENDEUR' ||
    user?.role === 'ACHETEUR';

  return {
    permissions,
    can,
    isAdmin,
    canWriteProducts,
    canDeleteProducts,
    canWriteSuppliers,
    canDeleteSuppliers,
    canWriteCategories,
    canDeleteCategories,
    canWriteMovements,
  };
}