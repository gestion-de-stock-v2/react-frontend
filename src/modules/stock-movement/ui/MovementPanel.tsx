import { useState } from 'react';
import { useProducts } from '@/modules/product/application/useProducts';
import { MovementForm } from './MovementForm';
import { MovementHistory } from './MovementHistory';
import { useCreateMovement } from '../application/useCreateMovement';
import { Card } from '@/shared/ui/Card';

export function MovementPanel() {
  const { data: products, isLoading } = useProducts();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const createMutation = useCreateMovement();

  if (isLoading) return <p className="text-slate-500">Chargement des produits...</p>;

  const selected = products?.find((p) => p.id === selectedId);

  return (
    <div className="space-y-6">
      <Card>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Produit
        </label>
        <select
          value={selectedId ?? ''}
          onChange={(e) => setSelectedId(e.target.value ? Number(e.target.value) : null)}
          className="w-full max-w-md px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">— Sélectionner un produit —</option>
          {products?.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome} (stock: {p.quantidade})
            </option>
          ))}
        </select>
      </Card>

      {selected && (
        <>
          <Card>
            <h2 className="font-semibold text-slate-900 mb-2">{selected.nome}</h2>
            <p className="text-sm text-slate-600">
              Prix : {selected.preco.toFixed(2)} € · Stock actuel :{' '}
              <strong className="text-slate-900">{selected.quantidade}</strong>
            </p>
          </Card>

          <MovementForm
            produtoId={selected.id}
            onSubmit={(data) => createMutation.mutate(data)}
            isPending={createMutation.isPending}
          />

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
              Historique
            </h3>
            <MovementHistory produtoId={selected.id} produtoNome={selected.nome} />
          </div>
        </>
      )}
    </div>
  );
}