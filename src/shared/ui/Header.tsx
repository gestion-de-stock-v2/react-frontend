import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/modules/auth/application/useAuthStore';
import { useLogout } from '@/modules/auth/application/useLogout';

export function Header() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white border-b">
      <div>
        <p className="text-sm text-gray-500">
          Connecté en tant que <strong>{user?.nome}</strong> ({user?.role})
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="text-sm text-red-600 hover:underline"
      >
        Déconnexion
      </button>
    </header>
  );
}