import "./globals.css";
import "./brutalist.css";
import type { Metadata, Viewport } from "next";
import { Space_Mono, Inter } from "next/font/google";
import ClientLayout from "@/components/ClientLayout";

// Define font variables - Space Mono for headings, Inter for body (more modern than Roboto)
const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-mono",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-sans",
});

// Enhanced metadata for better SEO
export const metadata: Metadata = {
  title: "BRUTAL | DEVELOPER PORTFOLIO",
  description: "Modern brutalist portfolio showcasing web development projects and technical skills with a focus on clean design and powerful functionality",
  keywords: ["web developer", "portfolio", "brutalist", "next.js", "react", "frontend", "fullstack"],
  creator: "Web Developer",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourportfolio.com",
    title: "BRUTAL | DEVELOPER PORTFOLIO",
    description: "Modern brutalist portfolio showcasing web development projects with a focus on clean design",
    siteName: "Developer Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "BRUTAL | DEVELOPER PORTFOLIO",
    description: "Modern brutalist portfolio showcasing web development projects with a focus on clean design",
  },
};

// Viewport configuration for responsive design
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" }
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Combine the font variables into a single string
  const fontClasses = `${sans.variable} ${mono.variable}`;
  
  return (
    <html lang="en" className={fontClasses} suppressHydrationWarning>
      <body className="bg-[var(--background)] text-[var(--foreground)] antialiased selection:bg-[var(--accent)] selection:text-[var(--background)] max-w-[2200px] mx-auto overflow-x-hidden">
        <ClientLayout>
          {/* Vertical border decorations with increased width */}
          <div className="fixed top-0 left-0 w-5 h-screen bg-[var(--accent)] z-10 hidden md:block"></div>
          <div className="fixed top-0 right-0 w-5 h-screen bg-[var(--foreground)] z-10 hidden md:block"></div>
          
          {/* Horizontal border decorations */}
          <div className="fixed top-0 left-0 w-screen h-5 bg-[var(--foreground)] z-10 hidden md:block"></div>
          <div className="fixed bottom-0 left-0 w-screen h-5 bg-[var(--accent)] z-10 hidden md:block"></div>
          
          {/* Brutalist corner decorations */}
          <div className="fixed top-5 left-5 w-20 h-20 border-b-4 border-r-4 border-[var(--foreground)] z-10 hidden md:block"></div>
          <div className="fixed bottom-5 right-5 w-20 h-20 border-t-4 border-l-4 border-[var(--accent)] z-10 hidden md:block"></div>
          
          {/* Content container with extra padding */}
          <div className="min-h-screen px-4 md:px-10 pt-5 pb-5 md:pt-20 md:pb-20">
            {children}
          </div>
        </ClientLayout>
      </body>
    </html>
  );
}
