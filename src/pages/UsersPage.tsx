import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/modules/auth/application/useAuthStore';
import { UserList } from '@/modules/user/ui/UserList';
import { PageHeader } from '@/shared/ui/PageHeader';

export function UsersPage() {
  const user = useAuthStore((s) => s.user);

  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div>
      <PageHeader
        title="Utilisateurs"
        subtitle="Gestion des comptes utilisateurs"
      />
      <UserList />
    </div>
  );
}