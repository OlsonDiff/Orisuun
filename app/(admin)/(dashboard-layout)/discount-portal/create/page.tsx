'use client';

import React, { useEffect, useState } from 'react';
import Close from '@/icons/close';
import CreateDiscountSteps from './_section/create-discount-steps';

const steps = [
  {
    name: 'Company Info',
    id: 0,
  },
  {
    name: 'Discount Info',
    id: 1,
  },
  {
    name: 'Expiry',
    id: 2,
  },
  {
    name: 'Number of discounts',
    id: 3,
  },
];

const Create = () => {
  const [step, setStep] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(Math.round(((step / steps.length) * 100 * 100) / 100));
  }, [step]);

  return (
    <>
      <div className="w-full md:hidden">
        <div className="relative flex items-center justify-between px-4 py-6 w-100 md:hidden">
          <p className="mx-auto font-semibold text-blue-600 text-h7 2xl:text-scaled-h7">
            {steps[step]?.name}
          </p>
          <Close className="absolute -translate-y-1/2 right-2 top-1/2" />
        </div>
        <div
          className={`relative z-10 h-1 overflow-hidden rounded-md bg-omblue-100 w-full`}
        >
          <div
            className={`absolute inset-0 z-10 h-1 bg-omblue-600 transition-all duration-300 ease-in-out`}
            style={{ width: `${width}%` }}
          ></div>
        </div>
      </div>

      <CreateDiscountSteps steps={steps} step={step} setStep={setStep} />
    </>
  );
};

export default Create;
