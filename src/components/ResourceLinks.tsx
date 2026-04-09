import React from 'react';
import { ExternalLink, BookOpen, CreditCard, Wrench, FileText } from 'lucide-react';
import type { ResourceLink } from '../data/courseData';

interface ResourceLinksProps {
  resources: ResourceLink[];
  moduleTitle: string;
}

export function ResourceLinks({ resources, moduleTitle }: ResourceLinksProps) {
  if (!resources || resources.length === 0) {
    return null;
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'account':
        return <CreditCard className="w-5 h-5" />;
      case 'literacy':
        return <BookOpen className="w-5 h-5" />;
      case 'tool':
        return <Wrench className="w-5 h-5" />;
      case 'resource':
        return <FileText className="w-5 h-5" />;
      default:
        return <ExternalLink className="w-5 h-5" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'account':
        return 'Create Account';
      case 'literacy':
        return 'Learn More';
      case 'tool':
        return 'Tool';
      case 'resource':
        return 'Documentation';
      default:
        return 'Resource';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'account':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'literacy':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'tool':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'resource':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border border-slate-200 shadow-sm mt-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
          <ExternalLink className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Continue Your Journey</h3>
          <p className="text-slate-600 text-sm">Helpful resources related to {moduleTitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource, index) => (
          <a
            key={index}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-xl p-5 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className={`p-2 rounded-lg ${getCategoryColor(resource.category)}`}>
                  {getCategoryIcon(resource.category)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {resource.title}
                  </h4>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                </div>
                <p className="text-sm text-slate-600 mb-3 line-clamp-2">{resource.description}</p>
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md border ${getCategoryColor(resource.category)}`}>
                  {getCategoryLabel(resource.category)}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-sm text-slate-700">
          <span className="font-semibold text-blue-900">💡 Pro Tip:</span> These resources are carefully selected to enhance your learning.
          Account links let you practice what you've learned with real platforms (many offer free trials or sandbox modes).
        </p>
      </div>
    </div>
  );
}
