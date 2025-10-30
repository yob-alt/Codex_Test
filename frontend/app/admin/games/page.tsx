'use client';

import { FormEvent, useEffect, useState } from 'react';
import AdminGuard from '../../../components/admin-guard';
import api from '../../../lib/api';
import { useAuth } from '../../../lib/useAuth';
import toast from 'react-hot-toast';

interface GameForm {
  name: string;
  uidLabel: string;
  imageUrl: string;
  category: string;
}

interface GameItem extends GameForm {
  id: string;
}

export default function AdminGamesPage() {
  const { authorization } = useAuth();
  const [games, setGames] = useState<GameItem[]>([]);
  const [form, setForm] = useState<GameForm>({ name: '', uidLabel: '', imageUrl: '', category: '' });

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get<GameItem[]>('/api/games');
        setGames(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    load();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await api.post<GameItem>('/api/admin/games', form, {
        headers: authorization
      });
      toast.success('Game added');
      setGames((prev) => [...prev, res.data]);
      setForm({ name: '', uidLabel: '', imageUrl: '', category: '' });
    } catch (error) {
      toast.error('Failed to create game');
    }
  };

  return (
    <AdminGuard>
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid gap-6 md:grid-cols-[300px,1fr]">
          <form onSubmit={handleSubmit} className="card space-y-4">
            <div>
              <h1 className="text-xl font-semibold text-white">Add game</h1>
              <p className="text-xs text-slate-400">Create a new title for the catalog.</p>
            </div>
            {(['name', 'uidLabel', 'imageUrl', 'category'] as const).map((field) => (
              <label key={field} className="block text-xs uppercase tracking-wide text-slate-400">
                {field}
                <input
                  required
                  value={form[field]}
                  onChange={(event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))}
                  className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-primary-500 focus:outline-none"
                />
              </label>
            ))}
            <button className="btn-primary w-full" type="submit">
              Save game
            </button>
          </form>
          <div className="card">
            <h2 className="text-lg font-semibold text-white">Games</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {games.map((game) => (
                <li key={game.id} className="flex items-start justify-between rounded-lg border border-slate-800 bg-slate-900/60 p-3">
                  <div>
                    <p className="font-medium text-white">{game.name}</p>
                    <p className="text-xs text-slate-400">UID: {game.uidLabel}</p>
                    <p className="text-xs text-slate-400">Category: {game.category}</p>
                  </div>
                  <a
                    href={game.imageUrl}
                    className="text-xs text-primary-200 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View art
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
