# CosmoBits Technologies Website

A professional, modern website for CosmoBits Technologies - a leading technology solutions provider delivering comprehensive services across AI consultancy, software development, cybersecurity, cloud infrastructure, and IT equipment supply.

![CosmoBits Technologies](https://img.shields.io/badge/CosmoBits-Technologies-00CED1?style=for-the-badge)

## 🚀 Features

- **Modern Design**: Beautiful, professional UI with smooth animations
- **Fully Responsive**: Optimized for all device sizes
- **Performance Optimized**: Built with Next.js 14 and Turbopack
- **Accessible**: WCAG compliant design patterns
- **SEO Ready**: Comprehensive meta tags and structured data
- **Interactive Forms**: Contact form with validation using React Hook Form + Zod

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Form Handling**: React Hook Form + Zod
- **Fonts**: Geist Sans & Geist Mono

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and brand colors
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Main page composition
├── components/
│   ├── Header.tsx       # Navigation header with mobile menu
│   ├── Hero.tsx         # Hero section with animations
│   ├── Services.tsx     # Services showcase
│   ├── About.tsx        # Mission, vision, and values
│   ├── WhyUs.tsx        # Why choose us + process
│   ├── Testimonials.tsx # Client testimonials carousel
│   ├── CTA.tsx          # Call-to-action section
│   ├── Contact.tsx      # Contact form with validation
│   └── Footer.tsx       # Site footer
```

## 🎨 Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Space Blue | `#0A1628` | Primary dark background |
| Cosmic Navy | `#0F2847` | Secondary dark background |
| Midnight Blue | `#1A365D` | Tertiary dark background |
| Cosmic Teal | `#00CED1` | Primary accent |
| Electric Cyan | `#00E5FF` | Secondary accent |
| Nebula Purple | `#7C3AED` | Highlight accent |
| Stellar Orange | `#FF6B35` | Warm accent |
| Solar Gold | `#FFB800` | Warning/highlight accent |

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 📝 Customization

### Updating Contact Information
Edit the contact details in `src/components/Contact.tsx` and `src/components/Footer.tsx`.

### Adding New Services
Modify the `services` array in `src/components/Services.tsx`.

### Changing Brand Colors
Update the CSS variables in `src/app/globals.css` and the Tailwind theme in the `@theme` block.

### Adding Testimonials
Add new entries to the `testimonials` array in `src/components/Testimonials.tsx`.

## 📧 Contact Form Integration

The contact form is ready for backend integration. To connect it to your backend:

1. Create an API route in `src/app/api/contact/route.ts`
2. Update the `onSubmit` function in `src/components/Contact.tsx`

Example API route:
```typescript
// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  // Send email or save to database
  return NextResponse.json({ success: true });
}
```

## 🌐 Deployment

This project is optimized for deployment on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Other deployment options:
- Netlify
- AWS Amplify
- Self-hosted with Node.js

## 📄 License

© 2026 CosmoBits Technologies. All rights reserved.

---

Built with ❤️ by CosmoBits Technologies
