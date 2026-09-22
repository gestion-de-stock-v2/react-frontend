import { useStockMovements } from '../application/useStockMovements';
import { exportMovementsToCsv } from '../application/exportMovementsCsv';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';
import { EmptyState } from '@/shared/ui/EmptyState';

interface Props {
  produtoId: number;
  produtoNome?: string;
}

export function MovementHistory({ produtoId, produtoNome = 'produit' }: Props) {
  const { data: movements, isLoading, error } = useStockMovements(produtoId);

  const handleExport = () => {
    if (!movements || movements.length === 0) return;
    exportMovementsToCsv(movements, produtoNome);
  };

  if (isLoading) return <p className="text-slate-500">Chargement de l'historique...</p>;
  if (error) return <p className="text-red-600">Erreur de chargement</p>;
  if (!movements?.length) {
    return (
      <EmptyState
        title="Aucun mouvement"
        description="Aucun mouvement enregistré pour ce produit."
      />
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <Button variant="secondary" size="sm" onClick={handleExport}>
          ⬇ Exporter CSV ({movements.length})
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
              <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Type</th>
              <th className="text-right p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Quantité</th>
              <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Observation</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((m) => (
              <tr key={m.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="p-3 text-sm text-slate-600">
                  {new Date(m.data).toLocaleString('fr-FR')}
                </td>
                <td className="p-3">
                  <Badge variant={m.tipo === 'ENTRADA' ? 'success' : 'danger'}>
                    {m.tipo === 'ENTRADA' ? 'Entrée' : 'Sortie'}
                  </Badge>
                </td>
                <td className="p-3 text-sm text-right text-slate-700">{m.quantidade}</td>
                <td className="p-3 text-sm text-slate-600">{m.observacao ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}