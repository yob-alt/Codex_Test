'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import api from '../../../lib/api';
import { Package, Game, Order } from '../../../lib/types';
import { useAuth } from '../../../lib/useAuth';
import toast from 'react-hot-toast';

export default function CheckoutNewPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { user, token } = useAuth();
  const [pkg, setPackage] = useState<Package | null>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);

  const packageId = params.get('packageId');
  const gameId = params.get('gameId');

  useEffect(() => {
    async function load() {
      if (!packageId || !gameId) return;
      try {
        const [gameRes, pkgRes] = await Promise.all([
          api.get<Game>(`/api/games/${gameId}`),
          api.get<Package[]>(`/api/games/${gameId}/packages`)
        ]);
        setGame(gameRes.data);
        setPackage(pkgRes.data.find((p) => p.id === packageId) ?? null);
      } catch (error) {
        console.error(error);
      }
    }
    load();
  }, [packageId, gameId]);

  const priceTHB = pkg?.priceTHB ?? 0;

  const disabled = useMemo(() => !uid || !pkg || !game, [uid, pkg, game]);

  const createOrder = async () => {
    if (!token) {
      toast.error('Login required before placing an order.');
      router.push('/login');
      return;
    }
    try {
      setLoading(true);
      const res = await api.post<{ order: Order }>(
        '/api/orders',
        {
          packageId,
          gameId,
          uid,
          paymentMethod: 'PROMPTPAY'
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success('Order created! Continue to payment.');
      router.push(`/checkout/${res.data.order.id}`);
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="card space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Checkout</h1>
          <p className="text-sm text-slate-400">
            Confirm your package and enter your in-game UID to deliver coins instantly.
          </p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
          <dl className="grid gap-2 text-sm text-slate-300">
            <div className="flex justify-between">
              <dt>Game</dt>
              <dd className="font-medium text-white">{game?.name ?? '—'}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Package</dt>
              <dd className="font-medium text-white">{pkg?.title ?? '—'}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Coins</dt>
              <dd>{pkg?.coinAmount.toLocaleString() ?? '—'}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Total</dt>
              <dd className="text-lg font-semibold text-primary-200">฿{priceTHB.toFixed(2)}</dd>
            </div>
          </dl>
        </div>
        <label className="block text-sm text-slate-300">
          Enter {game?.uidLabel ?? 'UID'}
          <input
            value={uid}
            onChange={(event) => setUid(event.target.value)}
            placeholder="123456789"
            className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-4 py-2 text-white focus:border-primary-500 focus:outline-none"
          />
        </label>
        <button className="btn-primary w-full" onClick={createOrder} disabled={disabled || loading}>
          {loading ? 'Creating...' : 'Continue to payment'}
        </button>
      </div>
    </div>
  );
}
