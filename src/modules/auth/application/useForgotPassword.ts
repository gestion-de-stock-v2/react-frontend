
import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../infrastructure/HttpAuthRepository';
import type { ForgotPasswordData } from '../domain/PasswordReset';

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordData) =>
      authRepository.forgotPassword(data),
  });
}