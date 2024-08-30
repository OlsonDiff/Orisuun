import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import React, { Dispatch, SetStateAction } from 'react';
import { ContractCreateData } from '@/utils/schema';
import { useFormContext } from 'react-hook-form';

interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const Member: React.FC<IProps> = ({ step, setStep }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ContractCreateData>();

  return (
    <div className="grid grid-cols-8 gap-5 md:p-6 p-4 lg:min-h-[90vh]">
      <div className="my-4 col-span-8 md:mb-8 lg:col-span-4 md:mx-4">
        <h1 className="mb-6 font-medium text-blue-500 text-h1 md:text-h11 2xl:text-scaled-h11">
          Choose a Member
        </h1>
        <p className="text-h7 2xl:text-scaled-h7 font-medium text-[#58595A]">
          Please select a member. An invitation will be sent to the member once
          you complete this step. They will have the option to accept or reject
          your offer.
        </p>
      </div>
      <div className="flex flex-col my-4 col-span-8 lg:col-span-4 lg:col-start-5 md:mx-4">
        <div className="flex-grow">
          <div className="flex flex-col w-full mb-10 rounded-lg gap-2 md:py-6 lg:px-6">
            <h5 className="text-h5 2xl:text-scaled-h5 font-semibold text-black-500">
              Search Expert to this contract (Optional)
            </h5>
            <p className="text-blue-300 text-h7 2xl:text-scaled-h7 font-medium mb-2">
              Choose the duration of the contract
            </p>
            <Input
              {...register('CounterPartyName')}
              placeholder="Search by member name or username"
              error={errors.CounterPartyName?.message}
            />
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
            type="submit"
          />
        </div>
      </div>
    </div>
  );
};

export default Member;
