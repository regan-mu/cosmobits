import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-schibsted",
});

const TITLE = "AI, Software & Cloud Solutions in Nairobi, Kenya | CosmoBits";
const DESCRIPTION =
  "AI, custom software, cloud and IT equipment for businesses in Kenya and across Africa. Nairobi team, free first consultation. Talk to CosmoBits.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cosmobits.tech"),
  title: {
    default: TITLE,
    template: "%s | CosmoBits",
  },
  description: DESCRIPTION,
  authors: [{ name: "CosmoBits Technologies", url: "https://www.cosmobits.tech" }],
  creator: "CosmoBits Technologies",
  publisher: "CosmoBits Technologies",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "en_KE",
    url: "https://www.cosmobits.tech",
    siteName: "CosmoBits Technologies",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CosmoBits Technologies: Intelligent Solutions, Lasting Impact.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
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
    <html lang="en-KE" className={sans.variable}>
      <body className="font-sans antialiased">
        {children}
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            style: {
              fontFamily: 'inherit',
            },
          }}
        />
      </body>
    </html>
  );
}
