import AdminProviders from './AdminProviders';

/**
 * Wraps every /admin route (login included) in the session provider. Kept out
 * of the root layout so public pages don't load next-auth or poll
 * /api/auth/session.
 */
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <AdminProviders>{children}</AdminProviders>;
}
