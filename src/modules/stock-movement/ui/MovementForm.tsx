import { useForm } from 'react-hook-form';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Card } from '@/shared/ui/Card';
import type { MovementType, CreateStockMovementData } from '../domain/StockMovement';

export interface MovementFormData {
  tipo: MovementType;
  quantidade: number;
  observacao?: string;
}

interface Props {
  produtoId: number;
  onSubmit: (data: CreateStockMovementData) => void;
  isPending?: boolean;
}

export function MovementForm({ produtoId, onSubmit, isPending }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MovementFormData>({
    defaultValues: {
      tipo: 'ENTRADA',
      quantidade: 1,
      observacao: '',
    },
  });

  const handleFormSubmit = (data: MovementFormData) => {
    onSubmit({
      tipo: data.tipo,
      quantidade: data.quantidade,
      observacao: data.observacao,
      produtoId,
    });
    reset({ tipo: data.tipo, quantidade: 1, observacao: '' });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Type *
            </label>
            <select
              {...register('tipo', { required: 'Type requis' })}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="ENTRADA">Entrée</option>
              <option value="SAIDA">Sortie</option>
            </select>
          </div>

          <Input
            label="Quantité *"
            type="number"
            error={errors.quantidade?.message}
            {...register('quantidade', {
              required: 'Quantité requise',
              valueAsNumber: true,
              min: { value: 1, message: 'Minimum 1' },
            })}
          />

          <Input label="Observation" {...register('observacao')} />
        </div>

        <Button type="submit" variant="primary" disabled={isPending}>
          {isPending ? 'Enregistrement...' : 'Enregistrer le mouvement'}
        </Button>
      </form>
    </Card>
  );
}