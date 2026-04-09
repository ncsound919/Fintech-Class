import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Module, LessonContent } from '../data/courseData';
import { Quiz } from './Quiz';
import { TradingGame } from './TradingGame';
import { CoinbaseSimulator } from './CoinbaseSimulator';
import { AlpacaSimulator } from './AlpacaSimulator';
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen, Gamepad2, PlayCircle } from 'lucide-react';
import Markdown from 'react-markdown';

interface ModuleViewProps {
  module: Module;
  onBack: () => void;
  onComplete: (moduleId: string) => void;
}

export function ModuleView({ module, onBack, onComplete }: ModuleViewProps) {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const currentLesson = module.lessons[currentLessonIndex];
  const isLastLesson = currentLessonIndex === module.lessons.length - 1;

  const handleNext = () => {
    if (!completedLessons.includes(currentLesson.id)) {
      setCompletedLessons([...completedLessons, currentLesson.id]);
    }

    if (isLastLesson) {
      onComplete(module.id);
      onBack();
    } else {
      setCurrentLessonIndex(prev => prev + 1);
    }
  };

  const handleQuizComplete = () => {
    handleNext();
  };

  const handleGameComplete = () => {
    handleNext();
  };

  const renderLessonIcon = (type: string) => {
    switch (type) {
      case 'text': return <BookOpen className="w-5 h-5" />;
      case 'quiz': return <CheckCircle2 className="w-5 h-5" />;
      case 'game': return <Gamepad2 className="w-5 h-5" />;
      case 'video': return <PlayCircle className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button 
        onClick={onBack}
        className="flex items-center text-slate-600 font-semibold hover:text-slate-900 mb-8 transition-colors bg-white border border-slate-200 px-4 py-2 rounded-lg w-fit shadow-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </button>

      <div className="flex items-center mb-10 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white mr-5 shadow-sm ${module.color}`}>
          <module.icon size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{module.title}</h2>
          <p className="text-slate-600 font-medium">{module.description}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex gap-1.5 mb-10">
        {module.lessons.map((lesson, idx) => (
          <div 
            key={lesson.id} 
            className={`h-2 flex-1 rounded-full transition-colors duration-500 ${
              idx < currentLessonIndex ? 'bg-emerald-500' :
              idx === currentLessonIndex ? 'bg-blue-600' : 'bg-slate-200'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentLesson.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6 flex items-center">
            <span className="flex items-center text-blue-700 font-semibold bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-md text-sm">
              {renderLessonIcon(currentLesson.type)}
              <span className="ml-2">{currentLesson.title}</span>
            </span>
          </div>

          {currentLesson.type === 'text' && (
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-slate-200">
              <div className="markdown-body">
                <Markdown>{currentLesson.content || ''}</Markdown>
              </div>
              
              <div className="mt-10 flex justify-end pt-6 border-t border-slate-100">
                <button
                  onClick={handleNext}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-sm transition-colors"
                >
                  {isLastLesson ? 'Complete Module' : 'Continue'}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {currentLesson.type === 'video' && (
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-slate-200 text-center">
              <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center mb-8 relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-blue-900/40 transition-colors"></div>
                <PlayCircle className="w-20 h-20 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all z-10" />
                <p className="absolute bottom-4 text-white/70 font-medium z-10 text-sm">Video Player Placeholder</p>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Watch the Lesson</h3>
              <p className="text-slate-600 mb-8">This is where the video content for this lesson would be embedded.</p>
              <button
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-sm transition-colors inline-flex items-center"
              >
                Mark as Watched <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          )}

          {currentLesson.type === 'quiz' && currentLesson.quiz && (
            <Quiz questions={currentLesson.quiz} onComplete={handleQuizComplete} />
          )}

          {currentLesson.type === 'game' && currentLesson.gameType === 'trading' && (
            <TradingGame onComplete={handleGameComplete} />
          )}
          
          {currentLesson.type === 'game' && currentLesson.gameType === 'coinbase' && (
            <CoinbaseSimulator onComplete={handleGameComplete} />
          )}

          {currentLesson.type === 'game' && currentLesson.gameType === 'alpaca' && (
            <AlpacaSimulator onComplete={handleGameComplete} />
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
