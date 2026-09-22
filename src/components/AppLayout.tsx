import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/modules/auth/application/useAuthStore';
import { useLogout } from '@/modules/auth/application/useLogout';
import { Button } from '@/shared/ui/Button';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Tableau de bord' },
  { to: '/products', label: 'Produits' },
  { to: '/categories', label: 'Catégories' },
  { to: '/suppliers', label: 'Fournisseurs' },
  { to: '/stock-movements', label: 'Mouvements' },
  { to: '/users', label: 'Utilisateurs', adminOnly: true },
];

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const logout = useLogout();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-60 bg-slate-900 text-white flex flex-col">
        <div className="p-4 border-b border-slate-800">
          <h1 className="text-xl font-bold text-orange-500">Estoque</h1>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.filter(
            (item) => !item.adminOnly || user?.role === 'ADMIN'
          ).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                location.pathname === item.to
                  ? 'bg-slate-800 text-white font-medium'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-slate-800 p-4">
          <div className="mb-3">
            <p className="text-sm font-medium text-white truncate">
              {user?.nome}
            </p>
            <p className="text-xs text-slate-400">{user?.role}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-slate-400 hover:bg-slate-800 hover:text-white"
            onClick={handleLogout}
          >
            Déconnexion
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}