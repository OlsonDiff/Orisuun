import React, { Dispatch, SetStateAction } from 'react';
import FormLayout from '@/components/form-layout';
import Toggle from '@/components/ui/toggle';
import Input from '@/components/ui/input';
import { useForm, useFormContext } from 'react-hook-form';
import { CreateBusinessMemberOpportunityData, createBusinessMemberOpportunitySchema } from '@/utils/schema';
import { stepCoFounderSchemas } from '@/utils/coFounderSchema';
import { zodResolver } from '@hookform/resolvers/zod';

interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const DurationDetails: React.FC<IProps> = ({ step, setStep }) => {
  const {
    register,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext<CreateBusinessMemberOpportunityData>();
  const currentSchema = stepCoFounderSchemas[0] || createBusinessMemberOpportunitySchema;
  const methods = useForm({
    resolver: zodResolver(currentSchema), // Apply the schema for the current step
    defaultValues: {
      BusinessName: "",
      // YearsInBusiness: "",
      BusinessType: "",
      BusinessLocation: "",
      BusinessIndustry: "",
      BusinessWebsite: "",
      BusinessDescription: "",
      ContactName: "",
      ContactEmail: "",
      ContactPhone: "",
      RoleSought: "",
      RoleDescription: "",
      PostDuration: "3",
      InvestmentRequired: true,
      PreferredExperience: "",
      MatchType: "",
      PostTitle: "",
      DurationDescription: "",
      PreferredExperienceDescription: "",
      Tags: null,
    },
  });
  return (
    <FormLayout
      title="Post details"
      description="Please fill in title and choose the duration of the post"
      nextButtonType="submit"
      position="start"
      isSubmit={true}
      handleBack={() => setStep(step - 1)}
    >
      <div className="space-y-2">
        <h5 className="sm:h5 xl:text-scaled-h5 font-semibold text-blue-500">
          Post title
        </h5>
        <p className="sm:h9 xl:text-scaled-h9 text-blue-300 font-medium mb-2">
          {`Please enter post title`}
        </p>
        <Input
          {...register('PostTitle')}
          placeholder="Post title"
          error={errors.PostTitle && errors.PostTitle.message}
        />
      </div>
      <div className="space-y-2">
        <h5 className="sm:h5 xl:text-scaled-h5 font-semibold text-blue-500">
          Post duration
        </h5>
        <p className="sm:h9 xl:text-scaled-h9 text-blue-300 font-medium mb-2">
          {`Choose the duration of the post`}
        </p>
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
      </div>
    </FormLayout>
  );
};

export default DurationDetails;
