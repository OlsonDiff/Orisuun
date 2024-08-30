import React, { Dispatch, SetStateAction } from 'react';
import FormLayout from '@/components/form-layout';
import Input from '@/components/ui/input';
import { useForm, useFormContext } from 'react-hook-form';
import { CreateBusinessMemberOpportunityData, createBusinessMemberOpportunitySchema } from '@/utils/schema';
import { stepCoFounderSchemas } from '@/utils/coFounderSchema';
import { zodResolver } from '@hookform/resolvers/zod';

interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const Contact: React.FC<IProps> = ({ step, setStep }) => {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext<CreateBusinessMemberOpportunityData>();

  const handleContinue = async () => {
    try {
      const ContactName = await trigger('ContactName');
      const ContactEmail = await trigger('ContactEmail');
      const ContactPhone = await trigger('ContactPhone');

      if (ContactName && ContactEmail && ContactPhone) {
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
      title="Contact"
      description={`Who should potential matches reach out to?`}
      handleNext={handleContinue}
      position="start"
      handleBack={() => setStep(step - 1)}
    >
      <Input
        {...register('ContactName', { required: 'ContactName is required' })}
        placeholder="Contact’s name"
        error={errors.ContactName && errors.ContactName.message}
      />
      <Input
        {...register('ContactEmail', { required: 'ContactEmail is required' })}
        placeholder="Contact’s email"
        error={errors.ContactEmail && errors.ContactEmail.message}
      />
      <Input
        {...register('ContactPhone', { required: 'ContactPhone is required' })}
        placeholder="Contact’s phone"
        error={errors.ContactPhone && errors.ContactPhone.message}
      />
    </FormLayout>
  );
};

export default Contact;
