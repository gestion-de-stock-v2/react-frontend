import { useNavigate } from 'react-router-dom';
import { useAuthStore } from './useAuthStore';

export function useLogout() {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  return () => {
    logout();
    navigate('/login', { replace: true });
  };
}