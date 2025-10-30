'use client';

import { useEffect, useState } from 'react';
import AdminGuard from '../../../components/admin-guard';
import api from '../../../lib/api';
import { useAuth } from '../../../lib/useAuth';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';

type RevenuePoint = {
  date: string;
  revenue: number;
  orders: number;
};

export default function AdminReportsPage() {
  const { authorization } = useAuth();
  const [data, setData] = useState<RevenuePoint[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get<RevenuePoint[]>('/api/admin/reports', { headers: authorization });
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    load();
  }, [authorization]);

  return (
    <AdminGuard>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-semibold text-white">Revenue & orders</h1>
        <p className="mb-6 text-sm text-slate-400">Monitor daily performance across payment gateways.</p>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card h-80">
            <h2 className="text-lg font-semibold text-white">Revenue (฿)</h2>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', color: '#e2e8f0' }} />
                <Line type="monotone" dataKey="revenue" stroke="#60a5fa" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="card h-80">
            <h2 className="text-lg font-semibold text-white">Orders</h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" allowDecimals={false} />
                <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', color: '#e2e8f0' }} />
                <Bar dataKey="orders" fill="#c4b5fd" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
