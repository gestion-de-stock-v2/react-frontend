import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useResetPassword } from '../application/useResetPassword';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Card } from '@/shared/ui/Card';

interface FormData {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export function ResetPasswordForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get('token') ?? '';

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      token: tokenFromUrl,
      newPassword: '',
      confirmPassword: '',
    },
  });

  const mutation = useResetPassword();
  const newPassword = watch('newPassword');

  const onSubmit = (data: FormData) => {
    mutation.mutate(
      { token: data.token, newPassword: data.newPassword },
      {
        onSuccess: () => {
          setTimeout(() => navigate('/login'), 2000);
        },
      }
    );
  };

  if (mutation.isSuccess) {
    return (
      <Card padding="lg" className="w-full max-w-sm text-center">
        <h1 className="text-xl font-bold text-green-600 mb-4">
          Mot de passe réinitialisé
        </h1>
        <p className="text-sm text-slate-600">
          Redirection vers la page de connexion...
        </p>
      </Card>
    );
  }

  return (
    <Card padding="lg" className="w-full max-w-sm">
      <h1 className="text-xl font-bold text-center text-slate-900 mb-6">
        Nouveau mot de passe
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Token"
          readOnly={!!tokenFromUrl}
          error={errors.token?.message}
          className="font-mono text-xs"
          {...register('token', { required: 'Token requis' })}
        />

        <Input
          label="Nouveau mot de passe"
          type="password"
          autoComplete="new-password"
          error={errors.newPassword?.message}
          {...register('newPassword', {
            required: 'Mot de passe requis',
            minLength: { value: 6, message: 'Minimum 6 caractères' },
          })}
        />

        <Input
          label="Confirmer le mot de passe"
          type="password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Confirmation requise',
            validate: (v) =>
              v === newPassword || 'Les mots de passe ne correspondent pas',
          })}
        />

        {mutation.isError && (
          <p className="text-sm text-red-600">
            {(mutation.error as { message?: string })?.message ??
              'Erreur lors de la réinitialisation'}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={mutation.isPending}
          className="w-full"
        >
          {mutation.isPending ? 'Réinitialisation...' : 'Réinitialiser'}
        </Button>

        <Link
          to="/login"
          className="block text-center text-sm text-blue-600 hover:underline"
        >
          Retour à la connexion
        </Link>
      </form>
    </Card>
  );
}