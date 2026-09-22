import { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useProducts } from '@/modules/product/application/useProducts';
import { Card } from '@/shared/ui/Card';

const COLORS = ['#2563eb', '#16a34a', '#ea580c', '#9333ea', '#dc2626', '#0891b2'];

export function CategoryBreakdownChart() {
  const { data: products } = useProducts();

  const data = useMemo(() => {
    if (!products) return [];
    const counts = new Map<string, number>();
    for (const p of products) {
      const key = p.categoriaNome ?? 'Sans catégorie';
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return Array.from(counts.entries()).map(([name, value]) => ({ name, value }));
  }, [products]);

  if (data.length === 0) {
    return (
      <Card>
        <h3 className="font-semibold text-slate-900 mb-4">
          Produits par catégorie
        </h3>
        <p className="text-sm text-slate-500">Aucun produit.</p>
      </Card>
    );
  }

  return (
    <Card className="border-l-4 border-l-orange-500">
      <h3 className="font-semibold text-orange-600 mb-4">
  Produits par catégorie
</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            label={(entry) => `${entry.name} (${entry.value})`}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}