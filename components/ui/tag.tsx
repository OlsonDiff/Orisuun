import { cn } from '@/utils/utils';
import React from 'react';

const Tag = ({
  status,
  text,
}: {
  status: 'pending' | 'processing' | 'fulfilled';
  text: string;
}) => {
  return (
    <div
      className={cn(
        'text-h10 2xl:text-scaled-h10 font-semibold inline-flex rounded-md px-2 py-1 text-center',
        status === 'pending'
          ? 'text-warning-600 bg-warning-50'
          : status === 'processing'
          ? 'text-omblue-500 bg-omblue-50'
          : 'text-success-500 bg-success-50'
      )}
    >
      {text}
    </div>
  );
};

export default Tag;
