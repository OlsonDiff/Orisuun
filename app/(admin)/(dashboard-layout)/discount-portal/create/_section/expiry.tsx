'use client';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Toggle from '@/components/ui/toggle';
import { CreateCompnayInformationData } from '@/utils/schema';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const Expiry: React.FC<IProps> = ({ step, setStep }) => {
  const { register, formState: { errors }, setValue, trigger, watch } = useFormContext<CreateCompnayInformationData>();
  const [custom, setCustom] = useState(false);
  const [customDuration, setCustomDuration] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (custom && !customDuration.trim()) {
      setError('Please enter a custom duration.');
    } else {
      setError('');
      setStep(step + 1);
    }
  };

  return (
    <div className="grid grid-cols-8 md:gap-5 md:p-6 p-4 lg:min-h-[90vh]">
      <div className="my-4 col-span-8 md:mb-8 lg:col-span-4 md:mx-4 md:my-4">
        <h1 className="mb-6 font-medium text-blue-500 text-h1 md:text-h11 2xl:text-scaled-h11">
          Expiry
        </h1>
        <p className="text-h7 2xl:text-scaled-h7 font-medium text-[#58595A]">
          {`Let us know how long you'd like to consider this proposal.`}
        </p>
      </div>
      <div className="flex flex-col my-4 col-span-8 lg:col-span-4 md:mx-4 md:my-4">
        <div className="flex-grow">
          <div className="flex flex-col w-full mb-10 rounded-lg gap-10 md:py-6 lg:px-6">
            <div className="space-y-2">
              <label
                htmlFor="profile-pic"
                className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500"
              >
                Proposal duration
              </label>
              <p className="text-h10 2xl:text-scaled-h10 font-medium text-blue-300">
                Choose the duration of the proposal
              </p>
              <div className="flex items-center gap-2 mb-2">
                <Toggle
                  className="text-center"
                  value={'3 Months'}
                  onChange={() => setValue('ProposalDuration', 3)}
                  onClick={() => {
                    setCustom(false);
                    setCustomDuration('');
                  }}
                  checked={watch('ProposalDuration') === 3}

                >
                  3 Months
                </Toggle>
                <Toggle
                  className="text-center"
                  value={'6 Months'}
                  onChange={() => setValue('ProposalDuration', 6)}
                  onClick={() => {
                    setCustom(false);
                    setCustomDuration('');
                  }}
                  checked={watch('ProposalDuration') === 6}

                >
                  6 Months
                </Toggle>
                <Toggle
                  className="text-center"
                  value={0}
                  onChange={() => setValue('ProposalDuration', 0)}
                  // onChange={() => setValue('ProposalDuration', "Custom")}
                  onClick={() => setCustom(!custom)}
                  checked={watch('ProposalDuration') === 0}

                >
                  Custom
                </Toggle>
              </div>
              {custom && (
                <>
                  <Input
                    placeholder="Enter your duration"
                    value={customDuration}
                    type='number'
                    onChange={(e) => {
                      setValue('ProposalDuration', Number(e.target.value))
                      setCustomDuration(e.target.value)
                    }
                    }
                  />
                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse md:mx-4 md:mt-auto md:ml-auto md:flex-row">
          <Button
            className={
              'h9 text-omblue-500 bg-transparent font-semibold px-4 py-3 me-2 mb-2'
            }
            title="Cancel"
            onClick={() => setStep(step - 1)}
          />
          <Button
            className="custom_btn text-omblue-500 bg-[#E9EEF9] min-w-full mb-2 btn-secondary text-h9 2xl:text-scaled-h9 ms-1 w-full md:min-w-[170px]"
            title="Continue"
            onClick={handleContinue}
            disabled={custom && !customDuration.trim()}
          />
        </div>
      </div>
    </div>
  );
};

export default Expiry;
