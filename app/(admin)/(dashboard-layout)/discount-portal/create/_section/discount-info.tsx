import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Toggle from '@/components/ui/toggle';
import { CreateCompnayInformationData } from '@/utils/schema';
import { useFormContext } from 'react-hook-form';
import React, { Dispatch, SetStateAction, useState } from 'react';
import Switch from '@/components/ui/switch';
// import { Switch } from '@headlessui/react';

interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const DiscountInformation: React.FC<IProps> = ({ step, setStep }) => {
  // const { register, formState: { errors }, setValue } = useFormContext();
  const { register, formState: { errors }, setValue, trigger, watch } = useFormContext<CreateCompnayInformationData>();

  const handleContinue = async () => {
    const isValid = await trigger(); // Trigger validation for all fields
    console.log('Validation Status:', isValid);
    console.log('Errors:', errors);

    const DiscountDescription = await trigger('DiscountDescription');
    const DiscountActivation = await trigger('DiscountActivation');
    const ActivationEligibility = await trigger('ActivationEligibility');

    if (DiscountDescription && DiscountActivation && ActivationEligibility) {
      setStep(step + 1); // Proceed to the next step if all fields are valid
    } else {
      console.log('Errors:', errors); // Log errors for debugging
    }
  };

  const handleActivationChange = (value: string) => {
    setValue('DiscountActivation', value);
  };

  const handleEligibilityChange = (value: string) => {
    setValue('ActiveDiscount', value);
  };
  const handlediscountTypeChange = (value: string) => {
    setValue('DiscountType', value);
  };

  console.log("errors ", errors);


  return (
    <div className="grid grid-cols-8 md:gap-5 md:p-6 p-4 lg:min-h-[90vh]">
      <div className="my-4 col-span-8 md:mb-8 lg:col-span-4 md:mx-4 md:my-4">
        <h1 className="mb-6 font-medium text-blue-500 text-h1 md:text-h11 2xl:text-scaled-h11">
          Discount Information
        </h1>
        <p className="text-h7 2xl:text-scaled-h7 font-medium text-[#58595A]">
          {`Please tell us about your proposal`}
        </p>
      </div>
      <div className="flex flex-col my-4 col-span-8 lg:col-span-4 md:mx-4 md:my-4">
        <div className="flex-grow">
          <div className="flex flex-col w-full mb-10 rounded-lg gap-10 md:py-6 lg:px-6">
            <div className="space-y-2">
              <label
                htmlFor="discountDescription"
                className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500"
              >
                Discount Details
              </label>
              <p className="text-h10 2xl:text-scaled-h10 font-medium text-blue-300">
                Please provide the details of your discount
              </p>
              <Input
                {...register('DiscountDescription')}
                placeholder="Discount type / description"
                error={errors.DiscountDescription ? errors.DiscountDescription?.message : null}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="discountActivation"
                className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500"
              >
                Discount activation
              </label>
              <p className="text-h10 2xl:text-scaled-h10 font-medium text-blue-300">
                Choose the best match option
              </p>
              <div className="flex items-center gap-2 mb-2">
                <Toggle
                  className="text-center"
                  value={'Online'}
                  onChange={() => handleActivationChange('Online')}
                  onClick={() => handleActivationChange('Online')}
                  checked={watch('DiscountActivation') === 'Online'}
                >
                  Online
                </Toggle>
                <Toggle
                  className="text-center"
                  value={'In store'}
                  onChange={() => handleActivationChange('In store')}
                  onClick={() => handleActivationChange('In store')}
                  checked={watch('DiscountActivation') === 'In store'}
                >
                  In store
                </Toggle>
                <Toggle
                  className="text-center"
                  value={'Both'}
                  onChange={() => handleActivationChange('Both')}
                  onClick={() => handleActivationChange('Both')}
                  checked={watch('DiscountActivation') === 'Both'}
                >
                  Both
                </Toggle>
              </div>
              {errors.DiscountActivation && (
                <p className="text-red-600 text-sm">
                  {errors.DiscountActivation.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="activationEligibility"
                className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500"
              >
                Who can activate discount?
              </label>
              <p className="text-h10 2xl:text-scaled-h10 font-medium text-blue-300">
                Choose the best match option
              </p>
              <div className="flex items-center gap-2 mb-2">
                <Toggle
                  className="text-center"
                  value={'New Customers'}
                  onChange={() => handleEligibilityChange('New Customers')}
                  onClick={() => handleEligibilityChange('New Customers')}
                  checked={watch('ActiveDiscount') === 'New Customers'}
                >
                  New Customers
                </Toggle>
                <Toggle
                  className="text-center"
                  value={'Existing Customers'}
                  onChange={() => handleEligibilityChange('Existing Customers')}
                  onClick={() => handleEligibilityChange('Existing Customers')}
                  checked={watch('ActiveDiscount') === 'Existing Customers'}
                >
                  Existing Customers
                </Toggle>
                <Toggle
                  className="text-center"
                  value={'Both'}
                  onChange={() => handleEligibilityChange('Both')}
                  onClick={() => handleEligibilityChange('Both')}
                  checked={watch('ActiveDiscount') === 'Both'}
                >
                  Both
                </Toggle>
              </div>
              {errors.DiscountActivation && (
                <p className="text-red-600 text-sm">
                  {errors.DiscountActivation.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="activationEligibility"
                className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500"
              >
                Discount type
              </label>
              <div className="flex items-center gap-2 mb-2">
                <Toggle
                  className="text-center"
                  value={'Partner discounts'}
                  onChange={() => handlediscountTypeChange('Partner discounts')}
                  onClick={() => handlediscountTypeChange('Partner discounts')}
                  checked={watch('DiscountType') === 'Partner discounts'}
                >
                  Partner discounts
                </Toggle>
                <Toggle
                  className="text-center"
                  value={'Member discounts'}
                  onChange={() => handlediscountTypeChange('Member discounts')}
                  onClick={() => handlediscountTypeChange('Member discounts')}
                  checked={watch('DiscountType') === 'Member discounts'}
                >
                  Member discounts
                </Toggle>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Switch
                  label="For startups"
                  isOn={watch('IsStartUps')}
                  onToggle={() => setValue('IsStartUps', !watch('IsStartUps'))}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse md:mx-4 md:mt-auto md:ml-auto md:flex-row">
          <Button
            className={
              'text-h9 2xl:text-scaled-h9 text-omblue-500 bg-transparent font-semibold px-4 py-3 me-2 mb-2'
            }
            title="Cancel"
            onClick={() => setStep(step - 1)}
          />
          <Button
            className="custom_btn text-omblue-500 bg-[#E9EEF9] min-w-full mb-2 btn-secondary text-h9 2xl:text-scaled-h9 ms-1 w-full md:min-w-[170px]"
            title="Continue"
            onClick={handleContinue}
          />
        </div>
      </div>
    </div>
  );
};

export default DiscountInformation;
