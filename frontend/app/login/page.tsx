import { AuthForm } from '../../components/auth-form';

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <AuthForm mode="login" />
    </div>
  );
}
