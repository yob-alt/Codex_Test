'use client';

import { useEffect, useMemo, useState } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';

type UserPayload = {
  id: string;
  name: string;
  email: string;
  role?: 'user' | 'admin';
  walletBalance?: number;
};

const TOKEN_KEY = 'gamebro_token';

export function useAuth() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserPayload | null>(null);

  useEffect(() => {
    const storedToken = typeof window !== 'undefined' ? window.localStorage.getItem(TOKEN_KEY) : null;
    if (storedToken) {
      setToken(storedToken);
      try {
        const payload = jwt.decode(storedToken) as UserPayload | null;
        if (payload) {
          setUser(payload);
        }
      } catch (error) {
        console.error('Failed to decode token', error);
      }
    }
  }, []);

  const login = (jwtToken: string) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(TOKEN_KEY, jwtToken);
      document.cookie = `${TOKEN_KEY}=${jwtToken}; path=/`;
    }
    setToken(jwtToken);
    const payload = jwt.decode(jwtToken) as UserPayload | null;
    setUser(payload ?? null);
    router.refresh();
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(TOKEN_KEY);
      document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    }
    setToken(null);
    setUser(null);
    router.push('/');
  };

  const authorization = useMemo(() => (token ? { Authorization: `Bearer ${token}` } : {}), [token]);

  return {
    token,
    user,
    login,
    logout,
    authorization,
    isAdmin: user?.role === 'admin'
  };
}
