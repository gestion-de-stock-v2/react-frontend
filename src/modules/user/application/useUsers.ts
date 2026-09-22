
import { useQuery } from '@tanstack/react-query';
import { userRepository } from '../infrastructure/HttpUserRepository';

export const userKeys = {
  all: ['users'] as const,
};

export function useUsers() {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: () => userRepository.getAll(),
  });
}