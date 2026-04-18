"use client";

import { useState, useEffect } from "react";
import { SubjectTabs } from "@/components/SubjectTabs";
import { QuestionNavigator } from "@/components/QuestionNavigator";
import { QuestionCard, parseMarkdownToHTML } from "@/components/QuestionCard";
import { OptionCard } from "@/components/OptionCard";

interface Question {
  title: string;
  question: string;
  options: Record<string, string>;
  correct_answer: string;
  difficulty: string;
  explanation: string;
}

interface QuizClientProps {
  topic: string;
}

export default function QuizClient({ topic }: QuizClientProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answeredRecord, setAnsweredRecord] = useState<
    Record<number, { selected: string; isCorrect: boolean }>
  >({});
  const [loading, setLoading] = useState(true);

  // Load state from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(`distillprep_${topic}_state`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.answeredRecord) setAnsweredRecord(parsed.answeredRecord);
        if (typeof parsed.currentIndex === "number")
          setCurrentIndex(parsed.currentIndex);
      } catch (e) {
        console.error("Failed to parse local progress", e);
      }
    }
  }, [topic]);

  // Fetch Questions
  useEffect(() => {
    fetch(`/data/${topic}_mcqs.json`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(() => {
        setQuestions([]);
        setLoading(false);
      });
  }, [topic]);

  // Save to local storage on state change
  useEffect(() => {
    if (questions.length > 0) {
      localStorage.setItem(
        `distillprep_${topic}_state`,
        JSON.stringify({ answeredRecord, currentIndex })
      );
    }
  }, [answeredRecord, currentIndex, topic, questions.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-slate-100 flex items-center justify-center font-sans tracking-wide">
        Loading...
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex flex-col font-sans text-slate-100">
        <SubjectTabs />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-slide-up">
          <h2 className="text-2xl font-semibold mb-4">Module not found!</h2>
          <p className="text-slate-400">
            We are currently building `{topic}`. Check back soon.
          </p>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const currentAnswerState = answeredRecord[currentIndex];
  const isAnswered = !!currentAnswerState;

  const handleSelectOption = (key: string) => {
    if (isAnswered) return;
    setAnsweredRecord((prev) => ({
      ...prev,
      [currentIndex]: {
        selected: key,
        isCorrect: key === currentQ.correct_answer,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col font-sans text-slate-100 selection:bg-blue-500/30">
      <SubjectTabs />

      <div className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col md:flex-row gap-8 lg:gap-16">
        {/* Sidebar Navigator */}
        <aside className="w-full md:w-32 lg:w-48 shrink-0 md:sticky md:top-24 h-fit">
          <QuestionNavigator
            total={questions.length}
            currentIndex={currentIndex}
            answeredRecord={answeredRecord}
            onSelect={(idx) => setCurrentIndex(idx)}
          />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 max-w-3xl w-full mx-auto pb-24">
          <div className="animate-slide-up">
            <QuestionCard
              difficulty={currentQ.difficulty}
              questionNumber={currentIndex + 1}
              questionText={currentQ.question}
            />

            {/* Options */}
            <div className="space-y-3 mt-8">
              {Object.entries(currentQ.options).map(([key, val]) => (
                <OptionCard
                  key={key}
                  optionKey={key}
                  textHTML={parseMarkdownToHTML(val)}
                  isSelected={currentAnswerState?.selected === key}
                  isCorrectAnswer={key === currentQ.correct_answer}
                  reveal={isAnswered}
                  onClick={() => handleSelectOption(key)}
                  disabled={isAnswered}
                />
              ))}
            </div>

            {/* Explanation Section */}
            {isAnswered && (
              <div className="mt-12 pt-8 border-t border-slate-800 animate-slide-up">
                <h4 className="text-sm font-semibold tracking-wider text-slate-500 uppercase mb-4 flex items-center gap-2 relative">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      currentAnswerState.isCorrect
                        ? "bg-emerald-500"
                        : "bg-red-500"
                    }`}
                  />
                  Explanation
                </h4>

                <div
                  className="text-sm text-gray-400 leading-relaxed space-y-4 font-normal"
                  dangerouslySetInnerHTML={{
                    __html: parseMarkdownToHTML(currentQ.explanation),
                  }}
                />

                {/* Continue button */}
                <div className="mt-8 flex justify-end">
                  <button
                    disabled={currentIndex === questions.length - 1}
                    onClick={() => setCurrentIndex((prev) => prev + 1)}
                    className="bg-white text-slate-900 px-6 py-2.5 rounded-lg font-medium shadow-sm hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {currentIndex === questions.length - 1
                      ? "Completed"
                      : "Next Question →"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
