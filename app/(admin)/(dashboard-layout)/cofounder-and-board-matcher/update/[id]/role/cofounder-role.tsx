import React, { Dispatch, SetStateAction } from 'react';
import FormLayout from '@/components/form-layout';
import CustomSelect from '@/components/ui/select';
import { useFormContext } from 'react-hook-form';
import { CreateBusinessMemberOpportunityData } from '@/utils/schema';
import Toggle from '@/components/ui/toggle';

interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const rolesOptions = [
  { label: 'Cofounder', value: 'cofounder' },
  { label: 'Board of directors', value: 'bod' },
];

const CofounderRole: React.FC<IProps> = ({ step, setStep }) => {
  const {
    register,
    setValue,
    formState: { errors },
    watch,
    trigger,
  } = useFormContext<CreateBusinessMemberOpportunityData>();

  const handleContinue = async () => {
    try {
      const RoleSought = await trigger('RoleSought');
      const RoleDescription = await trigger('RoleDescription');
      const PreferredExperience = await trigger('PreferredExperience');

      if (RoleSought && RoleDescription && PreferredExperience) {
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
      title="Role Sought"
      description={`Please describe the role`}
      handleNext={handleContinue}
      position="start"
      handleBack={() => setStep(step - 1)}
    >
      <CustomSelect
        placeholder="Role Sought"
        options={rolesOptions}
        onChange={async (val) => {
          setValue('RoleSought', val.value);
          await trigger('RoleSought');
        }}
        error={errors.RoleSought?.message}
        value={rolesOptions.find(
          (rolesOption) => rolesOption.value === watch('RoleSought')
        )}
      />
      <div className="block">
        <textarea
          {...register('RoleDescription')}
          rows={4}
          placeholder="Please describe the role"
          className="resize-none border mb-0 border-black-100 w-full rounded-md py-3 px-4 focus:border-black-400 outline-none"
        />
        <p className="text-h9 2xl:text-scaled-h9 text-blue-300 font-medium mb-2">
          {`Maximum 250 words description`}
        </p>
      </div>
      <p>Is an investment required to become co-founder?</p>
      <div className="flex items-center gap-4">
        <Toggle
          className="text-center"
          value={'Yes'}
          onClick={(e) => {
            setValue('InvestmentRequired', true);
          }}
          checked={watch('InvestmentRequired') === true}
        >
          Yes
        </Toggle>
        <Toggle
          className="text-center"
          value={'No'}
          onClick={(e) => {
            setValue('InvestmentRequired', false);
          }}
          checked={watch('InvestmentRequired') === false}
        >
          No
        </Toggle>
      </div>
      <textarea
        {...register('PreferredExperience')}
        rows={4}
        placeholder="Please describe preferred experience"
        className="resize-none border mb-0 border-black-100 w-full rounded-md py-3 px-4 focus:border-black-400 outline-none"
      />
      <p className="text-h9 2xl:text-scaled-h9 text-blue-300 font-medium mb-2">
        {`Maximum 250 words description`}
      </p>
    </FormLayout>
  );
};

export default CofounderRole;
