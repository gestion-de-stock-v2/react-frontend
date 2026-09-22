import { useState } from 'react';
import { useCategories } from '../application/useCategories';
import {
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from '../application/useCategoryMutations';
import { CategoryForm, type CategoryFormData } from './CategoryForm';
import { Button } from '@/shared/ui/Button';
import { EmptyState } from '@/shared/ui/EmptyState';
import type { Category } from '../domain/Category';

export function CategoryList() {
  const { data: categories, isLoading, error } = useCategories();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const [editing, setEditing] = useState<Category | null>(null);
  const [creating, setCreating] = useState(false);

  const handleCreate = (data: CategoryFormData) => {
    createMutation.mutate(data, { onSuccess: () => setCreating(false) });
  };

  const handleUpdate = (data: CategoryFormData) => {
    if (!editing) return;
    updateMutation.mutate(
      { id: editing.id, data },
      { onSuccess: () => setEditing(null) }
    );
  };

  const handleDelete = (id: number) => {
    if (confirm('Supprimer cette catégorie ?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <p className="text-slate-500">Chargement...</p>;
  if (error) return <p className="text-red-600">Erreur de chargement</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-900">
          Catégories ({categories?.length ?? 0})
        </h2>
        <Button
          variant="primary"
          onClick={() => { setCreating(true); setEditing(null); }}
        >
          + Nouvelle catégorie
        </Button>
      </div>

      {creating && (
        <CategoryForm
          onSubmit={handleCreate}
          onCancel={() => setCreating(false)}
          isPending={createMutation.isPending}
        />
      )}

      {editing && (
        <CategoryForm
          initial={editing}
          onSubmit={handleUpdate}
          onCancel={() => setEditing(null)}
          isPending={updateMutation.isPending}
        />
      )}

      {!categories || categories.length === 0 ? (
        <EmptyState
          title="Aucune catégorie"
          description="Créez votre première catégorie pour organiser vos produits."
        />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">ID</th>
                <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Nom</th>
                <th className="text-right p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="p-3 text-sm text-slate-500">{c.id}</td>
                  <td className="p-3 text-sm font-medium text-slate-900">{c.nome}</td>
                  <td className="p-3 text-right space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { setEditing(c); setCreating(false); }}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(c.id)}
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