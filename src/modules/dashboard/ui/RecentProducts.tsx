import { Link } from 'react-router-dom';
import { useProducts } from '@/modules/product/application/useProducts';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';

export function RecentProducts() {
  const { data: products } = useProducts();

  const recent = [...(products ?? [])]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  if (recent.length === 0) {
    return (
      <Card className="border-l-4 border-l-orange-500">
        <p className="text-slate-500 text-sm">Aucun produit.</p>
      </Card>
    );
  }

  return (
    <Card className="border-l-4 border-l-orange-500">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-orange-600">
          Derniers produits ajoutés
        </h3>
        <Link
          to="/products"
          className="text-sm text-orange-600 hover:underline font-medium"
        >
          Voir tous →
        </Link>
      </div>
      <ul className="space-y-2">
        {recent.map((p) => (
          <li
            key={p.id}
            className="flex justify-between items-center border-b border-slate-100 pb-2 last:border-0"
          >
            <div>
              <p className="text-sm font-medium text-slate-900">{p.nome}</p>
              <p className="text-xs text-slate-500">
                {p.categoriaNome ?? 'Sans catégorie'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">
                {p.preco.toFixed(2)} €
              </span>
              <Badge
                variant={
                  p.quantidade === 0
                    ? 'danger'
                    : p.quantidade < 5
                    ? 'warning'
                    : 'success'
                }
              >
                {p.quantidade}
              </Badge>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}