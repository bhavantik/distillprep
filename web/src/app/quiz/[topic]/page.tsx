import type { Metadata } from "next";
import QuizClient from "./QuizClient";

const BASE_URL = "https://distillprep.com";

// Per-topic SEO metadata
const TOPIC_META: Record<string, { title: string; description: string }> = {
  python: {
    title: "Python MCQs for Interviews",
    description:
      "Practice tricky Python interview MCQs covering closures, memory models, decorators, generators, and edge cases asked in FAANG interviews.",
  },
  sql: {
    title: "SQL & Database MCQs for Interviews",
    description:
      "Master SQL interview questions on window functions, join traps, query optimization, indexing, and database design patterns.",
  },
  ml: {
    title: "Machine Learning MCQs for Interviews",
    description:
      "Deep ML interview questions covering bias-variance tradeoff, evaluation metrics, overfitting, and theoretical trade-offs asked in top AI companies.",
  },
};

// Generates <title> and <meta> tags per topic
export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  const meta = TOPIC_META[topic] ?? {
    title: `${topic.charAt(0).toUpperCase() + topic.slice(1)} MCQs`,
    description: `Practice ${topic} interview MCQs on DistillPrep.`,
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/quiz/${topic}`,
    },
    openGraph: {
      title: `${meta.title} | DistillPrep`,
      description: meta.description,
      url: `${BASE_URL}/quiz/${topic}`,
    },
    twitter: {
      title: `${meta.title} | DistillPrep`,
      description: meta.description,
    },
  };
}

// JSON-LD: Quiz/EducationalOccupationalProgram schema per topic
function buildQuizSchema(topic: string) {
  const meta = TOPIC_META[topic];
  return {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: meta?.title ?? `${topic} MCQ Quiz`,
    description: meta?.description ?? `Practice ${topic} MCQs on DistillPrep.`,
    url: `${BASE_URL}/quiz/${topic}`,
    educationalLevel: "Advanced",
    about: {
      "@type": "Thing",
      name: topic.charAt(0).toUpperCase() + topic.slice(1),
    },
    provider: {
      "@type": "Organization",
      name: "DistillPrep",
      url: BASE_URL,
    },
  };
}

// Server component — renders metadata + JSON-LD then mounts client quiz UI
export default async function QuizPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildQuizSchema(topic)),
        }}
      />
      <QuizClient topic={topic} />
    </>
  );
}
