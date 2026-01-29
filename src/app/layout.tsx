import type { Metadata } from "next";
import "./globals.css";
import FloatingContact from "@/components/FloatingContact";
import { Toaster } from "sonner";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.cosmobits.tech'),
  title: {
    default: "CosmoBits Technologies | AI-Powered Digital Transformation",
    template: "%s | CosmoBits Technologies",
  },
  description: "CosmoBits Technologies delivers cutting-edge AI consultancy, software development, cloud infrastructure, and IT equipment supply that enable African businesses to achieve digital transformation and sustainable growth.",
  keywords: ["AI consultancy", "artificial intelligence", "software development", "cloud infrastructure", "IT equipment", "digital transformation", "Africa", "Nairobi", "Kenya", "machine learning", "tech company Kenya", "AI solutions Africa"],
  authors: [{ name: "CosmoBits Technologies", url: "https://www.cosmobits.tech" }],
  creator: "CosmoBits Technologies",
  publisher: "CosmoBits Technologies",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CosmoBits Technologies | AI-Powered Digital Transformation",
    description: "Empowering African businesses with cutting-edge AI and technology solutions",
    type: "website",
    locale: "en_US",
    url: "https://www.cosmobits.tech",
    siteName: "CosmoBits Technologies",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CosmoBits Technologies - AI-Powered Digital Transformation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CosmoBits Technologies | AI-Powered Digital Transformation",
    description: "Empowering African businesses with cutting-edge AI and technology solutions",
    images: ["/og-image.png"],
    creator: "@cosmobitstech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "aa5b817449427ed3",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload critical fonts to reduce chain */}
        <link
          rel="preload"
          href="/FONTS/ByteSharp/Byte%20Sharp.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/FONTS/UniSans/Uni%20Sans%20Regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/FONTS/UniSans/Uni%20Sans%20Bold.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        <Providers>
          {children}
          <FloatingContact />
          <Toaster 
            position="top-center" 
            richColors 
            toastOptions={{
              style: {
                fontFamily: 'inherit',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
