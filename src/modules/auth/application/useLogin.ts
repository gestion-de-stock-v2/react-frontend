import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authRepository } from '../infrastructure/HttpAuthRepository';
import { useAuthStore } from './useAuthStore';
import type { Credentials } from '../domain/User';

export function useLogin() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (credentials: Credentials) =>
      authRepository.login(credentials),
    onSuccess: (data) => {
      setAuth(
        {
          id: data.id,
          username: data.username,
          nome: data.nome,
          email: data.email,
          role: data.role,
        },
        data.token
      );
      navigate('/dashboard', { replace: true });
    },
  });
}