import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import FormLayout from '@/components/form-layout';
import Input from '@/components/ui/input';
import { useForm, useFormContext } from 'react-hook-form';
import { CreateBusinessMemberOpportunityData, createBusinessMemberOpportunitySchema } from '@/utils/schema';
import CustomSelect from '@/components/ui/select';
import { stepCoFounderSchemas } from '@/utils/coFounderSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { apiEndpoint } from '@/utils/utils';

interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const BusinessDetails: React.FC<IProps> = ({ step, setStep }) => {
  const {
    register,
    formState: { errors },
    setValue,
    trigger,
    watch,
  } = useFormContext<CreateBusinessMemberOpportunityData>();
  const [locations, setLocations] = useState([])

  const handleContinue = async () => {
    try {
      const isValid = await trigger(); // Trigger validation for all fields
      const BusinessName = await trigger('BusinessName');
      const YearsInBusiness = await trigger('YearsInBusiness');
      const BusinessType = await trigger('BusinessType');
      const BusinessLocation = await trigger('BusinessLocation');
      const BusinessIndustry = await trigger('BusinessIndustry');
      const BusinessWebsite = await trigger('BusinessWebsite');
      const BusinessDescription = await trigger('BusinessDescription');

      if (
        BusinessName &&
        YearsInBusiness &&
        BusinessType &&
        BusinessLocation &&
        BusinessIndustry &&
        BusinessWebsite &&
        BusinessDescription
      ) {
        setStep(step + 1);
      } else {
        console.log(Object.keys(errors).length, errors);
      }
    } catch (error) {
      // const allData = methods.getValues();
      console.log('Errors:', errors);
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${apiEndpoint}/MyProfile/GetCountryList`, {
          headers: {
            XApiKey:
              'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
          },
        });
        if (res.status === 200) {
          const locations = res.data.Result;
          setLocations(locations.map((location) => ({
            label: location?.CountryName,
            value: (location?.Id).toString()
          })));
        }
      } catch (error) {
        console.error('Error fetching country list:', error);
      }
    })();
  }, []);


  console.log("errors ", errors, locations);


  return (
    <FormLayout
      title="Business Details"
      description={`Please tell us about your business`}
      handleNext={handleContinue}
      handleBack={() => setStep(step - 1)}
      position="start"
    >
      <Input
        {...register('BusinessName', { required: 'BusinessName is required' })}
        placeholder="Business name"
        error={errors.BusinessName ? errors.BusinessName.message : null}
        value={watch('BusinessName')}
      />
      <Input
        {...register('YearsInBusiness')}
        placeholder="Years in business"
        error={errors.YearsInBusiness ? errors.YearsInBusiness.message : null}
      />

      <Input
        {...register('BusinessType', { required: 'BusinessType is required k' })}
        placeholder="Business Type"
        error={errors.BusinessType ? errors.BusinessType.message : null}
      />
      <CustomSelect
        placeholder="Business Location"
        options={locations}
        onChange={async (selectedVal) => {
          setValue(
            'BusinessLocation',
            selectedVal.map((val) => ({
              id: val.value,
              value: val.label,
            }))
          );
          await trigger('BusinessLocation');
        }}
        value={watch('BusinessLocation')?.map((loc) => ({
          value: loc.id,
          label: loc.value,
        }))}
        error={errors.BusinessLocation && errors.BusinessLocation.message}
        isMulti
      />

      <Input
        {...register('BusinessIndustry', { required: 'BusinessIndustry is required' })}
        placeholder="Industry"
        error={errors.BusinessIndustry && errors.BusinessIndustry.message}
      />
      <Input
        {...register('BusinessWebsite')}
        placeholder="Website"
        error={errors.BusinessWebsite && errors.BusinessWebsite.message}
      />
      <Input
        {...register('BusinessDescription')}
        placeholder="Business description"
        error={errors.BusinessDescription && errors.BusinessDescription.message}
      />
    </FormLayout>
  );
};

export default BusinessDetails;
