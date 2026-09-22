import { MovementPanel } from '@/modules/stock-movement/ui/MovementPanel';
import { PageHeader } from '@/shared/ui/PageHeader';

export function StockMovementsPage() {
  return (
    <div>
      <PageHeader
        title="Mouvements de stock"
        subtitle="Entrées et sorties de produits"
      />
      <MovementPanel />
    </div>
  );
}