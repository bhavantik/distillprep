import Link from "next/link";
import { usePathname } from "next/navigation";

const SUBJECTS = [
  { id: "python", name: "Python" },
  { id: "sql", name: "SQL" },
  { id: "ml", name: "ML" },
  { id: "nlp", name: "NLP" },
  { id: "genai", name: "GenAI" },
];

export function SubjectTabs() {
  const pathname = usePathname();

  return (
    <div className="w-full border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-between sm:justify-start gap-1 sm:gap-6 overflow-x-auto no-scrollbar py-3">
        <Link 
          href="/" 
          className="text-slate-400 hover:text-white mr-4 font-semibold text-sm transition shrink-0"
        >
          ← Home
        </Link>
        {SUBJECTS.map((sub) => {
          const isActive = pathname.includes(`/quiz/${sub.id}`);
          return (
            <Link
              key={sub.id}
              href={`/quiz/${sub.id}`}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all shrink-0 ${
                isActive
                  ? "bg-slate-800 text-white shadow-sm border border-slate-700"
                  : "text-slate-400 hover:text-slate-300 hover:bg-slate-800/50"
              }`}
            >
              {sub.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
