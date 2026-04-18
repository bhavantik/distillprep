import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://distillprep.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "DistillPrep | Master Coding Interviews with MCQs",
    template: "%s | DistillPrep",
  },
  description:
    "FAANG-level MCQs for Python, SQL, and ML with deep explanations. Ace your next technical interview with DistillPrep.",
  keywords: [
    "coding interview preparation",
    "FAANG interview questions",
    "Python interview MCQs",
    "SQL interview questions",
    "machine learning interview prep",
    "technical interview practice",
    "data science interview",
    "LeetCode alternative",
    "interview MCQ platform",
  ],
  authors: [{ name: "DistillPrep", url: BASE_URL }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "DistillPrep",
    title: "DistillPrep | Master Coding Interviews with MCQs",
    description:
      "FAANG-level MCQs for Python, SQL, ML — with deep explanations. Stop guessing, start mastering.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DistillPrep – Coding Interview MCQ Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DistillPrep | Master Coding Interviews with MCQs",
    description:
      "FAANG-level MCQs for Python, SQL, ML — with deep explanations.",
    images: ["/og-image.png"],
    creator: "@distillprep",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

// JSON-LD: Website schema (global, server-rendered)
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DistillPrep",
  url: BASE_URL,
  description:
    "FAANG-level MCQ interview preparation platform for Python, SQL, and ML.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/quiz/{search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
