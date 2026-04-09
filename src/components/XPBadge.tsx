import React from 'react';
import { Star } from 'lucide-react';

interface XPBadgeProps {
  xp: number;
  label?: string;
}

export default function XPBadge({ xp, label = 'XP' }: XPBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs font-bold px-2 py-0.5 rounded-full">
      <Star className="w-3 h-3" />
      +{xp} {label}
    </span>
  );
}
