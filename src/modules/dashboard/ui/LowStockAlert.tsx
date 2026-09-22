import { Link } from 'react-router-dom';
import { useProducts } from '@/modules/product/application/useProducts';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';

export function LowStockAlert() {
  const { data: products } = useProducts();
  const lowStock = products?.filter((p) => p.quantidade < 5) ?? [];

  if (lowStock.length === 0) {
    return (
      <div className="bg-green-50 border-l-4 border-l-green-500 border border-green-200 p-4 rounded-xl">
        <p className="text-green-800 font-medium">
          ✅ Aucun produit en alerte de stock
        </p>
      </div>
    );
  }

  return (
    <Card className="border-l-4 border-l-orange-500">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-orange-600">
          ⚠️ {lowStock.length} produit(s) en stock bas
        </h3>
        <Link
          to="/products"
          className="text-sm text-orange-600 hover:underline font-medium"
        >
          Voir tous →
        </Link>
      </div>
      <ul className="space-y-2">
        {lowStock.slice(0, 5).map((p) => (
          <li
            key={p.id}
            className="flex justify-between items-center border-b border-slate-100 pb-2 last:border-0"
          >
            <span className="text-sm text-slate-700">{p.nome}</span>
            <Badge variant={p.quantidade === 0 ? 'danger' : 'warning'}>
              {p.quantidade} en stock
            </Badge>
          </li>
        ))}
      </ul>
    </Card>
  );
}