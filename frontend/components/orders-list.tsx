'use client';

import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Order } from '../lib/types';
import OrdersTable from './orders-table';
import { useAuth } from '../lib/useAuth';

export default function OrdersList() {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function load() {
      if (!token) return;
      const res = await api.get<Order[]>('/api/orders/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    }
    load();
  }, [token]);

  if (!token) {
    return <div className="card">Login to see your latest orders.</div>;
  }

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-white">Order history</h2>
      <p className="mb-4 text-xs text-slate-400">Track payment and delivery status at a glance.</p>
      <OrdersTable orders={orders} />
    </div>
  );
}
