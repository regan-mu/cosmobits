import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const componentsDir = path.resolve(__dirname, 'src', 'components');
const files = ['Hero.tsx', 'AISection.tsx', 'CTA.tsx'];

function extractCTAButtonText(source) {
  const ctaTexts = [];
  let match;

  // Pattern 1: btn-primary/btn-secondary
  const btnClassPattern = /className="[^"]*btn-(?:primary|secondary)[^"]*"[^>]*>\s*\n?\s*([A-Z][A-Za-z\s']+?)(?:\s*\n|\s*<)/g;
  while ((match = btnClassPattern.exec(source)) !== null) {
    const text = match[1].trim();
    if (text) ctaTexts.push(text);
  }

  // Pattern 2: span text inside motion.a with #contact/#services
  const motionAPattern = /motion\.a[\s\S]*?href="#(?:contact|services)"[\s\S]*?<span>(.*?)<\/span>/g;
  while ((match = motionAPattern.exec(source)) !== null) {
    const text = match[1].trim();
    if (text) ctaTexts.push(text);
  }

  // Pattern 3: motion.button with scrollToContact
  const motionButtonContactPattern = /motion\.button[\s\S]*?(?:scrollToContact|getElementById\(['"]contact['"]\))[\s\S]*?>\s*(?:<[^>]+>\s*)*([A-Z][A-Za-z\s']+?)(?:\s*<)/g;
  while ((match = motionButtonContactPattern.exec(source)) !== null) {
    const text = match[1].trim();
    if (text && !text.match(/^(ArrowRight|Zap|Brain|Bot)$/)) {
      ctaTexts.push(text);
    }
  }

  // Pattern 4: inline buttons with scrollToContact or #contact
  const inlineButtonPattern = /(?:onClick=\{[^}]*scrollToContact[^}]*\}|href="#contact")[^>]*>[\s\S]*?(?:<[^/][^>]*>\s*)*\s*\n\s+([A-Z][A-Za-z\s']+?)\s*\n/g;
  while ((match = inlineButtonPattern.exec(source)) !== null) {
    const text = match[1].trim();
    if (text && !text.match(/^(ArrowRight|Zap|Brain|Bot)$/) && !ctaTexts.includes(text)) {
      ctaTexts.push(text);
    }
  }

  return ctaTexts;
}

for (const fileName of files) {
  const filePath = path.join(componentsDir, fileName);
  const source = fs.readFileSync(filePath, 'utf-8');
  const texts = extractCTAButtonText(source);
  console.log(`${fileName}: ${JSON.stringify(texts)}`);
}
