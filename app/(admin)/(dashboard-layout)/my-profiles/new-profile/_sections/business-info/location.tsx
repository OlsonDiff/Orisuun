import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
// import { countries, states } from 'country-state-city';
import csc from 'countries-states-cities';
import CustomSelect from '@/components/ui/select';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ProfileBusinessFormData } from '@/utils/schema';
import FormLayout from '@/components/form-layout';

interface IProps {
  businessInfoStep: number;
  setBusinessInfoStep: Dispatch<SetStateAction<number>>;
}

const Location: React.FC<IProps> = ({
  businessInfoStep,
  setBusinessInfoStep,
}) => {
  const {
    register,
    formState: { errors },
    trigger,
    setValue,
    watch,
    getValues,
  } = useFormContext<ProfileBusinessFormData>();

  const [stateList, setStateList] = useState<
    { id: number; value: string; label: string }[]
  >([]);

  const [cityList, setCityList] = useState<
    { id: number; value: string; label: string }[]
  >([]);

  const stateValue = watch('State');
  const cityValue = watch('City');

  // Handle state selection
  const handleSelectChange = (
    name: keyof ProfileBusinessFormData,
    selectedOption: {
      id: number;
      value: string;
      label: string;
    }
  ) => {
    setValue(name, selectedOption.value);

    if (name === 'State') {
      const stateId = parseInt(selectedOption.value, 10);
      setValue('StateId', stateId); // Update the state ID in the form
      setCityList([]); // Reset the city list when a new state is selected
    }
  };

  const handleContinue = async () => {
    try {
      const addressline1 = await trigger('AddressLine1');
      const addressline2 = await trigger('AddressLine2');
      const city = await trigger('City');
      const state = await trigger('State');
      const country = await trigger('Country');
      const code = await trigger('Code');
      if (addressline1 && addressline2 && city && state && country && code) {
        setBusinessInfoStep(businessInfoStep + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchStates = async () => {
      const statesList = await csc.getStatesOfCountry(233);
      const formattedStateList = statesList.map((item) => ({
        id: item.id,
        value: item.id.toString(),
        label: item.name,
      }));
      setStateList(formattedStateList);
    };

    fetchStates();
  }, []);

  const stateId = watch('StateId');

  console.log(getValues(), errors);

  // Fetch cities when a state is selected
  useEffect(() => {
    const fetchCities = async () => {
      if (stateId) {
        const citiesList = await csc.getCitiesOfState(stateId);
        const formattedCityList = citiesList.map((city) => ({
          id: city.id,
          value: city.name,
          label: city.name,
        }));
        setCityList(formattedCityList);
      } else {
        setCityList([]);
      }
    };

    fetchCities();
  }, [stateId]);

  return (
    <FormLayout
      title="Business Information"
      description="Please provide your business's address (headquarters)"
      position="start"
      variant="equal"
      handleNext={handleContinue}
    >
      <div className="flex flex-col w-full mb-10 rounded-lg gap-6 md:py-6 lg:px-6">
        <div className="space-y-4">
          <label className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500">
            Location <span className="text-danger-500">*</span>
          </label>
          <Input
            placeholder="Address line 1 *"
            {...register('AddressLine1')}
            error={errors.AddressLine1?.message}
          />
          <Input
            placeholder="Address line 2 *"
            {...register('AddressLine2')}
            error={errors.AddressLine2?.message}
          />
          <Input
            placeholder="Country"
            {...register('Country')}
            error={errors.Country?.message}
          />
          <CustomSelect
            placeholder="State"
            options={stateList}
            onChange={async (val) => {
              handleSelectChange('State', val);
              setValue('StateId', val.id);
              await trigger('State');
              await trigger('StateId');
            }}
            error={errors.State?.message || errors.StateId?.message}
            value={stateList.find((option) => option.value === stateValue)}
          />
          <CustomSelect
            placeholder="City"
            options={cityList}
            onChange={async (val) => {
              handleSelectChange('City', val);
              setValue('CityId', val.id);
              await trigger('City');
              await trigger('CityId');
            }}
            error={errors.City?.message || errors.CityId?.message}
            value={cityList.find((option) => option.value === cityValue)}
          />
          <Input
            placeholder="Relevant code"
            {...register('Code')}
            error={errors.Code?.message}
          />
        </div>
      </div>
    </FormLayout>
  );
};

export default Location;
