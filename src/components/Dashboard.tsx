import React from 'react';
import { motion } from 'motion/react';
import { Module, CourseLevel } from '../data/courseData';
import { cn } from '../lib/utils';
import { CheckCircle2, Lock, Play } from 'lucide-react';

interface DashboardProps {
  modules: Module[];
  completedModules: string[];
  onSelectModule: (moduleId: string) => void;
  activeLevel: CourseLevel;
  onSelectLevel: (level: CourseLevel) => void;
}

export function Dashboard({ modules, completedModules, onSelectModule, activeLevel, onSelectLevel }: DashboardProps) {
  const levels: { id: CourseLevel; label: string }[] = [
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'expert', label: 'Expert' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
          Master Modern Finance
        </h1>
        <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">
          From the basics of digital currency to the architecture of high-frequency trading.
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="bg-slate-200 p-1 rounded-xl inline-flex">
          {levels.map(level => (
            <button
              key={level.id}
              onClick={() => onSelectLevel(level.id)}
              className={cn(
                "px-6 py-2.5 rounded-lg font-semibold text-sm transition-all",
                activeLevel === level.id 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => {
          const isCompleted = completedModules.includes(module.id);
          const isUnlocked = true; // Logic for unlocking can be added here

          return (
            <motion.div
              key={module.id}
              whileHover={isUnlocked ? { y: -4 } : {}}
              className={cn(
                "relative rounded-2xl p-6 cursor-pointer border transition-all",
                isUnlocked 
                  ? "bg-white border-slate-200 hover:border-blue-300 hover:shadow-lg shadow-sm" 
                  : "bg-slate-50 border-slate-200 opacity-75 cursor-not-allowed"
              )}
              onClick={() => isUnlocked && onSelectModule(module.id)}
            >
              <div className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center mb-5 text-white shadow-sm",
                module.color
              )}>
                <module.icon size={28} strokeWidth={2} />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2">{module.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{module.description}</p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                {isCompleted ? (
                  <span className="flex items-center text-emerald-600 font-semibold text-sm">
                    <CheckCircle2 className="w-4 h-4 mr-1.5" />
                    Completed
                  </span>
                ) : isUnlocked ? (
                  <span className="flex items-center text-blue-600 font-semibold text-sm group-hover:text-blue-700">
                    <Play className="w-4 h-4 mr-1.5" />
                    Start Module
                  </span>
                ) : (
                  <span className="flex items-center text-slate-400 font-semibold text-sm">
                    <Lock className="w-4 h-4 mr-1.5" />
                    Locked
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
