import React, { Dispatch, SetStateAction } from 'react';
import FormLayout from '@/components/form-layout';
import Input from '@/components/ui/input';
import CustomSelect from '@/components/ui/select';
import { useFormContext } from 'react-hook-form';
import { CreateBusinessMemberOpportunityData } from '@/utils/schema';

interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const BodRole: React.FC<IProps> = ({ step, setStep }) => {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext<CreateBusinessMemberOpportunityData>();

  const handleContinue = async () => {
    try {
      const PreferredExperienceDescription = await trigger(
        'PreferredExperienceDescription'
      );

      if (PreferredExperienceDescription) {
        setStep(step + 1);
      } else {
        console.log(Object.keys(errors).length, errors);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormLayout
      title="Preferred experience"
      description={`What experience are you seeking in your new board member?`}
      handleNext={handleContinue}
      position="start"
      handleBack={() => setStep(step - 1)}
    >
      <textarea
        {...register('PreferredExperienceDescription')}
        rows={4}
        placeholder="Please describe preferred experience"
        className="resize-none border border-black-100 w-full rounded-md py-3 px-4 focus:border-black-400 outline-none mb-2"
      />
      <p className="text-h9 2xl:text-scaled-h9 text-blue-300 font-medium mb-2">
        {`Maximum 250 words description`}
      </p>
      {errors.PreferredExperienceDescription && (
        <span className=" text-red-400 text-xs mt-2 m-1">
          {errors.PreferredExperienceDescription.message}
        </span>
      )}
    </FormLayout>
  );
};

export default BodRole;
