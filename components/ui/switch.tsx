import { cn } from '@/utils/utils';
import React from 'react';

interface SwitchProps {
  label: string;
  isOn: boolean;
  onToggle: () => void;
}

const Switch: React.FC<SwitchProps> = ({ label, isOn, onToggle }) => {
  return (
    <div className="w-full flex items-center justify-between py-2">
      <span className="w-[calc(100%-5rem)] text-h9 2xl:text-scaled-h9 font-semibold text-blue-500">
        {label}
      </span>
      <button
        onClick={onToggle}
        className={cn(
          'relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ring-0',
          'h-[1.75rem] w-[3.25rem] text-h9 2xl:text-scaled-h9',
          isOn ? 'text-blue-500 bg-blue-50' : 'bg-[#E9EEF9]'
        )}
      >
        <span
          className={cn(
            'inline-block rounded-full transition duration-200 ease-in-out',
            'h-[1em] w-[1em]',
            isOn
              ? 'translate-x-[1.75rem] bg-blue-500'
              : 'translate-x-[0.25rem] bg-white'
          )}
        />
        <span
          className={cn(
            'absolute font-medium',
            'text-[0.625em]',
            isOn
              ? 'text-blue-500 left-[0.5rem]'
              : 'text-blue-100 right-[0.5rem]'
          )}
        >
          {isOn ? 'ON' : 'OFF'}
        </span>
      </button>
    </div>
  );
};

export default Switch;
