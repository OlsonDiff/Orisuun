'use client';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Add from '@/icons/add';
import SearchIcon from '@/icons/sidebar/search-icon';
import { apiEndpoint, cn } from '@/utils/utils';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { RootState } from '@/data/store';
import { useDispatch, useSelector } from 'react-redux';
import { useFormContext } from 'react-hook-form';
import { getSearchLocations } from '@/server-actions/businessDevelopment';
import { z } from 'zod';
import FormLayout from '@/components/form-layout';
import { BusinessOpportunitiesData } from '@/utils/schema';
import axios from 'axios';
import { toast } from 'react-toastify';

interface IProps {
  setServiceStep: Dispatch<SetStateAction<number>>;
  setStep: Dispatch<SetStateAction<number>>;
  locationsData?: any
  BdId?: any
}

interface Location {
  Id: number;
  Name: string;
  Type?: string;
  CountryName?: string;
  CityName?: string;
  StateName?: string;

}

const schema = z.object({
  RegionId: z.string(),
  countryList: z.array(
    z.object({
      id: z.string(),
      value: z.string(),
    })
  ),
  stateList: z.array(
    z.object({
      id: z.string(),
      value: z.string(),
    })
  ),
  cityList: z.array(
    z.object({
      id: z.string(),
      value: z.string(),
    })
  ),
});

type FormData = z.infer<typeof schema>;

const options = [{ type: 'Country' }, { type: 'State' }, { type: 'City' }];

const Countries: React.FC<IProps> = ({ setStep, setServiceStep, locationsData, BdId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('Country');
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false)
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const {
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useFormContext<BusinessOpportunitiesData>();

  const searchLocations = React.useCallback(async (term: string, selectedType: string) => {
    try {

      let allResults = [];

      if (term === "") {
        setSearchResults(allResults)
        return
      }
      const response = await getSearchLocations(term);
      if (response.success) {
        if (selectedType === "Country") {
          allResults = [...response.data.CountriesData]
        }
        else if (selectedType === "State") {
          allResults = [...response.data.CitiesData]
        }
        else {
          allResults = [...response.data.StatesData]
        }

        setSearchResults(allResults);
      }
      console.log(response, 'responsehbkbojb');
    } catch (error) {
      console.error('Error searching locations:', error);
    }
  }, []);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      searchLocations(searchTerm, selectedType);
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, searchLocations, selectedType]);

  const handleAddLocation = (location: Location) => {
    setSelectedLocations((prev) => [...prev, location]);
    setSearchResults((prev) => prev.filter((item) => item.Id !== location.Id));

    // Update the form values
    if (location.Type === 'Country') {
      setValue('countryList', [
        ...((getValues('countryList') as { value: string; id: number }[]) ||
          []),
        { id: location.Id, value: location.Name },
      ]);
    } else if (location.Type === 'State') {
      setValue('stateList', [
        ...((getValues('stateList') as { value: string; id: number }[]) || []),
        { id: location.Id, value: location.Name },
      ]);
    } else if (location.Type === 'City') {
      setValue('cityList', [
        ...((getValues('cityList') as { value: string; id: number }[]) || []),
        { id: location.Id, value: location.Name },
      ]);
    }
  };

  const handleRemoveLocation = (location: Location) => {
    setSelectedLocations((prev) =>
      prev.filter((item) => item.Id !== location.Id)
    );
    setSearchResults((prev) => [...prev, location]);

    // Update the form values
    if (location.Type === 'Country') {
      setValue(
        'countryList',
        (
          (getValues('countryList') as { value: string; id: number }[]) || []
        ).filter((item) => item.id !== location.Id)
      );
    } else if (location.Type === 'State') {
      setValue(
        'stateList',
        (
          (getValues('stateList') as { value: string; id: number }[]) || []
        ).filter((item) => item.id !== location.Id)
      );
    } else if (location.Type === 'City') {
      setValue(
        'cityList',
        (
          (getValues('cityList') as { value: string; id: number }[]) || []
        ).filter((item) => item.id !== location.Id)
      );
    }
  };

  const handleContinue = async () => {
    try {
      setLoading(true)
      const resSaveLocation = await axios.post(`${apiEndpoint}/BusinessOpportunity/SaveBDCountryAndCity`, {
        CityIds: (watch("cityList"))?.map((city) => ({ CityId: city?.id })),
        CountryIds: (watch("countryList"))?.map((country) => ({ CountryId: country?.id })),
        StateIds: (watch("stateList"))?.map((state) => ({ StateId: state?.id })),
        BDId: BdId
      },
        {
          headers: {
            XApiKey:
              'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
          },
        })
      if (resSaveLocation.status == 200) {
        toast.success(resSaveLocation.data?.Message || "Locations saved successfully")
        setStep((prev) => prev + 1)
        setLoading(false)
      }
    } catch (error) {
      console.log("Error ", error);
      toast.error(error?.response?.data?.Message || 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <FormLayout
      title="Please select the relevant region for your business development opportunity"
      descriptionAlt={
        <p className="text-h7 2xl:text-scaled-h7 text-blue-300 font-medium">
          Select at the{' '}
          <span className="font-semibold text-omblue-700">
            Region/Country/State
          </span>
          , or <span className="font-semibold text-omblue-700">City</span>{' '}
          level.
        </p>
      }
      handleBack={() => setServiceStep((prev) => prev - 1)}
      handleNext={() => handleContinue()}
      disableNext={loading}
      position="start"
    >
      <div className="hidden md:flex items-center gap-6 text-h7 2xl:text-scaled-h7">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedType(option.type);
              setSearchResults([]);
            }}
            className={cn(
              'cursor-pointer border-b-2',
              selectedType === option.type
                ? 'border-omblue-600 text-omblue-600 font-semibold'
                : 'text-[#797B82] border-transparent font-medium'
            )}
            type='button'
          >
            <p className="px-4 py-3">{option.type}</p>
          </button>
        ))}
      </div>
      <div className="flex items-center flex-wrap gap-2">
        {selectedLocations?.map((location: Location) => (
          <div
            className="p-1.5 text-h7 md:text-scaled-h7 font-semibold flex items-center justify-center rounded-md gap-2 cursor-pointer border bg-olblue-50 text-omblue-500 border-omblue-500"
            key={location.Id}
            onClick={() => handleRemoveLocation(location)}
          >
            <p>{location.Name}</p>
            <Add className="w-4 h-4 rotate-45" />
          </div>
        ))}
      </div>
      <div className="mb-4">
        <Input
          placeholder="Search for countries, states, or cities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<SearchIcon />}
        />
      </div>

      <div className="flex items-center flex-wrap gap-2">
        {searchResults ? searchResults.map((result) => (
          <div
            className={`p-1.5 text-h7 md:text-scaled-h7 font-semibold gap-2 cursor-pointer flex items-center justify-center rounded-md border ${'text-omblue-500 border-omblue-500'}`}
            key={result.Id}
            onClick={() => handleAddLocation(result)}
          >
            <p>{result.Name}</p>
            <Add className="w-4 h-4 " />
          </div>
        )) : <div>
          <p className="text-h7 md:text-scaled-h7 text-center text-[#797B82]">
            No results found.
          </p>
        </div>}
      </div>
    </FormLayout>
  );
};

export default Countries;
