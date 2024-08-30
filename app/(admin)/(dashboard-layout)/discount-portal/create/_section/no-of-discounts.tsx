'use client';

import Button from '@/components/ui/button';
import Dropzone from '@/components/ui/dropzone';
import Input from '@/components/ui/input';
import Toggle from '@/components/ui/toggle';
import { CreateCompnayInformationData } from '@/utils/schema';
import React, { Dispatch, SetStateAction, useState } from 'react';
// import Dropzone from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  // onSubmit?: () => void;
}

const NoOfDiscounts: React.FC<IProps> = ({ step, setStep }) => {
  const { register, formState: { errors }, setValue, trigger, watch } = useFormContext<CreateCompnayInformationData>();
  const [custom, setCustom] = useState(false);
  const [customDiscount, setCustomDiscount] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (custom && customDiscount) {
      setError('Please enter a custom discount amount.');
    } else {
      setError('');
      setStep(step + 1);
    }
  };

  return (
    <div className="grid grid-cols-8 md:gap-5 md:p-6 p-4 lg:min-h-[90vh]">
      <div className="my-4 col-span-8 md:mb-8 lg:col-span-4 md:mx-4 md:my-4">
        <h1 className="mb-6 font-medium text-blue-500 text-h1 md:text-h11 2xl:text-scaled-h11">
          Number of discounts
        </h1>
        <p className="text-h7 2xl:text-scaled-h7 font-medium text-[#58595A]">
          {`Please inform us of the discount amount we can offer to our members.`}
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
                Number of discounts
              </label>
              <p className="text-h10 2xl:text-scaled-h10 font-medium text-blue-300">
                Choose the number
              </p>
              <div className="flex items-center gap-2 mb-2">
                <Toggle
                  className="text-center"
                  value={'10 Discounts'}
                  onChange={() => setValue('NumberOfDiscount', 10)}
                  onClick={() => {
                    setCustom(false);
                    setCustomDiscount('');
                  }}
                  checked={watch('NumberOfDiscount') === 10}

                >
                  10 Discounts
                </Toggle>
                <Toggle
                  className="text-center"
                  value={'25 Discounts'}
                  onChange={() => setValue('NumberOfDiscount', 25)}
                  onClick={() => {
                    setCustom(false);
                    setCustomDiscount('');
                  }}
                  checked={watch('NumberOfDiscount') === 25}

                >
                  25 Discounts
                </Toggle>
                <Toggle
                  className="text-center"
                  value={'50 Discounts'}
                  onChange={() => setValue('NumberOfDiscount', 50)}
                  onClick={() => {
                    setCustom(false);
                    setCustomDiscount('');
                  }}
                  checked={watch('NumberOfDiscount') === 50}

                >
                  50 Discounts
                </Toggle>
                <Toggle
                  className="text-center"
                  value={'100 Discounts'}
                  onChange={() => setValue('NumberOfDiscount', 100)}
                  onClick={() => {
                    setCustom(false);
                    setCustomDiscount('');
                  }}
                  checked={watch('NumberOfDiscount') === 100}

                >
                  100 Discounts
                </Toggle>
                <Toggle
                  className="text-center"
                  value={'Custom'}
                  // onChange={() => setValue('DiscountCode', "Custom")}
                  onClick={() => setCustom(!custom)}
                  checked={watch('NumberOfDiscount') === 0}

                >
                  Custom
                </Toggle>
              </div>
              {custom && (
                <>
                  <Input
                    // placeholder="Enter your custom discount amount"
                    // value={"NumberOfDiscount"}
                    // onChange={(e) => {
                    //   setValue('NumberOfDiscount', Number(e.target.value));
                    //   // setCustomDiscount(e.target.value)
                    // }}
                    type='number'
                    placeholder="Enter your custom discount amount"
                    {...register('NumberOfDiscount', { required: 'Enter your custom discount amount' })}
                    error={errors.NumberOfDiscount?.message}
                  />
                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}
                </>
              )}
              <Input
                placeholder="Enter your discount off"
                // value={customDiscount}
                type='number'
                // placeholder="NumberOfDiscount"
                {...register('DiscountOff', { required: 'Enter your custom discount amount' })}
                error={errors.DiscountOff?.message}
              />
              {/* <Input
                placeholder="Enter your custom discount amount"
                // value={customDiscount}
                type='file'
                onChange={(e) => {
                  console.log("e.target.files[0] ", e.target.files[0]);

                  setValue('DiscountCode', (e.target.files[0]));
                  setCustomDiscount(e.target.files[0].name);
                }}
                accept='xlsx'
              /> */}
              <Dropzone
                acceptedFileTypes="xlsx"
                maxSize={10 * 1024 * 1024}
                layout="normal"
                onFilesUpload={(file) => {
                  setValue('DiscountCode', file[0]);
                  trigger('DiscountCode');
                  console.log(file[0]?.name, file, typeof file[0], file[0])
                }
                }
                storedFile={watch('DiscountCode')}
                onChange={(file) => {
                  // console.log("file ", file);

                  // setValue('CompanyLogo', file);
                  trigger('DiscountCode');
                }}
                onFileRemove={() => {
                  setValue('DiscountCode', null);
                  trigger('DiscountCode');
                }}
              />
              {errors.DiscountCode?.message && (
                <p className="text-red-600 text-sm">
                  {errors.DiscountCode.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse md:mx-4 md:mt-auto md:ml-auto md:flex-row">
          <Button
            className={
              'h9 text-[#2357C6] bg-transparent font-semibold px-4 py-3 me-2 mb-2'
            }
            title="Cancel"
            onClick={() => setStep(step - 1)}
          />
          <Button
            className="custom_btn text-omblue-500 min-w-full bg-[#E9EEF9] mb-2 btn-secondary text-h9 2xl:text-scaled-h9 ms-1 w-full md:min-w-[170px]"
            title="Submit"
          // variant='secondary'
          // onClick={onSubmit}
          // disabled={custom}
          />
        </div>
      </div>
    </div>
  );
};

export default NoOfDiscounts;
