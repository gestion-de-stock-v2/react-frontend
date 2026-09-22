import type { ProductFilters } from '../application/useProductFilters';
import { useCategories } from '@/modules/category/application/useCategories';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Card } from '@/shared/ui/Card';

interface Props {
  filters: ProductFilters;
  onSearch: (v: string) => void;
  onCategoria: (v: number | null) => void;
  onLowStock: (v: boolean) => void;
  onReset: () => void;
}

export function ProductFiltersBar({
  filters,
  onSearch,
  onCategoria,
  onLowStock,
  onReset,
}: Props) {
  const { data: categories } = useCategories();

  return (
    <Card>
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <Input
            label="Recherche"
            type="text"
            value={filters.search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Nom du produit..."
          />
        </div>

        <div className="min-w-[180px]">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Catégorie
          </label>
          <select
            value={filters.categoriaId ?? ''}
            onChange={(e) =>
              onCategoria(e.target.value ? Number(e.target.value) : null)
            }
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Toutes</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-2 pb-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.lowStockOnly}
            onChange={(e) => onLowStock(e.target.checked)}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-slate-700">Stock bas uniquement</span>
        </label>

        <Button variant="secondary" size="md" onClick={onReset}>
          Réinitialiser
        </Button>
      </div>
    </Card>
  );
}