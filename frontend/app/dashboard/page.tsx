import OrdersList from '../../components/orders-list';
import WalletSummary from '../../components/wallet-summary';
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="grid gap-6 md:grid-cols-[1fr,300px]">
        <Suspense fallback={<div className="card">Loading orders...</div>}>
          {/* @ts-expect-error Async Server Component */}
          <OrdersList />
        </Suspense>
        <WalletSummary />
      </div>
    </div>
  );
}
