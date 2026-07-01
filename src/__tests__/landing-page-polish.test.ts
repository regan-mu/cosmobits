import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Property 2: No decorative pulse animations remain
 *
 * For any component in the landing page source, no decorative element shall use
 * the `animate-pulse` CSS class or a framer-motion `animate` prop that cycles
 * `boxShadow` or `opacity` with `repeat: Infinity`. Loading spinners (Loader2)
 * are excluded from this rule.
 *
 * Validates: Requirements 3.8
 */
describe('Property 2: No decorative pulse animations remain', () => {
  const componentsDir = path.resolve(__dirname, '..', 'components');

  // Get all landing page component .tsx files (excluding subdirectories like ui/ and editor/)
  const landingPageComponents = fs
    .readdirSync(componentsDir)
    .filter((f) => f.endsWith('.tsx'));

  function findAnimatePulseUsages(
    source: string
  ): { line: number; text: string }[] {
    const matches: { line: number; text: string }[] = [];
    const lines = source.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check for animate-pulse class usage
      if (/animate-pulse/.test(line)) {
        // Exclude Loader2 spinner elements — e.g. <Loader2 className="animate-spin ...
        // and lines that reference Loader2 in context
        const isLoader2Line = /Loader2/.test(line);
        // Also check surrounding lines for Loader2 context
        const surroundingContext = lines
          .slice(Math.max(0, i - 2), Math.min(lines.length, i + 3))
          .join('\n');
        const isLoaderContext = /Loader2/.test(surroundingContext);

        if (!isLoader2Line && !isLoaderContext) {
          matches.push({ line: i + 1, text: line.trim() });
        }
      }
    }

    return matches;
  }

  function findPulsingFramerMotionAnimations(
    source: string
  ): { line: number; text: string }[] {
    const matches: { line: number; text: string }[] = [];

    // Look for animate props with boxShadow or opacity arrays combined with repeat: Infinity
    // Pattern: animate={{ boxShadow: [...] }} or animate={{ opacity: [...] }}
    // combined with transition={{ ... repeat: Infinity }}

    // Strategy: find blocks that contain both:
    // 1. animate={{ ... boxShadow: [...] ... }} or animate={{ ... opacity: [...] ... }}
    // 2. repeat: Infinity in a nearby transition prop

    const lines = source.split('\n');

    // Scan for cycling boxShadow with repeat Infinity
    // These typically span multiple lines, so we search for the pattern in chunks
    const boxShadowCyclePattern =
      /animate\s*=\s*\{\s*\{[\s\S]*?boxShadow\s*:\s*\[[\s\S]*?\][\s\S]*?\}\s*\}/g;
    const opacityCyclePattern =
      /animate\s*=\s*\{\s*\{[\s\S]*?opacity\s*:\s*\[[\s\S]*?\][\s\S]*?\}\s*\}/g;

    // Check if there's a repeat: Infinity in the source near these patterns
    const repeatInfinityPattern = /repeat\s*:\s*Infinity/g;

    // Find all animate blocks with cycling boxShadow
    let match: RegExpExecArray | null;
    while ((match = boxShadowCyclePattern.exec(source)) !== null) {
      const matchStart = match.index;
      // Check for repeat: Infinity within 500 chars after the animate block
      const nearbySource = source.slice(matchStart, matchStart + 1000);
      if (repeatInfinityPattern.test(nearbySource)) {
        // Find the line number
        const lineNum =
          source.slice(0, matchStart).split('\n').length;
        // Check it's not a Loader2 context
        const contextLines = lines
          .slice(Math.max(0, lineNum - 3), Math.min(lines.length, lineNum + 5))
          .join('\n');
        if (!/Loader2/.test(contextLines)) {
          matches.push({
            line: lineNum,
            text: `animate with cycling boxShadow + repeat: Infinity`,
          });
        }
      }
      // Reset the pattern to avoid stale state
      repeatInfinityPattern.lastIndex = 0;
    }

    // Find all animate blocks with cycling opacity
    while ((match = opacityCyclePattern.exec(source)) !== null) {
      const matchStart = match.index;
      const nearbySource = source.slice(matchStart, matchStart + 1000);
      if (repeatInfinityPattern.test(nearbySource)) {
        const lineNum =
          source.slice(0, matchStart).split('\n').length;
        const contextLines = lines
          .slice(Math.max(0, lineNum - 3), Math.min(lines.length, lineNum + 5))
          .join('\n');
        if (!/Loader2/.test(contextLines)) {
          matches.push({
            line: lineNum,
            text: `animate with cycling opacity + repeat: Infinity`,
          });
        }
      }
      repeatInfinityPattern.lastIndex = 0;
    }

    return matches;
  }

  it('no component should use animate-pulse on decorative elements', () => {
    const violations: { file: string; line: number; text: string }[] = [];

    for (const fileName of landingPageComponents) {
      const filePath = path.join(componentsDir, fileName);
      const source = fs.readFileSync(filePath, 'utf-8');
      const pulseUsages = findAnimatePulseUsages(source);

      for (const usage of pulseUsages) {
        violations.push({ file: fileName, ...usage });
      }
    }

    expect(
      violations,
      `Found ${violations.length} decorative animate-pulse usage(s):\n${violations.map((v) => `  ${v.file}:${v.line} — ${v.text}`).join('\n')}`
    ).toHaveLength(0);
  });

  it('no component should use framer-motion cycling boxShadow/opacity with repeat Infinity', () => {
    const violations: { file: string; line: number; text: string }[] = [];

    for (const fileName of landingPageComponents) {
      const filePath = path.join(componentsDir, fileName);
      const source = fs.readFileSync(filePath, 'utf-8');
      const pulsingAnimations = findPulsingFramerMotionAnimations(source);

      for (const anim of pulsingAnimations) {
        violations.push({ file: fileName, ...anim });
      }
    }

    expect(
      violations,
      `Found ${violations.length} framer-motion pulsing animation(s):\n${violations.map((v) => `  ${v.file}:${v.line} — ${v.text}`).join('\n')}`
    ).toHaveLength(0);
  });
});

/**
 * Property 1: No infinite rotation animations remain
 *
 * For any component in the landing page source, no element shall have
 * `animate={{ rotate: 360 }}` (or -360) with `repeat: Infinity`.
 * This verifies all spinning elements (Brain icon, orbital rings) are made stationary.
 *
 * Validates: Requirements 1.4
 */
describe('Property 1: No infinite rotation animations remain', () => {
  const componentsDir = path.resolve(__dirname, '..', 'components');

  const landingPageComponents = [
    'Hero.tsx',
    'AISection.tsx',
    'CTA.tsx',
    'WhyUs.tsx',
    'Services.tsx',
    'About.tsx',
    'Contact.tsx',
    'Footer.tsx',
    'Partners.tsx',
    'Testimonials.tsx',
    'Header.tsx',
    'FloatingContact.tsx',
    'CounterAnimation.tsx',
  ];

  function findInfiniteRotationAnimations(source: string): string[] {
    const matches: string[] = [];

    // Pattern 1: animate={{ rotate: 360 }} or animate={{ rotate: -360 }}
    // combined with repeat: Infinity in a nearby transition prop
    const rotateAnimatePattern = /animate\s*=\s*\{\s*\{[^}]*rotate\s*:\s*-?360[^}]*\}\s*\}/g;
    let match: RegExpExecArray | null;

    while ((match = rotateAnimatePattern.exec(source)) !== null) {
      // Check if there's a repeat: Infinity in a nearby transition block (within ~500 chars)
      const contextStart = Math.max(0, match.index - 200);
      const contextEnd = Math.min(source.length, match.index + match[0].length + 500);
      const context = source.slice(contextStart, contextEnd);

      if (/repeat\s*:\s*Infinity/i.test(context)) {
        matches.push(match[0]);
      }
    }

    // Pattern 2: Objects with rotate: 360 or rotate: -360 in animate prop
    // where the transition includes repeat: Infinity
    // Handles multi-line animate props like:
    //   animate={{ rotate: 360 }}
    //   transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
    const lines = source.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/rotate\s*:\s*-?360/.test(line)) {
        // Look at surrounding lines (up to 10 lines forward and back) for repeat: Infinity
        const windowStart = Math.max(0, i - 10);
        const windowEnd = Math.min(lines.length, i + 10);
        const window = lines.slice(windowStart, windowEnd).join('\n');

        if (/repeat\s*:\s*Infinity/.test(window) && !matches.includes(line.trim())) {
          matches.push(line.trim());
        }
      }
    }

    return matches;
  }

  it('should have zero infinite rotation animations across all landing page components', () => {
    const violations: { file: string; match: string }[] = [];

    for (const fileName of landingPageComponents) {
      const filePath = path.join(componentsDir, fileName);
      if (!fs.existsSync(filePath)) continue;

      const source = fs.readFileSync(filePath, 'utf-8');
      const rotationMatches = findInfiniteRotationAnimations(source);

      for (const match of rotationMatches) {
        violations.push({ file: fileName, match });
      }
    }

    expect(
      violations,
      `Found ${violations.length} infinite rotation animation(s):\n${violations
        .map((v) => `  ${v.file}: ${v.match}`)
        .join('\n')}`
    ).toHaveLength(0);
  });

  it('should scan all expected component files', () => {
    for (const fileName of landingPageComponents) {
      const filePath = path.join(componentsDir, fileName);
      expect(
        fs.existsSync(filePath),
        `Expected component file ${fileName} to exist at ${filePath}`
      ).toBe(true);
    }
  });
});

/**
 * Property 5: CTA buttons use direct action language
 *
 * For any CTA button in the landing page, the text value must be from the approved set.
 *
 * Validates: Requirements 5.2, 5.6, 5.8
 */
describe('Property 5: CTA buttons use direct action language', () => {
  const APPROVED_CTA_TEXT = new Set([
    'Get in Touch',
    'Schedule a Call',
    'Book a Free Consultation',
    'See Our Work',
    'Start Your Project',
    'Get Started',
    'Explore Our Services',
    'Schedule a Consultation',
    'Send Message',
    'Subscribe',
  ]);

  const componentsDir = path.resolve(__dirname, '..', 'components');
  const componentFiles = ['Hero.tsx', 'AISection.tsx', 'CTA.tsx'];

  function extractCTAButtonText(source: string): string[] {
    const ctaTexts: string[] = [];

    // Pattern 1: Text content inside elements with btn-primary or btn-secondary classes
    // e.g. className="btn-primary ..."> Get in Touch <ArrowRight
    const btnClassPattern = /className="[^"]*btn-(?:primary|secondary)[^"]*"[^>]*>\s*\n?\s*([A-Z][A-Za-z\s']+?)(?:\s*\n|\s*<)/g;
    let match: RegExpExecArray | null;
    while ((match = btnClassPattern.exec(source)) !== null) {
      const text = match[1].trim();
      if (text) ctaTexts.push(text);
    }

    // Pattern 2: <span> text inside motion.a elements that link to #contact or #services
    // e.g. <motion.a href="#contact" ...><span>Schedule a Call</span>
    const motionAPattern = /motion\.a[\s\S]*?href="#(?:contact|services)"[\s\S]*?<span>(.*?)<\/span>/g;
    while ((match = motionAPattern.exec(source)) !== null) {
      const text = match[1].trim();
      if (text) ctaTexts.push(text);
    }

    // Pattern 3: motion.button with onClick that scrolls to contact section
    // followed by text content like "Book a Free Consultation"
    const motionButtonContactPattern = /motion\.button[\s\S]*?(?:scrollToContact|getElementById\(['"]contact['"]\))[\s\S]*?>\s*(?:<[^>]+>\s*)*([A-Z][A-Za-z\s']+?)(?:\s*<)/g;
    while ((match = motionButtonContactPattern.exec(source)) !== null) {
      const text = match[1].trim();
      // Filter out component names or class-like matches
      if (text && !text.match(/^(ArrowRight|Zap|Brain|Bot)$/)) {
        ctaTexts.push(text);
      }
    }

    // Pattern 4: Standalone text directly in buttons with inline-flex and rounded-full
    // that contain scrollToContact or link to #contact
    const inlineButtonPattern = /(?:onClick=\{[^}]*scrollToContact[^}]*\}|href="#contact")[^>]*>[\s\S]*?(?:<[^/][^>]*>\s*)*\s*\n\s+([A-Z][A-Za-z\s']+?)\s*\n/g;
    while ((match = inlineButtonPattern.exec(source)) !== null) {
      const text = match[1].trim();
      if (text && !text.match(/^(ArrowRight|Zap|Brain|Bot)$/) && !ctaTexts.includes(text)) {
        ctaTexts.push(text);
      }
    }

    return ctaTexts;
  }

  it('all CTA button text values should be in the approved set', () => {
    const allCTATexts: { file: string; text: string }[] = [];

    for (const fileName of componentFiles) {
      const filePath = path.join(componentsDir, fileName);
      const source = fs.readFileSync(filePath, 'utf-8');
      const texts = extractCTAButtonText(source);

      for (const text of texts) {
        allCTATexts.push({ file: fileName, text });
      }
    }

    // Ensure we found CTA texts (sanity check)
    expect(allCTATexts.length).toBeGreaterThan(0);

    // Assert each CTA text is in the approved set
    for (const { file, text } of allCTATexts) {
      expect(
        APPROVED_CTA_TEXT.has(text),
        `CTA text "${text}" in ${file} is not in the approved set. Approved values: ${[...APPROVED_CTA_TEXT].join(', ')}`
      ).toBe(true);
    }
  });

  it('should find CTA buttons in all three component files', () => {
    for (const fileName of componentFiles) {
      const filePath = path.join(componentsDir, fileName);
      const source = fs.readFileSync(filePath, 'utf-8');
      const texts = extractCTAButtonText(source);

      expect(
        texts.length,
        `Expected to find at least one CTA button in ${fileName}`
      ).toBeGreaterThan(0);
    }
  });
});
