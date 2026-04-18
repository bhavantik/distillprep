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
  title: "DistillPrep | Master AI, ML & GenAI Interviews with Practical MCQs",
  description:
    "Crack AI, ML, and GenAI interviews through practical, concept-driven MCQs. Learn deeply via edge cases, real-world traps, and MAANG-level questions — not rote memorization.",
  keywords: [
    "Python interview MCQs",
    "SQL interview questions",
    "Machine learning MCQs",
    "GenAI interview questions",
    "LLM interview preparation",
    "AI engineer interview prep",
    "MAANG interview questions",
    "deep learning MCQs",
    "practical coding concepts",
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
    title: "DistillPrep | Master AI, ML & GenAI Interviews with Practical MCQs",
    description:
      "Crack AI, ML, and GenAI interviews through practical, concept-driven MCQs. Learn deeply via edge cases and MAANG-level traps.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DistillPrep – AI/ML Interview MCQ Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DistillPrep | Master AI, ML & GenAI Interviews with Practical MCQs",
    description:
      "Crack AI, ML, and GenAI interviews through practical, concept-driven MCQs.",
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
    "Master AI, ML & GenAI interviews with practical MCQs focused on deep conceptual clarity.",
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
