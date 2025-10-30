import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 text-center md:flex-row md:items-center md:text-left">
        <div className="md:w-1/2">
          <span className="rounded-full border border-primary-500/30 px-3 py-1 text-xs uppercase tracking-widest text-primary-200">
            New in Thailand
          </span>
          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
            Instant top-ups for the games you love
          </h1>
          <p className="mt-4 text-base text-slate-300">
            GameBro connects gamers with trusted resellers. Pick a package, pay with PromptPay or TrueMoney and get your coins delivered within minutes.
          </p>
          <div className="mt-8 flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center">
            <Link href="#catalog" className="btn-primary w-full sm:w-auto">
              Browse catalog
            </Link>
            <Link href="/dashboard" className="w-full rounded-md border border-slate-700 px-4 py-2 text-center transition hover:border-primary-500 hover:text-white sm:w-auto">
              View my orders
            </Link>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="relative mx-auto max-w-md rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-left shadow-2xl shadow-slate-950/60">
            <p className="text-sm text-slate-400">Latest delivery</p>
            <p className="mt-2 text-3xl font-semibold text-white">8,450 Diamonds</p>
            <p className="text-sm text-slate-400">Mobile Legends · PromptPay</p>
            <div className="mt-6 grid gap-4 text-xs text-slate-400">
              <p>🎮 Player UID: 997221024</p>
              <p>⚡ Delivery ETA: 2 minutes</p>
              <p>💎 Bonus: +5% coins for VIP</p>
            </div>
            <p className="mt-6 rounded-full bg-slate-800 px-4 py-2 text-center text-xs text-slate-300">
              Trusted by 12,400+ Thai gamers every month
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
