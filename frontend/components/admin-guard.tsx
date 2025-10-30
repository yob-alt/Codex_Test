'use client';

import { useAuth } from '../lib/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.replace('/admin/login');
    }
  }, [isAdmin, router]);

  if (!isAdmin) return null;

  return <>{children}</>;
}
