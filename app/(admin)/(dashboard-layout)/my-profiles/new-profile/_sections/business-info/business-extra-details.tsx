'use client';
import FormLayout from '@/components/form-layout';
import Button from '@/components/ui/button';
import DatePicker from '@/components/ui/date-picker';
import Input from '@/components/ui/input';
import CustomTimePicker from '@/components/ui/picker';
import CustomSelect from '@/components/ui/select';
import { ethnicityOptions } from '@/utils/constants';
import { ProfileBusinessFormData } from '@/utils/schema';
import { cn } from '@/utils/utils';
import { format } from 'date-fns';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface IProps {
  businessInfoStep: number;
  setBusinessInfoStep: Dispatch<SetStateAction<number>>;
}

const employeeOptions = [
  { value: '1-10', label: '1-10' },
  { value: '11-50', label: '11-50' },
  { value: '51-100', label: '51-100' },
  { value: '101-500', label: '101-500' },
  { value: '501-1000', label: '501-1000' },
  { value: '1001-5000', label: '1001-5000' },
  { value: '5001-10000', label: '5001-10000' },
  { value: '10001+', label: '10001+' },
];

const ownershipOptions = [
  { value: '0%', label: '0%' },
  { value: '1-10%', label: '1-10%' },
  { value: '11-30%', label: '11-30%' },
  { value: '31-50%', label: '31-50%' },
  { value: '51-70%', label: '51-70%' },
  { value: '91-99%', label: '91-99%' },
  { value: '100%', label: '100%' },
];

const BusinessExtraDetails: React.FC<IProps> = ({
  businessInfoStep,
  setBusinessInfoStep,
}) => {
  const {
    control,
    register,
    formState: { errors },
    setValue,
    trigger,
    watch,
  } = useFormContext<ProfileBusinessFormData>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleContinue = async () => {
    try {
      const isValidWebsite = await trigger('Website');
      const noOfEmployees = await trigger('noOfEmployees');
      const emailQueries = await trigger('emailQueries');
      const emailBusinessDevelopment = await trigger(
        'emailBusinessDevelopment'
      );
      const blackOwnershipPercentage = await trigger(
        'blackOwnershipPercentage'
      );
      const ethinicityBlackOwnership = await trigger(
        'ethinicityBlackOwnership'
      );
      const languages = await trigger('languages');
      const inBusinessSince = await trigger('inBusinessSince');
      const businessType = await trigger('businessType');
      const hours = await trigger('hours');
      if (
        isValidWebsite &&
        noOfEmployees &&
        emailQueries &&
        emailBusinessDevelopment &&
        blackOwnershipPercentage &&
        ethinicityBlackOwnership &&
        languages &&
        inBusinessSince &&
        businessType &&
        hours
      ) {
        setBusinessInfoStep(businessInfoStep + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setValue('inBusinessSince', format(selectedDate, 'dd/MM/yyyy'));
  }, [selectedDate, setValue]);

  return (
    <FormLayout
      title="Business Information"
      description="Please provide your business's address (headquarters)"
      position="start"
      variant="equal"
      handleNext={handleContinue}
      showBack={true}
      handleBack={() => setBusinessInfoStep(businessInfoStep - 1)}
    >
      <div className="flex flex-col w-full mb-10 rounded-lg gap-6 md:py-6 lg:px-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500">
              Website
            </label>
            <Input
              placeholder="Website url e.g. https://companyname.com"
              error={errors.Website?.message}
              {...register('Website')}
            />
          </div>
          <div className="space-y-2">
            <label className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500">
              No. Of Employees <span className="text-danger-500">*</span>
            </label>
            <CustomSelect
              placeholder="Select number of employees"
              options={employeeOptions}
              onChange={async (val) => {
                setValue('noOfEmployees', val.value);
                await trigger('noOfEmployees');
              }}
              error={errors.noOfEmployees?.message}
              value={employeeOptions.find(
                (option) => option.value === watch('noOfEmployees')
              )}
            />
          </div>
          <div className="space-y-2">
            <label className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500">
              Email - Queries <span className="text-danger-500">*</span>
            </label>
            <Input
              placeholder="Enter email"
              error={errors.emailQueries?.message}
              {...register('emailQueries')}
            />
          </div>
          <div className="space-y-2">
            <label className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500">
              Email - Business Development{' '}
            </label>
            <Input
              placeholder="Enter email"
              error={errors.emailBusinessDevelopment?.message}
              {...register('emailBusinessDevelopment')}
            />
          </div>
          <div className="space-y-2">
            <label className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500">
              Black Ownership Percentage{' '}
              <span className="text-danger-500">*</span>
            </label>
            <CustomSelect
              placeholder="Select Ownership Percentage"
              options={ownershipOptions}
              onChange={async (val) => {
                setValue('blackOwnershipPercentage', val.value);
                await trigger('blackOwnershipPercentage');
              }}
              error={errors.blackOwnershipPercentage?.message}
              value={ownershipOptions.find(
                (option) => option.value === watch('blackOwnershipPercentage')
              )}
            />
          </div>
          {watch('blackOwnershipPercentage') !== '0%' ? (
            <div className="space-y-2">
              <label className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500">
                Ethnicity of Black Ownership{' '}
                <span className="text-danger-500">*</span>
              </label>
              <CustomSelect
                placeholder="Select Ethnicity of Black Ownership"
                options={ethnicityOptions}
                onChange={async (val) => {
                  setValue('ethinicityBlackOwnership', val.value);
                  await trigger('ethinicityBlackOwnership');
                }}
                error={errors.ethinicityBlackOwnership?.message}
                value={ownershipOptions.find(
                  (option) => option.value === watch('ethinicityBlackOwnership')
                )}
              />
            </div>
          ) : null}
          <div className="space-y-2">
            <div className="flex items-center border border-black-200 rounded-md">
              <button
                className={cn(
                  'text-h9 2xl:text-scaled-h9 w-1/2 text-center p-3 rounded-tl-md rounded-bl-md',
                  watch('isPrivate')
                    ? 'text-black-200 font-medium'
                    : 'text-black-500 font-semibold bg-black-50 border-r border-blue-200'
                )}
                onClick={() => setValue('isPrivate', false)}
              >
                Public
              </button>
              <button
                className={cn(
                  'text-h9 2xl:text-scaled-h9 w-1/2 text-center p-3 rounded-tr-md rounded-br-md',
                  !watch('isPrivate')
                    ? 'text-black-200 font-medium'
                    : 'text-black-500 font-semibold bg-black-50 border-l border-blue-200'
                )}
                onClick={() => setValue('isPrivate', true)}
              >
                Private
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500">
              Languages <span className="text-danger-500">*</span>
            </label>
            <Input
              placeholder="Select Languages"
              error={errors.languages?.message}
              {...register('languages')}
            />
          </div>
          <div className="space-y-2">
            <label className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500">
              Phone Number
            </label>
            <Input
              placeholder="Select Phone Number"
              error={errors.phoneNo?.message}
              {...register('phoneNo')}
            />
          </div>
          <div className="space-y-2">
            <label className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500">
              Hours
            </label>
            <CustomTimePicker<ProfileBusinessFormData>
              name="hours"
              control={control}
              label="Hours"
            />
          </div>
          <div className="space-y-2">
            <label className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500">
              Business Type <span className="text-danger-500">*</span>
            </label>
            <Input
              placeholder="Enter business type"
              error={errors.businessType?.message}
              {...register('businessType')}
            />
          </div>

          <div className="space-y-2">
            <label className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500">
              In Business Since
            </label>

            <DatePicker
              onChange={setSelectedDate}
              value={selectedDate}
              format="yyyy-MM-dd"
            />
          </div>
        </div>
      </div>
    </FormLayout>
  );
};

export default BusinessExtraDetails;
