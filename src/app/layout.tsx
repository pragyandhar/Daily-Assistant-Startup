import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chat that feels instant | AI Assistant",
  description: "Beautiful, fast, and private AI chat experience built for instant conversations.",
  keywords: ["AI", "chat", "assistant", "instant", "private", "beautiful"],
  authors: [{ name: "Daily Assistant" }],
  creator: "Daily Assistant",
  publisher: "Daily Assistant",
  openGraph: {
    title: "Chat that feels instant",
    description: "Beautiful, fast, and private AI chat experience built for instant conversations.",
    url: "https://daily-assistant.app",
    siteName: "Daily Assistant",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chat that feels instant",
    description: "Beautiful, fast, and private AI chat experience built for instant conversations.",
    creator: "@dailyassistant",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
