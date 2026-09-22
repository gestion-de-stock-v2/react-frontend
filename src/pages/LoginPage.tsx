import { LoginForm } from '@/modules/auth/ui/LoginForm';
import { Card } from '@/shared/ui/Card';

export function LoginPage() {
  return (
    <Card padding="lg" className="w-full max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-slate-900">
        Estoque
      </h1>
      <LoginForm />
    </Card>
  );
}