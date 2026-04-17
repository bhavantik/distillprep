export function parseMarkdownToHTML(text: string) {
  if (!text) return "";
  
  // Replace triple backticks with PRE blocks
  let html = text.replace(/```(?:[a-z]*)\n?([\s\S]*?)```/g, '<pre class="bg-[#0b1120] text-slate-300 p-4 rounded-xl border border-slate-800 font-mono text-sm md:text-base my-4 overflow-x-auto shadow-inner leading-relaxed"><code>$1</code></pre>');
  
  // Replace single backticks with inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-[#0b1120] text-blue-300 px-1.5 py-0.5 rounded font-mono text-sm border border-slate-800/50">$1</code>');
  
  // Handle newlines outside of pre blocks (poor man's markdown)
  // This is tricky, so we wrap in a div and preserve whitespace via CSS if needed
  return html;
}

interface QuestionCardProps {
  difficulty: string;
  questionNumber: number;
  questionText: string;
}

export function QuestionCard({ difficulty, questionNumber, questionText }: QuestionCardProps) {
  let badgeColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  if (difficulty.toLowerCase() === "medium") badgeColor = "bg-orange-500/10 text-orange-400 border-orange-500/20";
  if (difficulty.toLowerCase() === "hard") badgeColor = "bg-red-500/10 text-red-500 border-red-500/20";

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-slate-500 font-mono text-sm tracking-widest uppercase">
          Q{questionNumber}
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
        <span className={`text-xs font-semibold px-2 py-0.5 rounded uppercase border ${badgeColor}`}>
          {difficulty}
        </span>
      </div>
      
      {/* 
        Using whitespace-pre-wrap ensures standard line breaks are respected in the question text
      */}
      <div 
        className="text-xl md:text-2xl font-semibold text-slate-100 leading-relaxed whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: parseMarkdownToHTML(questionText) }}
      />
    </div>
  );
}
