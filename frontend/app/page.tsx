import Link from 'next/link';
import Image from 'next/image';
import api from '../lib/api';
import { Game } from '../lib/types';
import Hero from '../components/hero';

async function getGames(): Promise<Game[]> {
  try {
    const res = await api.get<Game[]>('/api/games');
    return res.data;
  } catch (error) {
    console.error('Failed to load games', error);
    return [];
  }
}

export default async function HomePage() {
  const games = await getGames();

  return (
    <div>
      <Hero />
      <section className="mx-auto mt-12 max-w-6xl px-4">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Popular games</h2>
            <p className="text-sm text-slate-400">Top up instantly with trusted GameBro partners.</p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <Link key={game.id} href={`/game/${game.id}`} className="card group">
              <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
                <Image
                  src={game.imageUrl}
                  alt={game.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-semibold text-white">{game.name}</h3>
              <p className="text-sm text-slate-400">{game.category}</p>
              <p className="mt-2 text-xs text-slate-500">Tap to view available top-up packages.</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
