'use client';

import React, { useEffect, useState } from 'react';
import bgImage from '@/public/images/horizon.png';
import Image from 'next/image';
import { apiEndpoint, cn } from '@/utils/utils';
import CustomSelect from '@/components/ui/select';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import SearchIcon from '@/icons/sidebar/search-icon';
import Location from '@/icons/location';
import UserSearch from '@/icons/user-search';
import Users from '@/icons/users';
import Handshake from '@/icons/handshake';
import Hamburger from '@/icons/sidebar/hamburger';
import logo from '@/public/images/vector/logo-alt.svg';
import { useRouter } from 'next/navigation';
import { debounce } from 'lodash';
import axios from 'axios';

// Mock data for autocomplete
const mockCities = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio',
  'San Diego',
  'Dallas',
  'San Jose',
];
const mockProfiles = [
  'Software Engineer',
  'Product Manager',
  'Data Scientist',
  'UX Designer',
  'Marketing Specialist',
  'Financial Analyst',
  'HR Manager',
  'Sales Representative',
  'Business Analyst',
  'Operations Manager',
];

const profiles = [
  { icon: UserSearch, label: 'Business Development Opportunities', value: "1" },
  { icon: Users, label: 'Co-Founder Posts', value: "2" },
  { icon: Handshake, label: 'Board of Directors Member Posts', value: "3" },
];

const PostSearch = () => {
  const [selected, setSelected] = useState(profiles[0]);
  const [profileText, setProfileText] = useState('');
  const [city, setCity] = useState<any>('');
  const [profileSuggestions, setProfileSuggestions] = useState<string[]>([]);
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const router = useRouter();
  const [cities, setCities] = useState([]);
  console.log(selected, "selected");


  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await axios.get(
          `${apiEndpoint}/Search/GetLocationsListV1`,
          {
            headers: {
              accept: '*/*',
              XApiKey:
                'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
            },
          }
        );
        if (res.status === 200) {
          setCities(res.data.Result);
        }

      } catch (error) {
        console.error(error);
      }
    };
    fetchList();
  }, []);
  useEffect(() => {
    const findCities = cities.flatMap(region => region.CityList)

    const debouncedSearch = debounce((text: string) => {
      const filteredCities = text.length > 0 && findCities.filter((city) =>
        typeof city.CityName === 'string' && city.CityName.toLowerCase().includes(text.toLowerCase())
      );
      setCitySuggestions(filteredCities);
    }, 300);

    if (city) {
      debouncedSearch(city);
    } else {
      setCitySuggestions([]);
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [city]);


  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchParams = new URLSearchParams({
      searchQuery: profileText.trim(),
      city: city?.Id?.toString() || "",
      profileType: selected.value.toString() || "1",
    });
    router.push(`/post-search/search-results?${searchParams.toString()}`);
  };

  const handleProfileSelect = (profile: string) => {
    setProfileText(profile);
    setProfileSuggestions([]);
  };

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
    setCitySuggestions([]);
  };

  return (
    <div className="relative min-h-screen">
      <Image
        src={bgImage}
        alt="Space background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      <div className="absolute top-0 w-full justify-between px-4 hidden ipad:flex items-center z-50 h-20 bg-white">
        <Hamburger />
        <p className="text-h7 2xl:text-scaled-h7 font-semibold text-blue-600">
          Post Search
        </p>
        <Image
          src={
            'https://s3-alpha-sig.figma.com/img/dac5/a3ff/5be85d0f6bc0bd1a076017beb8ff1fd5?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Fbq8-00tTn89qrFknVra54OEOZxXUv6gEBapDYp8O4rLEeirGr7tIZgBAhKx--cAblwfzvHi6jnmdWcuQHAT70Lbii-ZohFcFitXIviIUEnBQ-7f7ZbtvLqhlrW8ShZpTynL7brvs0guDJAZ7lM5VzZ1XLh7g66pmjS9KmOvjugVI~ZIhC27v3NbK5Fg-28J~ljwAdv1-TaQ4AJMXRvp1Ft0QTji5mJMphYf1gmISiou8uUwVIyU04hKvJXTu9i0n-7EtXwpCZ5Ztb0e3sw7vf9hjuCSV61BXvg2-Ojz7Mb1EGG3YqXLWoymTIDSexU0aeHfDLZiOungr2bQFTXOlQ__'
          }
          alt="user"
          width={32}
          height={32}
          className="rounded-full"
        />
      </div>
      <div className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 p-4">
        <Image
          src={logo}
          alt="orisuun"
          width={260}
          height={80}
          quality={100}
          priority
          className="mx-auto mb-3 w-64 h-20 2xl:w-scaled-32 2xl:h-scaled-10 text-blue-600"
        />
        <h5 className="text-h5 2xl:text-scaled-h5 font-semibold text-blue-600 mb-10 mx-auto text-center">
          The Orisuun world at your fingertips
        </h5>
        <div className="hidden md:flex w-full items-center justify-between xl:px-20 mb-4">
          {profiles.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                onClick={() => setSelected(item)}
                key={index}
                className={cn(
                  'cursor-pointer flex items-center gap-2 justify-center border-b-2 py-2 px-4',
                  selected.value.toString() === item.value.toString()
                    ? 'font-semibold border-white'
                    : 'font-medium border-transparent'
                )}
              >
                <Icon className="w-6 h-6 text-white" />
                <p className="text-h9 2xl:text-scaled-h9 text-white">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
        <div className="block md:hidden rounded-xl w-full mb-4">
          <CustomSelect
            options={profiles}
            onChange={(value) => setSelected(value)}
            error={undefined}
            value={selected}
            controlClasses="bg-white w-80 mx-auto"
          />
        </div>
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row items-center gap-4 mx-auto w-full xl:px-20"
        >
          <div className="w-full md:w-auto relative md:flex-1">
            <Input
              icon={<SearchIcon className="w-4 h-4" />}
              placeholder="Search Keywords"
              value={profileText}
              onChange={(e) => setProfileText(e.target.value)}
            />
            {/* {profileSuggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
                {profileSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleProfileSelect(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )} */}
          </div>
          <div className="w-full md:w-auto relative md:flex-0">
            <Input
              icon={<Location className="w-4 h-4" />}
              placeholder="All Cities"
              value={city?.CityName}
              onChange={(e) => setCity(e.target.value)}
            />
            {citySuggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
                {citySuggestions.map((suggestion: any, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCitySelect(suggestion)}
                  >
                    {suggestion?.CityName}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="md:w-auto w-full">
            <Button className="ms-0" type="submit" title="Search"></Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostSearch;