'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../lib/useAuth';
import { clsx } from 'clsx';

const links = [
  { href: '/', label: 'Games' },
  { href: '/dashboard', label: 'Dashboard' }
];

const adminLinks = [
  { href: '/admin/orders', label: 'Orders' },
  { href: '/admin/games', label: 'Games' },
  { href: '/admin/packages', label: 'Packages' },
  { href: '/admin/reports', label: 'Reports' }
];

export function Navbar() {
  const pathname = usePathname();
  const { user, logout, isAdmin } = useAuth();

  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-semibold text-white">
          GameBro
        </Link>
        <nav className="hidden items-center gap-4 text-sm font-medium text-slate-300 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx('transition hover:text-white', {
                'text-white': pathname === link.href
              })}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <div className="ml-6 flex items-center gap-4">
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx('transition hover:text-white', {
                    'text-white': pathname?.startsWith(link.href)
                  })}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </nav>
        <div className="flex items-center gap-3 text-sm">
          {user ? (
            <>
              <span className="hidden text-slate-300 md:inline">Hi, {user.name}</span>
              <button
                onClick={logout}
                className="rounded-md border border-slate-700 px-3 py-1 text-slate-200 transition hover:bg-slate-800"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-slate-300 transition hover:text-white">
                Login
              </Link>
              <Link href="/register" className="btn-primary px-3 py-1 text-sm">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
