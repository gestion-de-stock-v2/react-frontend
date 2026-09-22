import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/modules/auth/application/useAuthStore';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Tableau de bord' },
  { to: '/products', label: 'Produits' },
  { to: '/categories', label: 'Catégories' },
  { to: '/suppliers', label: 'Fournisseurs' },
  { to: '/stock-movements', label: 'Mouvements' },
  { to: '/users', label: 'Utilisateurs', adminOnly: true },
];

export function AppNav() {
  const location = useLocation();
  const user = useAuthStore((s) => s.user);

  return (
    <nav className="space-y-1">
      {NAV_ITEMS.filter(
        (item) => !item.adminOnly || user?.role === 'ADMIN'
      ).map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`block px-3 py-2 rounded ${
            location.pathname === item.to
              ? 'bg-gray-700 text-white'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}