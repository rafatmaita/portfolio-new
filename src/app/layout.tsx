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
  title: {
    default: "R'afat Almaita (رافت المعايطه) | Full-Stack Developer & AI Prompt Engineer",
    template: "%s | R'afat Almaita Portfolio",
  },
  description: "Portfolio of R'afat Almaita (رافت المعايطه), a Full-Stack Developer and AI Prompt Engineer based in Jordan. Specializing in Next.js, NestJS, and AI Integration. Rafat Maita builds scalable web applications and AI-powered solutions.",
  authors: [{ name: "R'afat Almaita" }, { name: "رافت المعايطه" }],
  keywords: [
    "R'afat Almaita",
    "Rafat Maita",
    "رافت المعايطه",
    "رأفت المعايطة",
    "Full-Stack Developer",
    "AI Prompt Engineer",
    "Software Engineer Jordan",
    "مطور ويب الأردن",
    "Next.js Developer",
    "NestJS",
    "React.js",
    "Web Development",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
  ],
  creator: "R'afat Almaita",
  openGraph: {
    type: "website",
    title: "R'afat Almaita (رافت المعايطه) | Full-Stack Developer & AI Prompt Engineer",
    description: "Portfolio of R'afat Almaita (رافت المعايطه), a Full-Stack Developer and AI Prompt Engineer based in Jordan. Specializing in Next.js, NestJS, and AI Integration.",
    siteName: "R'afat Almaita Portfolio",
    locale: "en_US",
    alternateLocale: "ar_JO",
  },
  twitter: {
    card: "summary_large_image",
    title: "R'afat Almaita (رافت المعايطه) | Full-Stack Developer",
    description: "Portfolio of R'afat Almaita (رافت المعايطه), a Full-Stack Developer and AI Prompt Engineer based in Jordan.",
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
  alternates: {
    languages: {
      'en': '/',
      'ar': '/',
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// JSON-LD Schema for SEO - Enhanced for multilingual name search
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "R'afat Almaita",
  alternateName: ["Rafat Maita", "رافت المعايطه", "رأفت المعايطة", "Rafat Almaita"],
  jobTitle: "Full-Stack Web Developer | AI Prompt Engineer",
  description: "Full-stack web developer skilled in Node.js, TypeScript, Python, ASP.NET, and React.js, with experience building scalable applications using MongoDB and PostgreSQL.",
  url: "https://rafatalmaita.com",
  email: "rafatmaita2030@gmail.com",
  telephone: "+962-795721257",
  image: "https://rafatalmaita.com/profile.jpg", // Add your profile image URL
  address: {
    "@type": "PostalAddress",
    addressLocality: "Zarqa",
    addressRegion: "Zarqa Governorate",
    addressCountry: "JO",
  },
  nationality: {
    "@type": "Country",
    name: "Jordan",
  },
  sameAs: [
    "https://www.linkedin.com/in/rafat-maita/",
    "https://github.com/rafatmaita",
    // Add more profiles here to strengthen Knowledge Graph:
    // "https://twitter.com/rafatmaita",
    // "https://stackoverflow.com/users/YOUR_ID",
    // "https://dev.to/rafatmaita",
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
  knowsLanguage: ["en", "ar"],
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
