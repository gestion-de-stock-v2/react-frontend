import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Card } from '@/shared/ui/Card';
import type { Product } from '../domain/Product';
import { useCategories } from '@/modules/category/application/useCategories';
import { useSuppliers } from '@/modules/supplier/application/useSuppliers';

export interface ProductFormData {
  nome: string;
  descricao?: string;
  preco: number;
  quantidade: number;
  categoriaId?: number;
  fornecedorId?: number;
}

interface Props {
  initial?: Product;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  isPending?: boolean;
}

export function ProductForm({ initial, onSubmit, onCancel, isPending }: Props) {
  const { data: categories } = useCategories();
  const { data: suppliers } = useSuppliers();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      nome: initial?.nome ?? '',
      descricao: initial?.descricao ?? '',
      preco: initial?.preco ?? 0,
      quantidade: initial?.quantidade ?? 0,
      categoriaId: initial?.categoriaId,
      fornecedorId: initial?.fornecedorId,
    },
  });

  useEffect(() => {
    reset({
      nome: initial?.nome ?? '',
      descricao: initial?.descricao ?? '',
      preco: initial?.preco ?? 0,
      quantidade: initial?.quantidade ?? 0,
      categoriaId: initial?.categoriaId,
      fornecedorId: initial?.fornecedorId,
    });
  }, [initial, reset]);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Nom *"
          error={errors.nome?.message}
          {...register('nome', { required: 'Nom requis' })}
        />

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Description
          </label>
          <textarea
            {...register('descricao')}
            rows={2}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Prix *"
            type="number"
            step="0.01"
            error={errors.preco?.message}
            {...register('preco', {
              required: 'Prix requis',
              valueAsNumber: true,
              min: { value: 0, message: 'Prix doit être positif' },
            })}
          />

          <Input
            label="Quantité *"
            type="number"
            error={errors.quantidade?.message}
            {...register('quantidade', {
              required: 'Quantité requise',
              valueAsNumber: true,
              min: { value: 0, message: 'Quantité doit être positive' },
            })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Catégorie
            </label>
            <select
              {...register('categoriaId', {
                setValueAs: (v) => (v === '' ? undefined : Number(v)),
              })}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">— Aucune —</option>
              {categories?.map((c) => (
                <option key={c.id} value={c.id}>{c.nome}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Fournisseur
            </label>
            <select
              {...register('fornecedorId', {
                setValueAs: (v) => (v === '' ? undefined : Number(v)),
              })}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">— Aucun —</option>
              {suppliers?.map((s) => (
                <option key={s.id} value={s.id}>{s.nome}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button type="submit" variant="primary" disabled={isPending}>
            {isPending ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel}>
            Annuler
          </Button>
        </div>
      </form>
    </Card>
  );
}