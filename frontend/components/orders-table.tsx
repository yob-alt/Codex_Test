'use client';

import Link from 'next/link';
import { Order } from '../lib/types';
import { formatDistanceToNow } from 'date-fns';

export default function OrdersTable({ orders }: { orders: Order[] }) {
  if (!orders.length) {
    return <p className="text-sm text-slate-400">You have no orders yet. Purchase a package to get started.</p>;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-800">
      <table className="min-w-full divide-y divide-slate-800 text-sm">
        <thead className="bg-slate-900/60 text-left uppercase tracking-wide text-xs text-slate-400">
          <tr>
            <th className="px-4 py-3">Game</th>
            <th className="px-4 py-3">Package</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Updated</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-900/40">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-4 py-3 text-white">{order.game.name}</td>
              <td className="px-4 py-3 text-slate-300">{order.package.title}</td>
              <td className="px-4 py-3 text-primary-200">{order.status}</td>
              <td className="px-4 py-3 text-slate-400">{formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}</td>
              <td className="px-4 py-3">
                <Link href={`/checkout/${order.id}`} className="text-sm text-primary-200 hover:underline">
                  View order
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
