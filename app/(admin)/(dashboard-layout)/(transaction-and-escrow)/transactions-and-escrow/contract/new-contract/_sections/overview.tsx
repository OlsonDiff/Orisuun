import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import React, { Dispatch, SetStateAction } from 'react';
import { ContractCreateData } from '@/utils/schema';
import { useFormContext } from 'react-hook-form';
import Dropzone from '@/components/ui/dropzone';

interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const Overview: React.FC<IProps> = ({ step, setStep }) => {
  const {
    register,
    formState: { errors },
    trigger,
    setValue,
    watch,
    getValues,
  } = useFormContext<ContractCreateData>();

  const handleContinue = async () => {
    try {
      const TitleValid = await trigger('Title');
      const DescriptionValid = await trigger('Description');

      if (TitleValid && DescriptionValid) {
        setStep(step + 1);
      } else {
        console.log(Object.keys(errors).length, errors);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-8 gap-5 md:p-6 p-4 lg:min-h-[90vh]">
      <div className="my-4 col-span-8 md:mb-8 lg:col-span-4 md:mx-4">
        <h1 className="mb-6 font-medium text-blue-500 text-h1 md:text-h11 2xl:text-scaled-h11">
          Project Overview
        </h1>
        <p className="text-h7 2xl:text-scaled-h7 font-medium text-[#58595A]">
          Please tell us about this transaction
        </p>
      </div>
      <div className="flex flex-col my-4 col-span-8 lg:col-span-4 lg:col-start-5 md:mx-4">
        <div className="flex-grow">
          <div className="flex flex-col w-full mb-10 rounded-lg gap-2 md:py-6 lg:px-6">
            <h5 className="text-h5 2xl:text-scaled-h5 font-semibold text-black-500">
              Title
            </h5>
            <p className="text-blue-300 text-h7 2xl:text-scaled-h7 font-medium mb-2">
              Please provide the details of your contract
            </p>
            <Input
              placeholder="Headline description of work"
              {...register('Title')}
              error={errors.Title?.message}
            />
            <textarea
              rows={4}
              placeholder="Detailed description of work"
              className="resize-none border border-black-100 w-full rounded-md py-3 px-4 focus:border-black-400 outline-none mb-2"
              {...register('Description')}
            />
            {errors.Description && (
              <p className="text-red-500 text-xs ">
                {errors.Description.message}
              </p>
            )}
            <h5 className="text-h9 2xl:text-scaled-h9 font-semibold">
              Add attachment (Optional)
            </h5>
            <Dropzone />
          </div>
        </div>
        <div className="flex flex-col-reverse md:mx-4 md:mt-auto md:ml-auto md:flex-row">
          <Button
            className={
              'text-h9 2xl:text-scaled-h9 text-omblue-500 bg-transparent font-semibold px-4 py-3 me-2 mb-2'
            }
            title="Back"
            onClick={() => setStep(step - 1)}
          />
          <Button
            className="min-w-full mb-2 btn-secondary text-h9 2xl:text-scaled-h9 ms-1 w-full md:min-w-[170px]"
            title="Continue"
            onClick={handleContinue}
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
