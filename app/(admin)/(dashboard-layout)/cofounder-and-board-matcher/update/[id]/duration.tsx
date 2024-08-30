import React, { Dispatch, SetStateAction } from 'react';
import FormLayout from '@/components/form-layout';
import Toggle from '@/components/ui/toggle';
import { useForm, useFormContext } from 'react-hook-form';
import { CreateBusinessMemberOpportunityData, createBusinessMemberOpportunitySchema } from '@/utils/schema';
import { stepCoFounderSchemas } from '@/utils/coFounderSchema';
import { zodResolver } from '@hookform/resolvers/zod';

interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  onSubmit?: any
}

const Duration: React.FC<IProps> = ({ step, setStep, onSubmit }) => {
  const {
    setValue,
    formState: { errors },
    watch,
  } = useFormContext<CreateBusinessMemberOpportunityData>();
  // const currentSchema = stepCoFounderSchemas[0] || createBusinessMemberOpportunitySchema;
  // const methods = useForm({
  //   resolver: zodResolver(currentSchema), // Apply the schema for the current step
  //   defaultValues: {
  //     BusinessName: "",
  //     YearsInBusiness: "",
  //     BusinessType: "",
  //     BusinessLocation: "",
  //     BusinessIndustry: "",
  //     BusinessWebsite: "",
  //     BusinessDescription: "",
  //     ContactName: "",
  //     ContactEmail: "",
  //     ContactPhone: "",
  //     RoleSought: "",
  //     RoleDescription: "",
  //     PostDuration: "3",
  //     InvestmentRequired: null,
  //     PreferredExperience: "",
  //     MatchType: "",
  //     PostTitle: "",
  //     DurationDescription: "",
  //     PreferredExperienceDescription: "",
  //     Tags: null,
  //   },
  // });
  return (
    <FormLayout
      title="Choose the duration of the post"
      nextButtonType="submit"
      position="start"
      isSubmit={true}
      handleNext={onSubmit}
      handleBack={() => setStep(step - 1)}
    >
      <div className="flex items-center gap-4">
        <Toggle
          className="text-center"
          value={'3'}
          onChange={(e) => {
            setValue('PostDuration', e.target.value);
          }}
          checked={watch('PostDuration') === '3'}
        >
          3 months
        </Toggle>
        <Toggle
          className="text-center"
          value={'6'}
          onChange={(e) => {
            setValue('PostDuration', e.target.value);
          }}
          checked={watch('PostDuration') === '6'}
        >
          6 months
        </Toggle>
      </div>
      {errors.PostDuration && (
        <span className="text-danger-500 text-xs mt-2 m-1">
          {errors.PostDuration.message as string}
        </span>
      )}
    </FormLayout>
  );
};

export default Duration;
