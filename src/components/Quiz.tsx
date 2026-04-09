import React, { useState } from 'react';
import { motion } from 'motion/react';
import { QuizQuestion } from '../data/courseData';
import { CheckCircle2, XCircle, Trophy, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: () => void;
}

export function Quiz({ questions, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const question = questions[currentQuestion];

  const handleSelect = (index: number) => {
    if (selectedAnswer !== null) return; 
    
    setSelectedAnswer(index);
    const correct = index === question.correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);

    if (correct) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#10b981', '#3b82f6'],
        disableForReducedMotion: true
      });
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowExplanation(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 border border-slate-200">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
        <h3 className="text-xl font-bold text-slate-900">Knowledge Check</h3>
        <span className="text-slate-500 font-medium text-sm">
          Question {currentQuestion + 1} of {questions.length}
        </span>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-semibold text-slate-800 mb-6 leading-relaxed">
          {question.question}
        </h4>
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isActuallyCorrect = index === question.correctAnswer;
            
            let btnClass = "w-full text-left p-4 rounded-xl border transition-all text-base ";
            
            if (selectedAnswer === null) {
              btnClass += "border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700";
            } else if (isActuallyCorrect) {
              btnClass += "border-emerald-500 bg-emerald-50 text-emerald-800 font-medium";
            } else if (isSelected && !isActuallyCorrect) {
              btnClass += "border-red-300 bg-red-50 text-red-800";
            } else {
              btnClass += "border-slate-100 bg-slate-50 opacity-50 text-slate-500";
            }

            return (
              <button
                key={index}
                className={btnClass}
                onClick={() => handleSelect(index)}
                disabled={selectedAnswer !== null}
                aria-label={`Option ${index + 1}: ${option}`}
                aria-pressed={isSelected}
                aria-describedby={isActuallyCorrect && selectedAnswer !== null ? 'correct-answer' : undefined}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {selectedAnswer !== null && isActuallyCorrect && <CheckCircle2 className="text-emerald-500 w-5 h-5" aria-hidden="true" />}
                  {isSelected && !isActuallyCorrect && <XCircle className="text-red-500 w-5 h-5" aria-hidden="true" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-5 rounded-xl mb-8 border ${isCorrect ? 'bg-emerald-50 border-emerald-100 text-emerald-900' : 'bg-red-50 border-red-100 text-red-900'}`}
        >
          <p className="font-semibold mb-2 flex items-center">
            {isCorrect ? (
              <><CheckCircle2 className="w-5 h-5 mr-2 text-emerald-600" /> Correct</>
            ) : (
              <><XCircle className="w-5 h-5 mr-2 text-red-600" /> Incorrect</>
            )}
          </p>
          <p className="text-sm leading-relaxed opacity-90">{question.explanation}</p>
        </motion.div>
      )}

      {selectedAnswer !== null && (
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
