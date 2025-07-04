import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'slideUp' | 'slideLeft' | 'slideRight' | 'fadeIn' | 'scaleUp';
  delay?: number;
  duration?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animation = 'slideUp',
  delay = 0,
  duration = 600
}) => {
  const { elementRef, isVisible } = useScrollAnimation();

  const getAnimationClasses = () => {
    const baseClasses = `transition-all ease-out`;
    const durationClass = `duration-${duration}`;
    
    if (!isVisible) {
      switch (animation) {
        case 'slideUp':
          return `${baseClasses} ${durationClass} opacity-0 translate-y-8`;
        case 'slideLeft':
          return `${baseClasses} ${durationClass} opacity-0 -translate-x-8`;
        case 'slideRight':
          return `${baseClasses} ${durationClass} opacity-0 translate-x-8`;
        case 'fadeIn':
          return `${baseClasses} ${durationClass} opacity-0`;
        case 'scaleUp':
          return `${baseClasses} ${durationClass} opacity-0 scale-95`;
        default:
          return `${baseClasses} ${durationClass} opacity-0 translate-y-8`;
      }
    }

    return `${baseClasses} ${durationClass} opacity-100 translate-y-0 translate-x-0 scale-100`;
  };

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClasses()} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;