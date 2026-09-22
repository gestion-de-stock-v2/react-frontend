import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useProducts } from '@/modules/product/application/useProducts';
import { Card } from '@/shared/ui/Card';

export function TopProductsChart() {
  const { data: products } = useProducts();

  const data = useMemo(() => {
    if (!products) return [];
    return [...products]
      .map((p) => ({
        name: p.nome.length > 15 ? p.nome.slice(0, 15) + '…' : p.nome,
        value: Number((p.preco * p.quantidade).toFixed(2)),
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [products]);

  if (data.length === 0) {
    return (
      <Card>
        <h3 className="font-semibold text-slate-900 mb-4">
          Top 5 produits (valeur du stock)
        </h3>
        <p className="text-sm text-slate-500">Aucun produit.</p>
      </Card>
    );
  }

  return (
    <Card className="border-l-4 border-l-orange-500">
      <h3 className="font-semibold text-orange-600 mb-4">
  Top 5 produits (valeur du stock)
</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis type="number" fontSize={12} stroke="#64748b" />
          <YAxis
            type="category"
            dataKey="name"
            fontSize={12}
            width={120}
            stroke="#64748b"
          />
          <Tooltip
            formatter={(v) => `${Number(v).toFixed(2)} €`}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
          />
          <Bar dataKey="value" fill="#2563eb" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}