import type { LucideIcon } from 'lucide-react';

/**
 * Brand-tinted square behind an icon, as on the previous site's contact
 * section (owner preference). Flat: no gradient or glow.
 */
export default function IconTile({ icon: Icon, size = 'md' }: { icon: LucideIcon; size?: 'md' | 'sm' }) {
  const box = size === 'md' ? 'h-12 w-12' : 'h-10 w-10';
  return (
    <span
      className={`flex ${box} shrink-0 items-center justify-center rounded-xl border border-cb-brand/25 bg-cb-brand/10`}
    >
      <Icon size={size === 'md' ? 20 : 18} strokeWidth={1.75} aria-hidden="true" className="text-cb-brand" />
    </span>
  );
}
