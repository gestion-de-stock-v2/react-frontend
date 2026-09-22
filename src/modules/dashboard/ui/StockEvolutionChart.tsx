import { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useProducts } from '@/modules/product/application/useProducts';
import { useStockMovements } from '@/modules/stock-movement/application/useStockMovements';
import { Card } from '@/shared/ui/Card';

export function StockEvolutionChart() {
  const { data: products } = useProducts();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const currentId = selectedId ?? products?.[0]?.id ?? 0;
  const { data: movements } = useStockMovements(currentId);

  const chartData = useMemo(() => {
    if (!movements || !products) return [];
    const product = products.find((p) => p.id === currentId);
    if (!product) return [];

    const sorted = [...movements].sort(
      (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()
    );

    let stock = product.quantidade;
    for (let i = sorted.length - 1; i >= 0; i--) {
      const m = sorted[i];
      stock += m.tipo === 'ENTRADA' ? -m.quantidade : m.quantidade;
    }

    const data: { date: string; stock: number }[] = [
      {
        date: new Date(
          sorted[0]?.data ?? new Date().toISOString()
        ).toLocaleDateString('fr-FR'),
        stock,
      },
    ];

    for (const m of sorted) {
      stock += m.tipo === 'ENTRADA' ? m.quantidade : -m.quantidade;
      data.push({
        date: new Date(m.data).toLocaleDateString('fr-FR'),
        stock,
      });
    }

    return data;
  }, [movements, products, currentId]);

  return (
    <Card className="border-l-4 border-l-orange-500">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-orange-600">Évolution du stock</h3>
        <select
          value={currentId}
          onChange={(e) => setSelectedId(Number(e.target.value))}
          className="px-3 py-1 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {products?.map((p) => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>
      </div>

      {chartData.length < 2 ? (
        <p className="text-sm text-slate-500 text-center py-8">
          Pas assez de mouvements pour tracer une courbe.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" fontSize={12} stroke="#64748b" />
            <YAxis fontSize={12} allowDecimals={false} stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
              }}
            />
            <Line
  type="monotone"
  dataKey="stock"
  stroke="#2563eb"
  strokeWidth={2}
  dot={{ r: 3 }}
/>
          </LineChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}