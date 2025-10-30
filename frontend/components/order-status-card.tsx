'use client';

import { Order } from '../lib/types';
import { format } from 'date-fns';

export default function OrderStatusCard({ order }: { order: Order }) {
  const statusColor: Record<Order['status'], string> = {
    Pending: 'text-yellow-300',
    Paid: 'text-green-300',
    Delivered: 'text-primary-200',
    Cancelled: 'text-red-300'
  };

  return (
    <div className="card space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-white">Order #{order.id.slice(0, 8)}</h1>
        <p className="text-sm text-slate-400">Placed on {format(new Date(order.createdAt), 'PPpp')}</p>
      </div>
      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-sm text-slate-400">Status</p>
        <p className={`text-xl font-semibold ${statusColor[order.status]}`}>{order.status}</p>
      </div>
      <div className="grid gap-3 rounded-lg border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300">
        <div className="flex justify-between">
          <span>Game</span>
          <span className="font-medium text-white">{order.game.name}</span>
        </div>
        <div className="flex justify-between">
          <span>Package</span>
          <span className="font-medium text-white">{order.package.title}</span>
        </div>
        <div className="flex justify-between">
          <span>Player UID</span>
          <span>{order.uid}</span>
        </div>
        <div className="flex justify-between">
          <span>Coins</span>
          <span>{order.package.coinAmount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Total</span>
          <span className="font-semibold text-primary-200">฿{order.package.priceTHB.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
