import React, { forwardRef } from 'react';
import { cn } from '@/utils/utils';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checkedColor?: string;
  uncheckedColor?: string;
  tickColor?: string;
  children?: React.ReactNode;
}

const Checkbox: React.ForwardRefRenderFunction<
  HTMLInputElement,
  CheckboxProps
> = (
  {
    checkedColor = 'bg-omblue-500',
    uncheckedColor = 'bg-white',
    tickColor = 'white',
    className,
    children,
    ...props
  },
  ref
) => {
  return (
    <label className="inline-flex items-center p-1 cursor-pointer">
      <div className="relative">
        <input ref={ref} type="checkbox" className="sr-only" {...props} />
        <div
          className={cn(
            'w-5 h-5 border-2 rounded transition-colors duration-200 ease-in-out',
            props.checked ? checkedColor : uncheckedColor,
            props.checked ? 'border-transparent' : 'border-gray-300',
            className
          )}
        >
          <svg
            className={cn(
              'w-full h-full',
              props.checked ? 'opacity-100' : 'opacity-0',
              'transition-opacity duration-200 ease-in-out'
            )}
            viewBox="0 0 24 24"
            fill="none"
            stroke={tickColor}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>
      <span className="ml-2">{children}</span>
    </label>
  );
};

export default forwardRef(Checkbox);
