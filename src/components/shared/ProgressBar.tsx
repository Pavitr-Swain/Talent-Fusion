import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  className,
  barClassName,
  showLabel = false,
  size = 'md',
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const getColorClass = (pct: number) => {
    if (pct >= 80) return 'bg-success';
    if (pct >= 50) return 'bg-primary';
    if (pct >= 25) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <div className={cn("w-full", className)}>
      <div className={cn(
        "w-full overflow-hidden rounded-full bg-muted",
        sizeClasses[size]
      )}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-out animate-progress",
            barClassName || getColorClass(percentage)
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
