import { ProductList } from '@/modules/product/ui/ProductList';
import { PageHeader } from '@/shared/ui/PageHeader';

export function ProductsPage() {
  return (
    <div>
      <PageHeader
        title="Produits"
        subtitle="Gestion du catalogue produits"
      />
      <ProductList />
    </div>
  );
}