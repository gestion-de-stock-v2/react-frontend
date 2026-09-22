
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userRepository } from '../infrastructure/HttpUserRepository';
import { userKeys } from './useUsers';

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => userRepository.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: userKeys.all }),
  });
}

export function useToggleUserActif() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => userRepository.toggleActif(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: userKeys.all }),
  });
}