'use client';

import { useAuth } from '../lib/useAuth';
import Link from 'next/link';

export default function WalletSummary() {
  const { user } = useAuth();

  return (
    <aside className="card space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-white">Wallet balance</h2>
        <p className="text-xs text-slate-400">Redeem GameBro credits at checkout for extra discounts.</p>
      </div>
      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-5 text-center">
        <p className="text-sm text-slate-400">Available</p>
        <p className="mt-2 text-3xl font-semibold text-primary-200">฿{(user?.walletBalance ?? 0).toFixed(2)}</p>
      </div>
      <Link href="/" className="btn-primary w-full text-center">
        Browse new packages
      </Link>
    </aside>
  );
}
