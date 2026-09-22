import { StatsCards } from '@/modules/dashboard/ui/StatsCards';
import { LowStockAlert } from '@/modules/dashboard/ui/LowStockAlert';
import { RecentProducts } from '@/modules/dashboard/ui/RecentProducts';
import { StockEvolutionChart } from '@/modules/dashboard/ui/StockEvolutionChart';
import { CategoryBreakdownChart } from '@/modules/dashboard/ui/CategoryBreakdownChart';
import { TopProductsChart } from '@/modules/dashboard/ui/TopProductsChart';
import { useAuthStore } from '@/modules/auth/application/useAuthStore';
import { PageHeader } from '@/shared/ui/PageHeader';

export function DashboardPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Bonjour, ${user?.nome ?? 'utilisateur'} 👋`}
        subtitle="Vue d'ensemble de votre stock"
      />

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LowStockAlert />
        <RecentProducts />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StockEvolutionChart />
        <CategoryBreakdownChart />
      </div>

      <TopProductsChart />
    </div>
  );
}