import { useProducts } from '@/modules/product/application/useProducts';
import { useCategories } from '@/modules/category/application/useCategories';
import { useSuppliers } from '@/modules/supplier/application/useSuppliers';
import { Card } from '@/shared/ui/Card';

interface StatCardProps {
  label: string;
  value: string | number;
  accent?: 'orange' | 'blue' | 'green' | 'red' | 'slate';
}

const ACCENTS = {
  orange: {
    border: 'border-l-4 border-l-orange-500',
    label: 'text-orange-600',
    value: 'text-orange-600',
  },
  blue: {
    border: 'border-l-4 border-l-blue-500',
    label: 'text-blue-600',
    value: 'text-blue-600',
  },
  green: {
    border: 'border-l-4 border-l-green-500',
    label: 'text-green-600',
    value: 'text-green-600',
  },
  red: {
    border: 'border-l-4 border-l-red-500',
    label: 'text-red-600',
    value: 'text-red-600',
  },
  slate: {
    border: 'border-l-4 border-l-slate-400',
    label: 'text-slate-500',
    value: 'text-slate-900',
  },
};

function StatCard({ label, value, accent = 'orange' }: StatCardProps) {
  const styles = ACCENTS[accent];
  return (
    <Card className={`${styles.border} hover:shadow-md transition-shadow`}>
      <p className={`text-xs font-semibold uppercase tracking-wider ${styles.label}`}>
        {label}
      </p>
      <p className={`text-2xl font-bold mt-1 ${styles.value}`}>{value}</p>
    </Card>
  );
}

export function StatsCards() {
  const { data: products } = useProducts();
  const { data: categories } = useCategories();
  const { data: suppliers } = useSuppliers();

  const totalStockValue =
    products?.reduce((sum, p) => sum + p.preco * p.quantidade, 0) ?? 0;

  const lowStockCount = products?.filter((p) => p.quantidade < 5).length ?? 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <StatCard label="Produits" value={products?.length ?? 0} accent="orange" />
      <StatCard label="Catégories" value={categories?.length ?? 0} accent="blue" />
      <StatCard label="Fournisseurs" value={suppliers?.length ?? 0} accent="slate" />
      <StatCard
        label="Valeur du stock"
        value={`${totalStockValue.toFixed(2)} €`}
        accent="green"
      />
      <StatCard
        label="Alertes stock bas"
        value={lowStockCount}
        accent="red"
      />
    </div>
  );
}