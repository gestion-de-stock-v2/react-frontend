import { useState } from 'react';
import { useProducts } from '../application/useProducts';
import {
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from '../application/useProductMutations';
import { ProductForm, type ProductFormData } from './ProductForm';
import { ProductFiltersBar } from './ProductFiltersBar';
import { useProductFilters } from '../application/useProductFilters';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';
import { EmptyState } from '@/shared/ui/EmptyState';
import type { Product } from '../domain/Product';

export function ProductList() {
  const { data: products, isLoading, error } = useProducts();
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const {
    filters,
    filtered,
    setSearch,
    setCategoriaId,
    setLowStockOnly,
    toggleSort,
    reset,
  } = useProductFilters(products);

  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);

  const handleCreate = (data: ProductFormData) => {
    createMutation.mutate(
      {
        nome: data.nome,
        descricao: data.descricao,
        preco: data.preco,
        quantidade: data.quantidade,
        categoriaId: data.categoriaId,
        fornecedorId: data.fornecedorId,
      },
      { onSuccess: () => setCreating(false) }
    );
  };

  const handleUpdate = (data: ProductFormData) => {
    if (!editing) return;
    updateMutation.mutate(
      {
        id: editing.id,
        data: {
          nome: data.nome,
          descricao: data.descricao,
          preco: data.preco,
          quantidade: data.quantidade,
          categoriaId: data.categoriaId,
          fornecedorId: data.fornecedorId,
        },
      },
      { onSuccess: () => setEditing(null) }
    );
  };

  const handleDelete = (id: number) => {
    if (confirm('Supprimer ce produit ?')) {
      deleteMutation.mutate(id);
    }
  };

  const sortIndicator = (field: 'nome' | 'preco' | 'quantidade') => {
    if (filters.sortField !== field) return '';
    return filters.sortOrder === 'asc' ? ' ↑' : ' ↓';
  };

  if (isLoading) return <p className="text-slate-500">Chargement...</p>;
  if (error) return <p className="text-red-600">Erreur de chargement</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-900">
          Produits ({filtered.length}
          {products && filtered.length !== products.length && ` / ${products.length}`})
        </h2>
        <Button
          variant="primary"
          onClick={() => { setCreating(true); setEditing(null); }}
        >
          + Nouveau produit
        </Button>
      </div>

      <ProductFiltersBar
        filters={filters}
        onSearch={setSearch}
        onCategoria={setCategoriaId}
        onLowStock={setLowStockOnly}
        onReset={reset}
      />

      {creating && (
        <ProductForm
          onSubmit={handleCreate}
          onCancel={() => setCreating(false)}
          isPending={createMutation.isPending}
        />
      )}

      {editing && (
        <ProductForm
          initial={editing}
          onSubmit={handleUpdate}
          onCancel={() => setEditing(null)}
          isPending={updateMutation.isPending}
        />
      )}

      {filtered.length === 0 ? (
        <EmptyState
          title="Aucun produit"
          description="Aucun produit ne correspond à vos filtres."
        />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">ID</th>
                <th
                  className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer select-none"
                  onClick={() => toggleSort('nome')}
                >
                  Nom{sortIndicator('nome')}
                </th>
                <th
                  className="text-right p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer select-none"
                  onClick={() => toggleSort('preco')}
                >
                  Prix{sortIndicator('preco')}
                </th>
                <th
                  className="text-right p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer select-none"
                  onClick={() => toggleSort('quantidade')}
                >
                  Quantité{sortIndicator('quantidade')}
                </th>
                <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Catégorie</th>
                <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Fournisseur</th>
                <th className="text-right p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="p-3 text-sm text-slate-500">{p.id}</td>
                  <td className="p-3 text-sm font-medium text-slate-900">{p.nome}</td>
                  <td className="p-3 text-sm text-right text-slate-700">{p.preco.toFixed(2)} €</td>
                  <td className="p-3 text-sm text-right">
                    {p.quantidade === 0 ? (
                      <Badge variant="danger">{p.quantidade}</Badge>
                    ) : p.quantidade < 5 ? (
                      <Badge variant="warning">{p.quantidade}</Badge>
                    ) : (
                      <span className="text-slate-700">{p.quantidade}</span>
                    )}
                  </td>
                  <td className="p-3 text-sm text-slate-600">{p.categoriaNome ?? '—'}</td>
                  <td className="p-3 text-sm text-slate-600">{p.fornecedorNome ?? '—'}</td>
                  <td className="p-3 text-right space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { setEditing(p); setCreating(false); }}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(p.id)}
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