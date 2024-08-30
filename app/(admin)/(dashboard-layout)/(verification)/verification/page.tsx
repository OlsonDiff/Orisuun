'use client';

import React, { useEffect, useState } from 'react';
import VerificationSteps from './_section/verification-steps';
import VerificationStart from './_section/verification-start';
import Close from '@/icons/close';

const steps = [
  {
    name: 'Online Presence',
    id: 1,
  },
  {
    name: 'Identification',
    id: 2,
  },
  {
    name: 'Business Documents',
    id: 3,
  },
  {
    name: 'Profile Statement Documents',
    id: 4,
  },
  {
    name: 'Statement',
    id: 5,
  },
  {
    name: 'Verification',
    id: 6,
  },
];

const VerificationPage = () => {
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
        ``
        <div
          className={`relative z-10 h-1 overflow-hidden rounded-md bg-omblue-100 w-full`}
        >
          <div
            className={`absolute inset-0 z-10 h-1 bg-omblue-600 transition-all duration-300 ease-in-out`}
            style={{ width: `${width}%` }}
          ></div>
        </div>
      </div>
      {step === 0 ? (
        <VerificationStart step={step} setStep={setStep} />
      ) : (
        <VerificationSteps steps={steps} step={step} setStep={setStep} />
      )}
    </>
  );
};

export default VerificationPage;
