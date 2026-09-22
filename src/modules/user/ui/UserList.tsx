import { useUsers } from '../application/useUsers';
import {
  useDeleteUser,
  useToggleUserActif,
} from '../application/useUserMutations';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';
import { EmptyState } from '@/shared/ui/EmptyState';

export function UserList() {
  const { data: users, isLoading, error } = useUsers();
  const deleteMutation = useDeleteUser();
  const toggleMutation = useToggleUserActif();

  const handleDelete = (id: number) => {
    if (confirm('Supprimer cet utilisateur ?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleToggle = (id: number) => {
    toggleMutation.mutate(id);
  };

  if (isLoading) return <p className="text-slate-500">Chargement...</p>;
  if (error) return <p className="text-red-600">Erreur de chargement</p>;

  if (!users || users.length === 0) {
    return (
      <EmptyState
        title="Aucun utilisateur"
        description="Aucun compte utilisateur enregistré."
      />
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">ID</th>
            <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Username</th>
            <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Nom</th>
            <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</th>
            <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Rôle</th>
            <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Statut</th>
            <th className="text-right p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t border-slate-100 hover:bg-slate-50">
              <td className="p-3 text-sm text-slate-500">{u.id}</td>
              <td className="p-3 text-sm font-medium text-slate-900">{u.username}</td>
              <td className="p-3 text-sm text-slate-700">{u.nome}</td>
              <td className="p-3 text-sm text-slate-600">{u.email}</td>
              <td className="p-3">
                <Badge variant="info">{u.role}</Badge>
              </td>
              <td className="p-3">
                <Badge variant={u.actif ? 'success' : 'danger'}>
                  {u.actif ? 'Actif' : 'Inactif'}
                </Badge>
              </td>
              <td className="p-3 text-right space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={toggleMutation.isPending}
                  onClick={() => handleToggle(u.id)}
                >
                  {u.actif ? 'Désactiver' : 'Activer'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => handleDelete(u.id)}
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}