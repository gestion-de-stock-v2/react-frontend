import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useForgotPassword } from '../application/useForgotPassword';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Card } from '@/shared/ui/Card';

interface FormData {
  email: string;
}

export function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const mutation = useForgotPassword();

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  if (mutation.isSuccess) {
    return (
      <Card padding="lg" className="w-full max-w-sm text-center">
        <h1 className="text-xl font-bold mb-4 text-slate-900">
          Email envoyé
        </h1>
        <p className="text-sm text-slate-600 mb-4">
          {mutation.data?.message ??
            'Un email de réinitialisation a été envoyé si le compte existe.'}
        </p>

        {mutation.data?.devResetLink && (
          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg mb-4 text-left">
            <p className="text-xs text-yellow-800 mb-2 font-semibold">
              Mode dev — lien direct :
            </p>
            <Link
              to={mutation.data.devResetLink}
              className="text-blue-600 text-sm break-all hover:underline"
            >
              {mutation.data.devResetLink}
            </Link>
          </div>
        )}

        {!mutation.data?.devResetLink && mutation.data?.devToken && (
          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg mb-4 text-left">
            <p className="text-xs text-yellow-800 mb-2 font-semibold">
              Mode dev — token :
            </p>
            <Link
              to={`/reset-password?token=${mutation.data.devToken}`}
              className="text-blue-600 text-sm break-all hover:underline"
            >
              Réinitialiser maintenant
            </Link>
          </div>
        )}

        <Link
          to="/login"
          className="text-sm text-blue-600 hover:underline"
        >
          Retour à la connexion
        </Link>
      </Card>
    );
  }

  return (
    <Card padding="lg" className="w-full max-w-sm">
      <h1 className="text-xl font-bold text-center text-slate-900 mb-2">
        Mot de passe oublié
      </h1>
      <p className="text-sm text-slate-500 text-center mb-6">
        Saisis ton email pour recevoir un lien de réinitialisation.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="ton.email@exemple.com"
          error={errors.email?.message}
          {...register('email', {
            required: 'Email requis',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Email invalide',
            },
          })}
        />

        {mutation.isError && (
          <p className="text-sm text-red-600">
            {(mutation.error as { message?: string })?.message ??
              'Erreur lors de la demande'}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={mutation.isPending}
          className="w-full"
        >
          {mutation.isPending ? 'Envoi...' : 'Envoyer le lien'}
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