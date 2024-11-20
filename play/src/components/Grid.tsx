import React from 'react';
import { cn } from '@bamboo/components';

export const Row = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn('p-4 grid grid-cols-3 gap-4 bg-white rounded', className)} ref={ref} {...props}>
        {props.children}
      </div>
    );
  },
);

export const Col = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>((props, ref) => {
  return (
    <div ref={ref} {...props}>
      {props.children}
    </div>
  );
});
