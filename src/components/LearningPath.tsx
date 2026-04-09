import React from 'react';
import { CheckCircle, Lock, Play } from 'lucide-react';
import type { Module } from '../data/courseData';

interface LearningPathProps {
  modules: Module[];
  completedModules: Set<string>;
  onSelect: (module: Module) => void;
  activeModuleId?: string;
}

const levelColors: Record<string, string> = {
  beginner: 'border-blue-500/40 bg-blue-500/5',
  intermediate: 'border-emerald-500/40 bg-emerald-500/5',
  expert: 'border-purple-500/40 bg-purple-500/5',
};

const levelLabels: Record<string, string> = {
  beginner: '🟦 Beginner',
  intermediate: '🟩 Intermediate',
  expert: '🟪 Expert',
};

export default function LearningPath({ modules, completedModules, onSelect, activeModuleId }: LearningPathProps) {
  const levels = ['beginner', 'intermediate', 'expert'] as const;

  return (
    <div className="flex flex-col gap-8">
      {levels.map((level) => {
        const levelModules = modules.filter((m) => m.level === level);
        return (
          <div key={level} className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
              {levelLabels[level]}
            </h3>
            <div className="flex flex-col gap-2">
              {levelModules.map((mod, idx) => {
                const isCompleted = completedModules.has(mod.id);
                const isActive = mod.id === activeModuleId;
                const isLocked = level === 'expert' && completedModules.size < 3;

                return (
                  <button
                    key={mod.id}
                    onClick={() => !isLocked && onSelect(mod)}
                    disabled={isLocked}
                    className={`relative flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                      isActive
                        ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10'
                        : levelColors[level]
                    } ${isLocked ? 'opacity-40 cursor-not-allowed' : 'hover:border-indigo-400 cursor-pointer'}`}
                  >
                    {/* Connector line */}
                    {idx < levelModules.length - 1 && (
                      <span className="absolute left-5 top-full w-0.5 h-2 bg-slate-700 z-10" />
                    )}

                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 ${mod.color}`}>
                      <mod.icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{mod.title}</p>
                      <p className="text-xs text-slate-400 truncate">{mod.estimatedMinutes}m · {mod.xpReward} XP</p>
                    </div>

                    <div className="shrink-0">
                      {isLocked ? (
                        <Lock className="w-4 h-4 text-slate-500" />
                      ) : isCompleted ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <Play className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
