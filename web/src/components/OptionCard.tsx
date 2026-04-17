interface OptionCardProps {
  optionKey: string;
  textHTML: string;
  isSelected: boolean;
  isCorrectAnswer: boolean;
  reveal: boolean;
  onClick: () => void;
  disabled: boolean;
}

export function OptionCard({
  optionKey,
  textHTML,
  isSelected,
  isCorrectAnswer,
  reveal,
  onClick,
  disabled
}: OptionCardProps) {
  let cardStyle = "border-slate-800 bg-slate-900/40 text-slate-300";
  let letterStyle = "bg-slate-800 text-slate-400";

  if (!reveal) {
    if (!disabled) {
      cardStyle += " hover:bg-slate-800 hover:border-slate-600 cursor-pointer";
    }
  } else {
    // Reveal mode
    if (isCorrectAnswer) {
      cardStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-50";
      letterStyle = "bg-emerald-500/20 text-emerald-400 font-bold";
    } else if (isSelected && !isCorrectAnswer) {
      cardStyle = "border-red-500 bg-red-500/10 text-red-50";
      letterStyle = "bg-red-500/20 text-red-400 font-bold";
    } else {
      cardStyle = "border-slate-800 bg-slate-900/30 text-slate-500 opacity-50";
      letterStyle = "bg-slate-800 text-slate-600";
    }
  }

  return (
    <button
      onClick={() => {
        if (!disabled) onClick();
      }}
      disabled={disabled}
      className={`w-full text-left p-4 md:p-5 rounded-xl border transition-all duration-300 flex items-start gap-4 shadow-sm ${cardStyle}`}
    >
      <div className={`mt-0.5 w-7 h-7 shrink-0 rounded flex items-center justify-center text-sm font-semibold transition-colors ${letterStyle}`}>
        {optionKey}
      </div>
      <div 
        className="flex-1 text-base leading-relaxed"
        dangerouslySetInnerHTML={{ __html: textHTML }}
      />
    </button>
  );
}
