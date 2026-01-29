import type { Metadata } from "next";
import "./globals.css";
import FloatingContact from "@/components/FloatingContact";
import { Toaster } from "sonner";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "CosmoBits Technologies | AI-Powered Digital Transformation",
  description: "CosmoBits Technologies delivers cutting-edge AI consultancy, software development, cloud infrastructure, and IT equipment supply that enable African businesses to achieve digital transformation and sustainable growth.",
  keywords: ["AI consultancy", "artificial intelligence", "software development", "cloud infrastructure", "IT equipment", "digital transformation", "Africa", "Nairobi", "Kenya", "machine learning"],
  authors: [{ name: "CosmoBits Technologies" }],
  openGraph: {
    title: "CosmoBits Technologies | AI-Powered Digital Transformation",
    description: "Empowering African businesses with cutting-edge AI and technology solutions",
    type: "website",
    locale: "en_US",
    siteName: "CosmoBits Technologies",
  },
  twitter: {
    card: "summary_large_image",
    title: "CosmoBits Technologies | AI-Powered Digital Transformation",
    description: "Empowering African businesses with cutting-edge AI and technology solutions",
  },
  robots: {
    index: true,
    follow: true,
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
