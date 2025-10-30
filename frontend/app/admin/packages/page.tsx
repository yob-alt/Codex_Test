'use client';

import { FormEvent, useEffect, useState } from 'react';
import AdminGuard from '../../../components/admin-guard';
import api from '../../../lib/api';
import { useAuth } from '../../../lib/useAuth';
import toast from 'react-hot-toast';
import { Game } from '../../../lib/types';

interface PackageForm {
  gameId: string;
  title: string;
  priceTHB: string;
  coinAmount: string;
}

interface PackageItem {
  id: string;
  title: string;
  priceTHB: number;
  coinAmount: number;
  game: Game;
}

export default function AdminPackagesPage() {
  const { authorization } = useAuth();
  const [games, setGames] = useState<Game[]>([]);
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [form, setForm] = useState<PackageForm>({ gameId: '', title: '', priceTHB: '', coinAmount: '' });

  useEffect(() => {
    async function load() {
      try {
        const [gamesRes, packagesRes] = await Promise.all([
          api.get<Game[]>('/api/games'),
          api.get<PackageItem[]>('/api/admin/packages', { headers: authorization })
        ]);
        setGames(gamesRes.data);
        setPackages(packagesRes.data);
      } catch (error) {
        console.error(error);
      }
    }
    load();
  }, [authorization]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await api.post<PackageItem>(
        '/api/admin/packages',
        {
          gameId: form.gameId,
          title: form.title,
          priceTHB: parseFloat(form.priceTHB),
          coinAmount: parseInt(form.coinAmount, 10)
        },
        { headers: authorization }
      );
      toast.success('Package added');
      setPackages((prev) => [...prev, res.data]);
      setForm({ gameId: '', title: '', priceTHB: '', coinAmount: '' });
    } catch (error) {
      toast.error('Failed to save package');
    }
  };

  return (
    <AdminGuard>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 md:grid-cols-[320px,1fr]">
          <form onSubmit={handleSubmit} className="card space-y-4">
            <div>
              <h1 className="text-xl font-semibold text-white">Create package</h1>
              <p className="text-xs text-slate-400">Attach top-up bundles to existing games.</p>
            </div>
            <label className="block text-xs uppercase text-slate-400">
              Game
              <select
                required
                value={form.gameId}
                onChange={(event) => setForm((prev) => ({ ...prev, gameId: event.target.value }))}
                className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-primary-500 focus:outline-none"
              >
                <option value="">Select game</option>
                {games.map((game) => (
                  <option key={game.id} value={game.id}>
                    {game.name}
                  </option>
                ))}
              </select>
            </label>
            {['title', 'priceTHB', 'coinAmount'].map((field) => (
              <label key={field} className="block text-xs uppercase text-slate-400">
                {field}
                <input
                  required
                  value={(form as any)[field]}
                  onChange={(event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))}
                  className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-primary-500 focus:outline-none"
                />
              </label>
            ))}
            <button className="btn-primary w-full" type="submit">
              Save package
            </button>
          </form>
          <div className="card overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800 text-sm">
              <thead className="text-left text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-4 py-3">Game</th>
                  <th className="px-4 py-3">Package</th>
                  <th className="px-4 py-3">Coins</th>
                  <th className="px-4 py-3">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {packages.map((pkg) => (
                  <tr key={pkg.id}>
                    <td className="px-4 py-3 text-slate-300">{pkg.game.name}</td>
                    <td className="px-4 py-3 text-white">{pkg.title}</td>
                    <td className="px-4 py-3 text-slate-300">{pkg.coinAmount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-primary-100">฿{pkg.priceTHB.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
