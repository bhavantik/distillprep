import type { Metadata } from "next";
import QuizClient from "./QuizClient";

const BASE_URL = "https://distillprep.com";

// Slugs mapping to data files (if they differ)
const DATA_MAPPING: Record<string, string> = {
  "python-mcq": "python",
  "sql-mcq": "sql",
  "genai-interview-mcqs": "genai",
  "ml-interview-mcqs": "ml",
};

// Per-topic SEO metadata
const TOPIC_META: Record<string, { title: string; description: string }> = {
  "python-mcq": {
    title: "Python Interview MCQs | Tricky Semantics & Memory Models",
    description:
      "Practice tricky Python interview MCQs covering closures, memory models, decorators, generators, and edge cases asked in MAANG-level interviews. Focus on deep understanding and practical problem-solving.",
  },
  "sql-mcq": {
    title: "SQL & Database MCQs for Interviews",
    description:
      "Master SQL interview questions on window functions, join traps, query optimization, indexing, and database design patterns.",
  },
  "ml-interview-mcqs": {
    title: "Machine Learning MCQs | MAANG-Level Interview Prep",
    description:
      "Deep ML interview questions covering bias-variance tradeoff, evaluation metrics, overfitting, and theoretical trade-offs asked in top AI companies.",
  },
  "genai-interview-mcqs": {
    title: "GenAI & LLM Interview MCQs",
    description:
      "Learn GenAI concepts deeply through MCQs covering LLMs, embeddings, transformers, and real-world edge cases tested in interviews.",
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
    title: `${topic.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ")}`,
    description: `Practice ${topic} interview MCQs on DistillPrep.`,
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${topic}`,
    },
    openGraph: {
      title: `${meta.title} | DistillPrep`,
      description: meta.description,
      url: `${BASE_URL}/${topic}`,
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
    url: `${BASE_URL}/${topic}`,
    educationalLevel: "Advanced",
    about: {
      "@type": "Thing",
      name: topic.split("-")[0].toUpperCase(),
    },
    provider: {
      "@type": "Organization",
      name: "DistillPrep",
      url: BASE_URL,
    },
  };
}

// Enable static generation for these specific paths
export async function generateStaticParams() {
  return [
    { topic: "python-mcq" },
    { topic: "sql-mcq" },
    { topic: "ml-interview-mcqs" },
    { topic: "genai-interview-mcqs" },
  ];
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  
  // Map our SEO-friendly topic slug back to the data filename
  const dataTopic = DATA_MAPPING[topic] || topic.split("-")[0];
  const displayName = TOPIC_META[topic]?.title.split(" | ")[0] || topic.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildQuizSchema(topic)),
        }}
      />
      <QuizClient topic={dataTopic} displayName={displayName} />
    </>
  );
}
