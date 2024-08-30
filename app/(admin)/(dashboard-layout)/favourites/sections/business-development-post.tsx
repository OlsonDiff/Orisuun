'use client';

import BusinessDevelopmentCard from '@/components/cards/business-development-card';
import Chip from '@/components/ui/chip';
import AccountTree from '@/icons/account-tree';
import CalenderClock from '@/icons/calender-clock';
import Distance from '@/icons/cofounder/distance';
import Consultant from '@/icons/consultant';
import Eye from '@/icons/eye';
import Favourite from '@/icons/favourite';
import Handyman from '@/icons/handyman';
import { cn } from '@/utils/utils';
import Image from 'next/image';
import React, { useState } from 'react';

const BusinessDevelopmentPost = () => {
  const [selected, setSelected] = useState('');
  return (
    <div className="py-6 flex flex-col items-start">
      <div
        className={cn(
          'bg-[#F3F5F7] text-blue-200 p-1 flex items-center w-auto rounded-md mb-6'
        )}
      >
        <div
          className={cn(
            'px-4 py-1.5 text-h7 2xl:text-scaled-h7 cursor-pointer rounded-md',
            selected === 'all'
              ? 'text-blue-500 font-semibold bg-white'
              : 'text-blue-200 font-medium'
          )}
          onClick={() => setSelected('all')}
        >
          <p>All</p>
        </div>
        <div
          className={cn(
            'px-4 py-1.5 text-h7 2xl:text-scaled-h7 cursor-pointer rounded-md',
            selected === 'seeking'
              ? 'text-blue-500 font-semibold bg-white'
              : 'text-blue-200 font-medium'
          )}
          onClick={() => setSelected('seeking')}
        >
          <p>We Are Seeking</p>
        </div>
        <div
          className={cn(
            'px-4 py-1.5 text-h7 2xl:text-scaled-h7 cursor-pointer rounded-md',
            selected === 'facilitate'
              ? 'text-blue-500 font-semibold bg-white'
              : 'text-blue-200 font-medium'
          )}
          onClick={() => setSelected('facilitate')}
        >
          <p>We Can Facilitate</p>
        </div>
      </div>
      <div className="w-full grid grid-cols-12 gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <BusinessDevelopmentCard index={index} key={index} />
        ))}
      </div>
    </div>
  );
};

export default BusinessDevelopmentPost;
