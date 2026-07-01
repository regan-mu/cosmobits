import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Property 3: Infinite animations are limited to entrance effects and marquee
 *
 * For any `motion.div` with `transition.repeat === Infinity`, the animated property
 * must be translateX only (marquee) — no perpetual rotation, scale, y/x oscillation,
 * or boxShadow.
 *
 * Validates: Requirements 1.4, 3.8, 11.1
 */
describe('Property 3: Infinite animations are limited to entrance effects and marquee', () => {
  const componentsDir = path.resolve(__dirname, '..', 'components');

  function getComponentFiles(dir: string): string[] {
    const files: string[] = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        // Skip ui and editor directories (not landing page components)
        if (entry.name === 'ui' || entry.name === 'editor') continue;
        files.push(...getComponentFiles(fullPath));
      } else if (entry.name.endsWith('.tsx')) {
        files.push(fullPath);
      }
    }
    return files;
  }

  /**
   * Check for framer-motion infinite animations by detecting `repeat: Infinity`
   * in transition props. Any match that animates rotation, scale, y, x (non-translateX),
   * opacity cycling, or boxShadow is a violation.
   */
  it('no framer-motion elements should have repeat: Infinity for non-marquee properties', () => {
    const componentFiles = getComponentFiles(componentsDir);
    const violations: { file: string; line: number; context: string }[] = [];

    for (const filePath of componentFiles) {
      const source = fs.readFileSync(filePath, 'utf-8');
      const lines = source.split('\n');

      // Search for `repeat: Infinity` in the source
      for (let i = 0; i < lines.length; i++) {
        if (/repeat\s*:\s*Infinity/.test(lines[i])) {
          // Get surrounding context (20 lines before and after) to check what's being animated
          const contextStart = Math.max(0, i - 20);
          const contextEnd = Math.min(lines.length - 1, i + 20);
          const context = lines.slice(contextStart, contextEnd + 1).join('\n');

          // Check if this is a translateX-only marquee animation (allowed)
          const isMarqueeTranslateX = /translateX|x\s*:\s*\[.*[%-]/.test(context)
            && !/rotate|scale|boxShadow|opacity\s*:\s*\[/.test(context);

          if (!isMarqueeTranslateX) {
            // Check what forbidden properties are being animated
            const hasRotation = /rotate\s*:/.test(context);
            const hasScale = /scale\s*:\s*\[/.test(context);
            const hasYOscillation = /y\s*:\s*\[/.test(context);
            const hasXOscillation = /x\s*:\s*\[/.test(context) && !/translateX/.test(context);
            const hasBoxShadow = /boxShadow\s*:/.test(context);
            const hasOpacityCycle = /opacity\s*:\s*\[/.test(context);

            if (hasRotation || hasScale || hasYOscillation || hasXOscillation || hasBoxShadow || hasOpacityCycle) {
              const fileName = path.relative(componentsDir, filePath);
              violations.push({
                file: fileName,
                line: i + 1,
                context: lines[i].trim(),
              });
            }
          }
        }
      }
    }

    expect(
      violations,
      `Found ${violations.length} framer-motion infinite animation(s) with forbidden properties:\n` +
      violations.map(v => `  - ${v.file}:${v.line} → ${v.context}`).join('\n')
    ).toHaveLength(0);
  });

  /**
   * Check for CSS class-based infinite animations. The only allowed infinite CSS
   * animations on landing page components are:
   * - `animate-marquee` (translateX for partner logos)
   * - `animate-spin` on Loader2 elements (loading indicators, not decorative)
   *
   * Forbidden patterns: animate-pulse on decorative elements, animate-bounce,
   * or any other infinite CSS animation for rotation, scale, or glow.
   */
  it('CSS infinite animations should only be animate-marquee (translateX) or animate-spin on loading indicators', () => {
    const componentFiles = getComponentFiles(componentsDir);
    const violations: { file: string; line: number; className: string }[] = [];

    // Allowed CSS animation classes
    const ALLOWED_INFINITE_CLASSES = ['animate-marquee', 'animate-spin'];
    // Pattern to match animate-* classes that could be infinite
    const animateClassPattern = /animate-(?!in\b|out\b|none\b)(\w+)/g;

    for (const filePath of componentFiles) {
      const source = fs.readFileSync(filePath, 'utf-8');
      const lines = source.split('\n');

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let match: RegExpExecArray | null;
        animateClassPattern.lastIndex = 0;

        while ((match = animateClassPattern.exec(line)) !== null) {
          const fullClass = `animate-${match[1]}`;

          if (ALLOWED_INFINITE_CLASSES.includes(fullClass)) {
            // animate-marquee is always allowed (translateX only)
            // animate-spin is allowed only on Loader2 loading indicators
            if (fullClass === 'animate-spin') {
              // Verify it's on a Loader2 or loading context
              const contextStart = Math.max(0, i - 3);
              const contextEnd = Math.min(lines.length - 1, i + 3);
              const context = lines.slice(contextStart, contextEnd + 1).join('\n');
              const isLoadingIndicator = /Loader2|loading|isSubmitting|spinner/i.test(context);
              if (!isLoadingIndicator) {
                const fileName = path.relative(componentsDir, filePath);
                violations.push({ file: fileName, line: i + 1, className: fullClass });
              }
            }
            continue;
          }

          // Any other animate-* class that implies infinite animation is a violation
          // Common infinite CSS animations: animate-pulse, animate-bounce, animate-gradient-x
          const KNOWN_INFINITE_CSS = ['animate-pulse', 'animate-bounce', 'animate-gradient-x', 'animate-ai-pulse'];
          if (KNOWN_INFINITE_CSS.includes(fullClass)) {
            // Check if it's on a decorative element (not a loading skeleton)
            const contextStart = Math.max(0, i - 3);
            const contextEnd = Math.min(lines.length - 1, i + 3);
            const context = lines.slice(contextStart, contextEnd + 1).join('\n');
            const isLoadingSkeleton = /skeleton|loading|placeholder/i.test(context);
            if (!isLoadingSkeleton) {
              const fileName = path.relative(componentsDir, filePath);
              violations.push({ file: fileName, line: i + 1, className: fullClass });
            }
          }
        }
      }
    }

    expect(
      violations,
      `Found ${violations.length} CSS infinite animation(s) that are not translateX marquee:\n` +
      violations.map(v => `  - ${v.file}:${v.line} → class "${v.className}"`).join('\n')
    ).toHaveLength(0);
  });

  /**
   * Verify that the only translateX infinite animation is the Partners marquee.
   * This confirms the marquee is preserved while no other translateX infinite
   * animations have been introduced elsewhere.
   */
  it('animate-marquee usage should only exist in Partners.tsx', () => {
    const componentFiles = getComponentFiles(componentsDir);
    const marqueeUsages: { file: string; line: number }[] = [];

    for (const filePath of componentFiles) {
      const source = fs.readFileSync(filePath, 'utf-8');
      const lines = source.split('\n');

      for (let i = 0; i < lines.length; i++) {
        if (/animate-marquee/.test(lines[i])) {
          const fileName = path.relative(componentsDir, filePath);
          marqueeUsages.push({ file: fileName, line: i + 1 });
        }
      }
    }

    // Marquee should exist (requirement 11.1 — preserve Partners marquee)
    expect(
      marqueeUsages.length,
      'Expected animate-marquee to exist in at least one component (Partners marquee)'
    ).toBeGreaterThan(0);

    // Marquee should only be in Partners.tsx
    const nonPartnersUsages = marqueeUsages.filter(u => !u.file.includes('Partners'));
    expect(
      nonPartnersUsages,
      `animate-marquee found outside Partners.tsx:\n` +
      nonPartnersUsages.map(u => `  - ${u.file}:${u.line}`).join('\n')
    ).toHaveLength(0);
  });
});
