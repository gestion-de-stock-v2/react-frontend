import { useState } from 'react';
import { useSuppliers } from '../application/useSuppliers';
import {
  useCreateSupplier,
  useUpdateSupplier,
  useDeleteSupplier,
} from '../application/useSupplierMutations';
import { SupplierForm, type SupplierFormData } from './SupplierForm';
import { Button } from '@/shared/ui/Button';
import { EmptyState } from '@/shared/ui/EmptyState';
import type { Supplier } from '../domain/Supplier';

export function SupplierList() {
  const { data: suppliers, isLoading, error } = useSuppliers();
  const createMutation = useCreateSupplier();
  const updateMutation = useUpdateSupplier();
  const deleteMutation = useDeleteSupplier();

  const [editing, setEditing] = useState<Supplier | null>(null);
  const [creating, setCreating] = useState(false);

  const handleCreate = (data: SupplierFormData) => {
    createMutation.mutate(data, { onSuccess: () => setCreating(false) });
  };

  const handleUpdate = (data: SupplierFormData) => {
    if (!editing) return;
    updateMutation.mutate(
      { id: editing.id, data },
      { onSuccess: () => setEditing(null) }
    );
  };

  const handleDelete = (id: number) => {
    if (confirm('Supprimer ce fournisseur ?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <p className="text-slate-500">Chargement...</p>;
  if (error) return <p className="text-red-600">Erreur de chargement</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-900">
          Fournisseurs ({suppliers?.length ?? 0})
        </h2>
        <Button
          variant="primary"
          onClick={() => { setCreating(true); setEditing(null); }}
        >
          + Nouveau fournisseur
        </Button>
      </div>

      {creating && (
        <SupplierForm
          onSubmit={handleCreate}
          onCancel={() => setCreating(false)}
          isPending={createMutation.isPending}
        />
      )}

      {editing && (
        <SupplierForm
          initial={editing}
          onSubmit={handleUpdate}
          onCancel={() => setEditing(null)}
          isPending={updateMutation.isPending}
        />
      )}

      {!suppliers || suppliers.length === 0 ? (
        <EmptyState
          title="Aucun fournisseur"
          description="Ajoutez vos fournisseurs pour les associer à vos produits."
        />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">ID</th>
                <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Nom</th>
                <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">CNPJ</th>
                <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Téléphone</th>
                <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</th>
                <th className="text-right p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((s) => (
                <tr key={s.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="p-3 text-sm text-slate-500">{s.id}</td>
                  <td className="p-3 text-sm font-medium text-slate-900">{s.nome}</td>
                  <td className="p-3 text-sm text-slate-600">{s.cnpj ?? '—'}</td>
                  <td className="p-3 text-sm text-slate-600">{s.telefone ?? '—'}</td>
                  <td className="p-3 text-sm text-slate-600">{s.email ?? '—'}</td>
                  <td className="p-3 text-right space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { setEditing(s); setCreating(false); }}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(s.id)}
                    >
                      Supprimer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}