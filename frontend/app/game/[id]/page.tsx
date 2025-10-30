import api from '../../../lib/api';
import { Game, Package } from '../../../lib/types';
import Link from 'next/link';
import Image from 'next/image';

async function getGame(id: string) {
  const [gameRes, packagesRes] = await Promise.all([
    api.get<Game>(`/api/games/${id}`),
    api.get<Package[]>(`/api/games/${id}/packages`)
  ]);
  return {
    game: gameRes.data,
    packages: packagesRes.data
  };
}

export default async function GameDetailPage({ params }: { params: { id: string } }) {
  const { game, packages } = await getGame(params.id);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="grid gap-8 md:grid-cols-[280px,1fr]">
        <div className="card flex flex-col items-center text-center">
          <div className="relative mb-4 h-48 w-48 overflow-hidden rounded-xl">
            <Image src={game.imageUrl} alt={game.name} fill className="object-cover" />
          </div>
          <h1 className="text-2xl font-semibold text-white">{game.name}</h1>
          <p className="text-sm text-slate-400">{game.category}</p>
          <p className="mt-4 text-xs text-slate-500">Enter your {game.uidLabel} during checkout so we can deliver instantly.</p>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Choose a package</h2>
          {packages.map((pkg) => (
            <div key={pkg.id} className="card flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{pkg.title}</h3>
                <p className="text-sm text-slate-400">{pkg.coinAmount.toLocaleString()} coins</p>
              </div>
              <div className="flex flex-col items-end gap-3 text-right">
                <span className="text-xl font-semibold text-primary-200">฿{pkg.priceTHB.toFixed(2)}</span>
                <Link
                  href={`/checkout/new?gameId=${game.id}&packageId=${pkg.id}`}
                  className="btn-primary"
                >
                  Buy now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
