import { AuthForm } from '../../../components/auth-form';

export default function AdminLoginPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <AuthForm mode="login" />
      <p className="mt-4 text-center text-xs text-slate-500">
        Use an admin account to access the control panel.
      </p>
    </div>
  );
}
