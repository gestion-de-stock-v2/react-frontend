import { CategoryList } from '@/modules/category/ui/CategoryList';
import { PageHeader } from '@/shared/ui/PageHeader';

export function CategoriesPage() {
  return (
    <div>
      <PageHeader
        title="Catégories"
        subtitle="Gestion des catégories de produits"
      />
      <CategoryList />
    </div>
  );
}