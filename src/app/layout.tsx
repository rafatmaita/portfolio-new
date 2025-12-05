import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "lineicons/dist/lineicons.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "R'afat Almaita | Full-Stack Developer & AI Prompt Engineer",
  description: "Portfolio of R'afat Almaita, a Software Engineer based in Jordan specializing in Next.js, NestJS, and AI Integration. Experienced in building scalable web applications and AI model training.",
  authors: [{ name: "R'afat Almaita" }],
  keywords: [
    "Full-Stack Developer",
    "AI Prompt Engineer",
    "Software Engineer Jordan",
    "Next.js Developer",
    "NestJS",
    "React.js",
    "Web Development",
    "Rafat Maita",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
  ],
  creator: "R'afat Almaita",
  openGraph: {
    type: "website",
    title: "R'afat Almaita | Full-Stack Developer & AI Prompt Engineer",
    description: "Portfolio of R'afat Almaita, a Software Engineer based in Jordan specializing in Next.js, NestJS, and AI Integration. Experienced in building scalable web applications and AI model training.",
    siteName: "R'afat Almaita Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "R'afat Almaita | Full-Stack Developer & AI Prompt Engineer",
    description: "Portfolio of R'afat Almaita, a Software Engineer based in Jordan specializing in Next.js, NestJS, and AI Integration.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// JSON-LD Schema for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "R'afat Almaita",
  jobTitle: "Full-Stack Web Developer | AI Prompt Engineer",
  description: "Full-stack web developer skilled in Node.js, TypeScript, Python, ASP.NET, and React.js, with experience building scalable applications using MongoDB and PostgreSQL.",
  url: "https://rafatalmaita.com",
  email: "rafatmaita2030@gmail.com",
  telephone: "+962-795721257",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Zarqa",
    addressCountry: "Jordan",
  },
  sameAs: [
    "https://linkedin.com/in/rafatmaita",
    "https://github.com/rafatalmaita",
  ],
  knowsAbout: [
    "Full-Stack Development",
    "AI Prompt Engineering",
    "Next.js",
    "NestJS",
    "React.js",
    "Node.js",
    "TypeScript",
    "MongoDB",
    "PostgreSQL",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)] min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
