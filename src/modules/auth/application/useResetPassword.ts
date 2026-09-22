
import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../infrastructure/HttpAuthRepository';
import type { ResetPasswordData } from '../domain/PasswordReset';

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordData) =>
      authRepository.resetPassword(data),
  });
}