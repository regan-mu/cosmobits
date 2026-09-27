'use client';

import { SessionProvider } from 'next-auth/react';

/** Session context for the admin pages only; the public site doesn't need it. */
export default function AdminProviders({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
