'use client';

import { FormEvent, useState } from 'react';
import api from '../lib/api';
import toast from 'react-hot-toast';
import { useAuth } from '../lib/useAuth';
import { useRouter } from 'next/navigation';

interface Props {
  mode: 'login' | 'register';
}

export function AuthForm({ mode }: Props) {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const isRegister = mode === 'register';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const res = await api.post(endpoint, form);
      if (res.data?.token) {
        login(res.data.token);
        toast.success('Welcome back!');
        router.push('/dashboard');
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card mx-auto max-w-md space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-white">
          {isRegister ? 'Create an account' : 'Welcome back'}
        </h1>
        <p className="text-sm text-slate-400">
          {isRegister ? 'Join thousands of Thai gamers who trust GameBro.' : 'Login to manage orders and wallet balance.'}
        </p>
      </div>
      {isRegister && (
        <label className="block text-sm text-slate-300">
          Name
          <input
            type="text"
            required
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-4 py-2 text-white focus:border-primary-500 focus:outline-none"
          />
        </label>
      )}
      <label className="block text-sm text-slate-300">
        Email
        <input
          type="email"
          required
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-4 py-2 text-white focus:border-primary-500 focus:outline-none"
        />
      </label>
      <label className="block text-sm text-slate-300">
        Password
        <input
          type="password"
          required
          value={form.password}
          onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
          className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-4 py-2 text-white focus:border-primary-500 focus:outline-none"
        />
      </label>
      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {loading ? 'Please wait...' : isRegister ? 'Create account' : 'Login'}
      </button>
    </form>
  );
}
