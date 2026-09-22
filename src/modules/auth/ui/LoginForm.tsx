import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useLogin } from '../application/useLogin';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';

interface LoginFormData {
  username: string;
  password: string;
}

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: { username: '', password: '' },
  });

  const loginMutation = useLogin();

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm">
      <Input
        label="Nom d'utilisateur"
        autoComplete="username"
        error={errors.username?.message}
        {...register('username', { required: 'Nom requis' })}
      />

      <Input
        label="Mot de passe"
        type="password"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register('password', { required: 'Mot de passe requis' })}
      />

      {loginMutation.isError && (
        <p className="text-sm text-red-600">
          {(loginMutation.error as { message?: string })?.message ??
            'Erreur de connexion'}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={loginMutation.isPending}
        className="w-full"
      >
        {loginMutation.isPending ? 'Connexion...' : 'Se connecter'}
      </Button>

      <Link
        to="/forgot-password"
        className="block text-center text-sm text-blue-600 hover:underline"
      >
        Mot de passe oublié ?
      </Link>
    </form>
  );
}