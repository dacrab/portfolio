import "./globals.css";
import "./brutalist.css";
import type { Metadata, Viewport } from "next";
import { Space_Mono, Archivo } from "next/font/google";
import ClientLayout from "@/components/ClientLayout";

// Define font variables - Space Mono for headings, Archivo for body (better brutalist fit)
const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-mono",
});

const sans = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    url: "https://dacrab.github.io",
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
    { media: "(prefers-color-scheme: light)", color: "#f7f4f0" },
    { media: "(prefers-color-scheme: dark)", color: "#151515" }
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
          {/* Abstract geometric decorations */}
          <div className="fixed top-[15%] left-[10%] opacity-20 w-64 h-64 border-8 border-[var(--accent)] rounded-full mix-blend-difference hidden md:block z-0"></div>
          <div className="fixed bottom-[20%] right-[15%] w-48 h-48 border-8 border-[var(--foreground)] transform rotate-45 opacity-10 hidden md:block z-0"></div>
          <div className="fixed top-[60%] left-[25%] w-32 h-6 bg-[var(--accent-secondary)] opacity-20 transform -rotate-12 hidden md:block z-0"></div>
        
          {/* Vertical border decorations with thicker width for more impact */}
          <div className="fixed top-0 left-0 w-8 h-screen bg-[var(--accent)] z-10 hidden md:block"></div>
          <div className="fixed top-0 right-0 w-8 h-screen bg-[var(--foreground)] z-10 hidden md:block"></div>
          
          {/* Horizontal border decorations */}
          <div className="fixed bottom-0 left-0 w-screen h-8 bg-[var(--accent-secondary)] z-10 hidden md:block"></div>
          
          {/* Brutalist corner decorations - stronger presence */}
          <div className="fixed top-10 left-10 w-32 h-32 border-b-8 border-r-8 border-[var(--foreground)] z-10 hidden md:block"></div>
          <div className="fixed bottom-10 right-10 w-32 h-32 border-t-8 border-l-8 border-[var(--accent)] z-10 hidden md:block"></div>
          
          {/* Grid noise background */}
          <div className="fixed inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(0,0,0,0.03)_1.5px,transparent_1.5px)] bg-[size:32px_32px] z-0 pointer-events-none opacity-60"></div>
          
          {/* Content container with extra padding for better spacing */}
          <div className="min-h-screen px-4 md:px-16 pt-5 pb-5 md:pt-24 md:pb-24 relative z-10">
            {children}
          </div>
        </ClientLayout>
      </body>
    </html>
  );
}
