import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DistillPrep | Master Coding Interviews with MCQs",
  description:
    "Practice FAANG-level MCQs for Python, SQL, and ML interviews. Deep conceptual questions with detailed explanations — not rote memorization.",
  alternates: {
    canonical: "https://distillprep.com",
  },
  openGraph: {
    title: "DistillPrep | Master Coding Interviews with MCQs",
    description:
      "High-quality, FAANG-level MCQs focused on deep conceptual understanding and real-world traps.",
    url: "https://distillprep.com",
  },
};

export default function Home() {
  const topics = [
    {
      id: "python",
      name: "Python Mastery",
      description: "Tricky semantics, memory models, closures, and more.",
      questionsCount: 92,
      difficulty: "Hard",
      color: "from-blue-500 to-indigo-600",
    },
    // Placeholders for future paths
    {
      id: "sql",
      name: "SQL & Databases",
      description: "Window functions, join traps, and query optimization.",
      questionsCount: 0,
      difficulty: "Medium",
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: "ml",
      name: "Machine Learning Concepts",
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
          🚀 DistillPrep MVP is Live
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white to-slate-400 text-transparent bg-clip-text">
          Master the Interview. <br/> Stop Guessing.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-16">
          High-quality, FAANG-level multiple choice questions focused on deep conceptual understanding, edge cases, and real-world traps. Not just rote learning.
        </p>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={topic.questionsCount > 0 ? `/quiz/${topic.id}` : "#"}
              className={`glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] flex flex-col border border-slate-700 hover:border-slate-500 ${topic.questionsCount === 0 ? "opacity-60 cursor-not-allowed hidden md:flex" : ""}`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center mb-6 shadow-lg`}>
                {/* Simple icon based on name (just the first letter for MVP) */}
                <span className="text-white font-bold text-xl">{topic.name.charAt(0)}</span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{topic.name}</h3>
              <p className="text-sm text-slate-400 flex-grow mb-6">{topic.description}</p>
              
              <div className="mt-auto flex items-center justify-between text-xs font-semibold">
                <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-md">
                  {topic.questionsCount} Questions
                </span>
                <span className="text-blue-400 group-hover:underline">
                  {topic.questionsCount > 0 ? "Start Practice →" : "Coming Soon"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
