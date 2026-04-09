import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { ModuleView } from './components/ModuleView';
import { ErrorBoundary } from './components/ErrorBoundary';
import { courseModules, CourseLevel } from './data/courseData';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap } from 'lucide-react';

export default function App() {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [activeLevel, setActiveLevel] = useState<CourseLevel>('beginner');

  const handleModuleComplete = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  const activeModule = activeModuleId 
    ? courseModules.find(m => m.id === activeModuleId) 
    : null;

  const filteredModules = courseModules.filter(m => m.level === activeLevel);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200">
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setActiveModuleId(null)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveModuleId(null);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Return to dashboard"
          >
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white mr-3 shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              FinTech<span className="text-blue-600">Foundations</span>
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
              <span className="text-slate-700 font-semibold text-sm">
                Progress: {completedModules.length} / {courseModules.length} Modules
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="py-12">
        <ErrorBoundary>
          <AnimatePresence mode="wait">
            {activeModule ? (
              <motion.div
                key="module-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ModuleView
                  module={activeModule}
                  onBack={() => setActiveModuleId(null)}
                  onComplete={handleModuleComplete}
                />
              </motion.div>
            ) : (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Dashboard
                  modules={filteredModules}
                  completedModules={completedModules}
                  onSelectModule={setActiveModuleId}
                  activeLevel={activeLevel}
                  onSelectLevel={setActiveLevel}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </ErrorBoundary>
      </main>
    </div>
  );
}
