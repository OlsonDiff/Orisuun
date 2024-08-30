'use client';

import Close from '@/icons/close';
import React, { useEffect, useState } from 'react';
import NewContractSteps from './_sections/new-contract-steps';
const steps = [
  {
    name: 'Project Overview',
    id: 0,
  },
  {
    name: 'Budget',
    id: 1,
  },
  {
    name: 'Expiry',
    id: 2,
  },
  {
    name: 'Counterparty',
    id: 3,
  },
];

const NewContract = () => {
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
            {steps[step - 1]?.name || 'Verification'}
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

      <NewContractSteps steps={steps} step={step} setStep={setStep} />
    </>
  );
};

export default NewContract;
