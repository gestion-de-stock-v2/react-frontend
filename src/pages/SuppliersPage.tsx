import { SupplierList } from '@/modules/supplier/ui/SupplierList';
import { PageHeader } from '@/shared/ui/PageHeader';

export function SuppliersPage() {
  return (
    <div>
      <PageHeader
        title="Fournisseurs"
        subtitle="Gestion des fournisseurs"
      />
      <SupplierList />
    </div>
  );
}