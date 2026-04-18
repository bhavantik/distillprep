import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DistillPrep | Master AI, ML & GenAI Interviews",
  description:
    "Practice MAANG-level MCQs for Python, SQL, and ML interviews. Deep conceptual questions with detailed explanations — not rote memorization.",
  alternates: {
    canonical: "https://distillprep.com",
  },
  openGraph: {
    title: "DistillPrep | Master AI, ML & GenAI Interviews",
    description:
      "High-quality, MAANG-level MCQs focused on deep conceptual understanding and real-world traps.",
    url: "https://distillprep.com",
  },
};

export default function Home() {
  const topics = [
    {
      id: "python-mcq",
      name: "Python Mastery",
      description: "Tricky semantics, memory models, closures, and edge cases.",
      questionsCount: 92,
      difficulty: "Hard",
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: "genai-interview-mcqs",
      name: "GenAI & LLMs",
      description: "Transformers, RAG, embeddings, and real-world LLM traps.",
      questionsCount: 0,
      difficulty: "Hard",
      color: "from-purple-500 to-pink-600",
    },
    {
      id: "sql-mcq",
      name: "SQL & Databases",
      description: "Window functions, join traps, and query optimization.",
      questionsCount: 0,
      difficulty: "Medium",
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: "ml-interview-mcqs",
      name: "ML Concepts",
      description: "Bias-variance, metrics, and theoretical trade-offs.",
      questionsCount: 0,
      difficulty: "Hard",
      color: "from-orange-500 to-red-600",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center py-20 px-6 sm:px-12 relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl w-full z-10 flex flex-col items-center text-center animate-slide-up">
        <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-8">
          🚀 DistillPrep is Live
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white to-slate-400 text-transparent bg-clip-text">
          Master the Interview. <br/> Stop Guessing.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-8">
          Learn practical concepts through high-quality MCQs designed for deep conceptual understanding, real-world edge cases, and interview traps.
        </p>

        <p className="text-sm md:text-base text-slate-500 max-w-xl mb-16 italic">
          Built for MAANG-level preparation — not just theory, but practical thinking across AI, ML, and GenAI.
        </p>

        {/* SEO Content Block */}
        <div className="mb-20 p-8 rounded-2xl border border-slate-800 bg-slate-900/50 text-left max-w-3xl">
          <p className="text-slate-300 leading-relaxed">
            DistillPrep helps engineers deeply understand programming and AI concepts through carefully designed MCQs. 
            Each question targets real interview scenarios, hidden edge cases, and common traps — helping you think like an engineer, not memorize like a student.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={topic.questionsCount > 0 ? `/${topic.id}` : "#"}
              className={`glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] flex flex-col border border-slate-700 hover:border-slate-500 ${topic.questionsCount === 0 ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center mb-6 shadow-lg`}>
                <span className="text-white font-bold text-xl">{topic.name.charAt(0)}</span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{topic.name}</h3>
              <p className="text-sm text-slate-400 flex-grow mb-6">{topic.description}</p>
              
              <div className="mt-auto flex items-center justify-between text-xs font-semibold">
                <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-md">
                  {topic.questionsCount > 0 ? `${topic.questionsCount} Questions` : "Coming Soon"}
                </span>
                <span className="text-blue-400 group-hover:underline">
                  {topic.questionsCount > 0 ? "Start Practice →" : "Join Waitlist"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
