/**
 * Decoration for the hero (spec 6.4, 6.5).
 *
 * Budget on the homepage: one <Halo>, one <Arc>, one <HeroMesh>, all in the hero
 * (the final CTA band that held the second halo and arc was removed by the owner).
 * The parent must be `position: relative; isolation: isolate; overflow: hidden`
 * (the `.cb-hero` class does this).
 */

type HaloProps = {
  /** Positioning and sizing classes, e.g. "cb-hero-halo" */
  className?: string;
  /** px diameter; leave unset when the class sets the size responsively */
  size?: number;
  /** 0–1, default 0.38 (matches the approved hero mockup) */
  strength?: number;
};

export function Halo({ className = '', size, strength = 0.38 }: HaloProps) {
  const inner = strength.toFixed(2);
  const mid = (strength * 0.6).toFixed(2);
  return (
    <div
      aria-hidden="true"
      className={`cb-halo ${className}`}
      style={{
        ...(size ? { width: size, height: size } : null),
        background: `radial-gradient(closest-side, rgb(168 121 177 / ${inner}), rgb(69 58 125 / ${mid}) 55%, transparent)`,
      }}
    />
  );
}

type ArcProps = {
  /** Positioning and sizing classes, e.g. "cb-hero-arc" */
  className?: string;
  size?: number;
};

export function Arc({ className = '', size }: ArcProps) {
  return (
    <div
      aria-hidden="true"
      className={`cb-arc ${className}`}
      style={size ? { width: size, height: size } : undefined}
    />
  );
}

export function HeroMesh({ hole = true }: { hole?: boolean }) {
  return <div aria-hidden="true" className={`hero-mesh${hole ? ' hero-mesh--hole' : ''}`} />;
}
