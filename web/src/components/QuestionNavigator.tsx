interface QuestionNavigatorProps {
  total: number;
  currentIndex: number;
  answeredRecord: Record<number, { selected: string; isCorrect: boolean }>;
  onSelect: (index: number) => void;
}

export function QuestionNavigator({ total, currentIndex, answeredRecord, onSelect }: QuestionNavigatorProps) {
  // Mobile horizontal scroll, Desktop sidebar grid
  const numbers = Array.from({ length: total }, (_, i) => i);

  return (
    <div className="w-full flex md:flex-col gap-4">
      <h3 className="hidden md:block text-slate-300 text-sm font-semibold tracking-wider uppercase mb-2">
        Questions
      </h3>
      <div className="flex md:grid md:grid-cols-5 gap-2 overflow-x-auto no-scrollbar md:overflow-visible pb-2 md:pb-0">
        {numbers.map((num) => {
          const isCurrent = num === currentIndex;
          const answerState = answeredRecord[num];

          let style = "bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-slate-500 hover:text-white";
          if (answerState) {
            style = answerState.isCorrect
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
              : "bg-red-500/10 text-red-400 border border-red-500/30";
          }
          if (isCurrent) {
            style = "bg-blue-600 text-white border border-blue-400 shadow-[0_0_10px_rgba(37,99,235,0.5)]";
          }

          return (
            <button
              key={num}
              onClick={() => onSelect(num)}
              className={`min-w-10 w-10 h-10 rounded-lg text-sm font-medium transition-all shrink-0 flex items-center justify-center ${style}`}
            >
              {num + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
