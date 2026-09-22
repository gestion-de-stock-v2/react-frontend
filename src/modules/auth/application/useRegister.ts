
import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../infrastructure/HttpAuthRepository';
import type { RegisterData } from '../domain/AuthRepository';

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterData) => authRepository.register(data),
  });
}