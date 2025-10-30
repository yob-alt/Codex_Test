'use client';

import { useEffect, useState } from 'react';
import api from '../../../lib/api';
import { Order } from '../../../lib/types';
import { useAuth } from '../../../lib/useAuth';
import AdminGuard from '../../../components/admin-guard';
import toast from 'react-hot-toast';

const filters = ['Pending', 'Paid', 'Delivered'] as const;

export default function AdminOrdersPage() {
  const { authorization } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<(typeof filters)[number]>('Pending');

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get<Order[]>('/api/admin/orders', {
          headers: authorization
        });
        setOrders(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    load();
  }, [authorization]);

  const markDelivered = async (orderId: string) => {
    try {
      await api.patch(
        `/api/admin/orders/${orderId}`,
        { status: 'Delivered' },
        { headers: authorization }
      );
      toast.success('Order marked as delivered');
      setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: 'Delivered' } : order)));
    } catch (error) {
      toast.error('Failed to update order');
    }
  };

  const filteredOrders = orders.filter((order) => order.status === filter);

  return (
    <AdminGuard>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">Order queue</h1>
            <p className="text-sm text-slate-400">Monitor incoming payments and fulfil deliveries.</p>
          </div>
          <div className="flex gap-2">
            {filters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-full border px-3 py-1 text-sm transition ${
                  filter === item
                    ? 'border-primary-500 bg-primary-600/30 text-primary-100'
                    : 'border-slate-700 text-slate-300 hover:border-slate-500'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="card overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-800 text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Player UID</th>
                <th className="px-4 py-3">Package</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3 text-white">#{order.id.slice(0, 8)}</td>
                  <td className="px-4 py-3 text-slate-300">{order.uid}</td>
                  <td className="px-4 py-3 text-slate-300">{order.package.title}</td>
                  <td className="px-4 py-3 text-slate-300">{order.paymentMethod}</td>
                  <td className="px-4 py-3 text-primary-100">{order.status}</td>
                  <td className="px-4 py-3">
                    <button
                      className="btn-primary px-3 py-1 text-xs"
                      onClick={() => markDelivered(order.id)}
                      disabled={order.status === 'Delivered'}
                    >
                      Mark delivered
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminGuard>
  );
}
