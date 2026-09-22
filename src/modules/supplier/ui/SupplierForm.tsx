import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Card } from '@/shared/ui/Card';
import type { Supplier } from '../domain/Supplier';

export interface SupplierFormData {
  nome: string;
  cnpj?: string;
  telefone?: string;
  email?: string;
}

interface Props {
  initial?: Supplier;
  onSubmit: (data: SupplierFormData) => void;
  onCancel: () => void;
  isPending?: boolean;
}

export function SupplierForm({ initial, onSubmit, onCancel, isPending }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupplierFormData>({
    defaultValues: {
      nome: initial?.nome ?? '',
      cnpj: initial?.cnpj ?? '',
      telefone: initial?.telefone ?? '',
      email: initial?.email ?? '',
    },
  });

  useEffect(() => {
    reset({
      nome: initial?.nome ?? '',
      cnpj: initial?.cnpj ?? '',
      telefone: initial?.telefone ?? '',
      email: initial?.email ?? '',
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

        <Input label="CNPJ" {...register('cnpj')} />

        <Input label="Téléphone" {...register('telefone')} />

        <Input
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register('email', {
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Email invalide',
            },
          })}
        />

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