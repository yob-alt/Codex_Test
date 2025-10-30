import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <div className="card space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-3xl text-green-300">
          ✓
        </div>
        <h1 className="text-3xl font-semibold text-white">Payment confirmed!</h1>
        <p className="text-sm text-slate-400">
          Your order is now marked as paid. Our GameBro agents will deliver the coins shortly.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/dashboard" className="btn-primary">
            View my orders
          </Link>
          <Link href="/" className="rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
