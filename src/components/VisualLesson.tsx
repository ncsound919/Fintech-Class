import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import type { VisualStep } from '../data/courseData';

interface VisualLessonProps {
  steps: VisualStep[];
  onComplete: () => void;
}

export default function VisualLesson({ steps, onComplete }: VisualLessonProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;
  const progressPct = ((currentStep + 1) / steps.length) * 100;

  function handleNext() {
    if (isLast) {
      setCompleted(true);
      onComplete();
    } else {
      setCurrentStep((s) => s + 1);
    }
  }

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <CheckCircle className="w-16 h-16 text-green-400" />
        <h2 className="text-2xl font-bold text-white">Section Complete! 🎉</h2>
        <p className="text-slate-400">You've finished this visual walkthrough.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Progress bar */}
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div
          className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Step counter */}
      <div className="flex items-center justify-between text-sm text-slate-400">
        <span>Step {currentStep + 1} of {steps.length}</span>
        <span>{Math.round(progressPct)}% complete</span>
      </div>

      {/* Card */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
        {/* Emoji hero */}
        <div className="flex items-center justify-center bg-slate-900 py-12">
          <span className="text-8xl select-none" role="img" aria-label={step.title}>
            {step.emoji}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {step.step}
            </span>
            <h3 className="text-xl font-bold text-white">{step.title}</h3>
          </div>
          <p className="text-indigo-300 font-medium text-sm">{step.description}</p>
          <p className="text-slate-300 leading-relaxed mt-1">{step.detail}</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
          disabled={currentStep === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 text-white disabled:opacity-30 hover:bg-slate-600 transition"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        {/* Dot nav */}
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`w-2.5 h-2.5 rounded-full transition ${
                i === currentStep ? 'bg-indigo-400' : i < currentStep ? 'bg-green-500' : 'bg-slate-600'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
        >
          {isLast ? 'Finish' : 'Next'} <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
