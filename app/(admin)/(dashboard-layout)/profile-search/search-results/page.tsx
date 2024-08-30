'use client';

import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import SearchIcon from '@/icons/sidebar/search-icon';
import Input from '@/components/ui/input';
import Location from '@/icons/location';
import SearchResultCard from '../../../../../components/cards/search-result-card';
import Hamburger from '@/icons/sidebar/hamburger';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Filters from '@/icons/filters';
import FiltersSection from './_sections/filters-section';
import { useMobileMediaQuery } from '@/hooks/useMediaQuery';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { debounce } from 'lodash';
import CustomSelect from '@/components/ui/select';
import { Accordion, AccordionItem } from '@nextui-org/accordion';

import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { apiEndpoint, cn } from '@/utils/utils';
import Switch from '@/components/ui/switch';
import Loader from '@/components/loader';
import Community from '@/icons/community';
import Crown from '@/icons/crown';
import Consultant from '@/icons/consultant';
import Briefcase from '@/icons/briefcase';
import Gossip from '@/icons/gossip';
import Dollars from '@/icons/dollars';
import ArrowLeft from '@/icons/arrow-left';
import ArrowDown from '@/icons/arrow-down';
const profiles = [
  { icon: Community, title: 'Black Owned Businesses', id: 1 },
  { icon: Crown, title: 'Experts', id: 2 },
  { icon: Consultant, title: 'Consultants', id: 3 },
  { icon: Briefcase, title: 'Professionals', id: 4 },
  { icon: Gossip, title: 'Mentors', id: 5 },
  { icon: Dollars, title: 'Investors', id: 6 },
];
const sortOptions = [
  { value: 'Review', label: 'Reviews' },
  { value: 'Rating', label: 'Ratings' },
  { value: 'Size', label: 'Size' },
  { value: 'BlackOwnedPercent', label: '(%) of Black-Ownership' },
  { value: 'Year', label: 'Years In Business' },
  { value: 'CompanyName', label: 'Name' },
];

export default function SearchResults({ profilesPost }: any) {
  const profilesComponent = profilesPost ? profilesPost : profiles
  const [values, setValues]: any = useState({
    primary: '',
    secondary: '',
    tertiary: '',
    quaternary: '',
    tags: [],
    relevantIndustries: [] as string[],
    blackedOwned: false as boolean,
    verifiedCompanies: false as boolean,
    geographic: [],
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchCityValue = searchParams.get('city');
  const searchValue = searchParams.get('searchQuery');
  const profileValue = searchParams.get('profileType') || 1;
  const isMobile = useMobileMediaQuery();
  const [Industries, setIndustries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selected, setSelected] = useState(profileValue);
  const [profileText, setProfileText] = useState('');
  const [city, setCity] = useState(null);
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [results, setResults] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [loader, setLoader] = useState(true);
  const filterRef = useRef(null); // Step 1: Create a ref

  // Step 2: Handle outside clicks
  useEffect(() => {
    function handleClickOutside(event) {
      console.log(event.target, filterRef.current, "Calledddddd");

      if (filterRef.current) {
        setIsFilter(false); // Close the filter if clicked outside
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [filterRef]);

  const updateQueryParams = (params) => {
    const query = new URLSearchParams(window.location.search);

    // Loop through each key in the params object and set the query parameter
    Object.keys(params).forEach((param) => {
      query.set(param, params[param]);
    });

    // Navigate to the new URL with updated query parameters
    router.push(`?${query.toString()}`);
  };

  useEffect(() => {
    const findCities =
      values.geographic.length === 0
        ? cities.flatMap((region) => region.CityList)
        : cities
          .filter((region) => values.geographic.includes(region.RegionId))
          .flatMap((region) => region.CityList);
    const debouncedSearch = debounce((text: string) => {
      const filteredCities =
        text.length > 0 &&
        findCities.filter(
          (city) =>
            typeof city.CityName === 'string' &&
            city.CityName.toLowerCase().includes(text.toLowerCase())
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
  useEffect(() => {
    const findProfile = profilesComponent.find(
      (profile) => profile.id.toString() === profileValue
    );
    console.log(findProfile, 'findProfile');

    setSelected(findProfile ? findProfile.id : profileValue);
    setProfileText(searchValue || '');
    setCity(
      searchCityValue
        ? cities
          .flatMap((region) => region.CityList)
          .find((c) => c?.Id?.toString() === searchCityValue)
        : null
    );
  }, [searchParams, profilesComponent, cities]);
  useEffect(() => {
    if (!isMobile) {
      handleSearch();
    }
  }, [
    values.primary?.value,
    values.secondary?.value,
    values.tertiary?.value,
    values.quaternary?.value,
  ]);

  const handleCitySelect = (selectedCity: any) => {
    setCity(selectedCity);

    setCitySuggestions([]);
  };
  useEffect(() => {
    if (isFilter) {
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    }
    else {
      document.getElementsByTagName('body')[0].style.overflow = 'auto';
    }

  }, [isFilter])
  const handleSearch = async () => {
    setLoader(true);

    try {
      const payload = {
        MainSearch: profileText,
        CityId: city?.Id,
        Locations: values.geographic,
        BoTypes: [],
        MatchesType: selected,
        SortPrimary: values.primary?.value || '',
        SortSecondary: values.secondary?.value || '',
        SortTertiary: values.tertiary?.value || '',
        SortQuaternary: values.quaternary?.value || '',
        // SimilarKeyWords: values.similarKeywords || [],
        Tags: values.tags || [],
        IsBlackedOwned: values.blackedOwned || false,
        IsVerified: values.verifiedCompanies || false,
        RelevantIndustries: values.relevantIndustries || [],
        UserId: '00b38024-eafa-4e61-a5b5-4554e32c67e2',
      };

      console.log(payload, 'payload');
      const response = await axios.post(
        `${apiEndpoint}/Search/GetFilteredPostProfilesV1`,
        payload,
        {
          headers: {
            accept: '*/*',
            XApiKey:
              'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
          },
        }
      );

      if (response.status === 200) {
        setResults(response.data.Result.FilteredProfiles);
        updateQueryParams({
          searchQuery: profileText,
          profileType: selected ? selected : profileValue,
          city: city?.Id || '',
        });
      }
      console.log(response, 'response');
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  const handleIndustryChange = (id: string) => {
    setValues((prev) => {
      const updatedIndustries = prev.relevantIndustries.includes(id)
        ? prev.relevantIndustries.filter((industry) => industry !== id)
        : [...prev.relevantIndustries, id];

      return { ...prev, relevantIndustries: updatedIndustries };
    });
  };
  const handleGeographyChange = (id: string) => {
    setValues((prev) => {
      const updatedCountries = prev.geographic.includes(id)
        ? prev.geographic.filter((country) => country !== id)
        : [...prev.geographic, id];

      return { ...prev, geographic: updatedCountries };
    });
  };

  const handleSortChange = (key: string, value: string) => {
    console.log(value, 'value');
    setValues((prev) => ({ ...prev, [key]: value }));
  };

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
        const resInsdustries = await axios.get(
          `${apiEndpoint}/Search/GetIndustriesList`,
          {
            headers: {
              accept: '*/*',
              XApiKey:
                'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
            },
          }
        );
        if (resInsdustries.status === 200) {
          setIndustries(resInsdustries.data.Result);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchList();
  }, []);

  console.log("results ", results);


  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && isMobile) {
      handleSearch();
    }
  };
  return loader ? (
    <Loader />
  ) : (
    <>
      <div className="px-2 md:px-6">
        <div className="lg:hidden flex items-center justify-between py-4">
          <Hamburger className="hamburger-top-icon" />
          <p className="text-h7 2xl:text-scaled-h7 font-semibold text-blue-600">
            Profile Search
          </p>
          <Image
            src="https://s3-alpha-sig.figma.com/img/dac5/a3ff/5be85d0f6bc0bd1a076017beb8ff1fd5?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Fbq8-00tTn89qrFknVra54OEOZxXUv6gEBapDYp8O4rLEeirGr7tIZgBAhKx--cAblwfzvHi6jnmdWcuQHAT70Lbii-ZohFcFitXIviIUEnBQ-7f7ZbtvLqhlrW8ShZpTynL7brvs0guDJAZ7lM5VzZ1XLh7g66pmjS9KmOvjugVI~ZIhC27v3NbK5Fg-28J~ljwAdv1-TaQ4AJMXRvp1Ft0QTji5mJMphYf1gmISiou8uUwVIyU04hKvJXTu9i0n-7EtXwpCZ5Ztb0e3sw7vf9hjuCSV61BXvg2-Ojz7Mb1EGG3YqXLWoymTIDSexU0aeHfDLZiOungr2bQFTXOlQ__"
            alt="user"
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
        <div className="ipad:hidden flex w-full items-center justify-between my-4">
          {profilesComponent?.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                onClick={() => {
                  setSelected(item.id);
                }}
                key={item.id}
                className={cn(
                  'cursor-pointer flex items-center gap-2 justify-center border-b-2 py-2 px-4',
                  selected === item.id
                    ? 'font-semibold border-[#204FB4] text-[#204FB4]'
                    : 'font-medium border-transparent'
                )}
              >
                <Icon
                  className="w-6 h-6"
                  color={selected === item.id ? '#204FB4' : '#797B82'}
                />
                <p
                  className={cn(
                    ' text-h9 2xl:text-scaled-h9',
                    selected === item.id ? 'text-[#204FB4]' : 'text-[#797B82]'
                  )}
                >
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
        <div className="hidden md:hidden rounded-xl w-full mb-4">
          <CustomSelect
            options={profilesComponent?.map((profile, index) => ({
              label: profile.title,
              value: profile.id.toString(),
            }))}
            onChange={(value) => setSelected(parseInt(value))}
            error={undefined}
            value={selected?.toString()}
            controlClasses="bg-white w-80 mx-auto"
          />
        </div>
        <form className="flex flex-row items-center gap-4 mx-auto w-full">
          <div className="relative md:flex-1 w-full">
            <Input
              icon={<SearchIcon className="w-4 h-4" />}
              placeholder="Search Keywords"
              value={profileText}
              onKeyDown={handleKeyPress}
              onChange={(e) => {
                setProfileText(e.target.value);
              }}
            />

          </div>
          <div className="hidden md:block w-full md:w-auto relative md:flex-0">
            <Input
              icon={<Location className="w-4 h-4" />}
              placeholder="All Cities"
              value={city?.CityName}
              onChange={(e) => setCity(e.target.value)}
            />
            {citySuggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
                {citySuggestions?.map((suggestion: any, index) => (
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
          <button
            type="button"
            onClick={handleSearch}
            className="hidden md:block max-w-[170px] w-full bg-blue-500 text-white px-4 py-3 rounded-br-md rounded-tr-md"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => setIsFilter(true)}
            className="hidden ipad:flex border bg-white text-h9 2xl:text-scaled-h9 font-medium py-3 rounded-md focus:outline-none focus:border-omblue-500 focus:bg-[#f3f7f9] transition-colors duration-200 border-black-200 w-[46px] flex align-center justify-center"
          >
            <Filters className="w-5 h-5" />
          </button>
        </form>
        <div className="py-8">


          <div className="grid grid-cols-12 gap-3">
            <div
              ref={filterRef}
              className={cn(
                'col-span-3 filter-container',
                isFilter ? 'show-filter' : ''
              )}
            >
              <div className="w-full max-w-md  mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="custom-alt h-screen overflow-auto pb-20">
                  <div className="flex items-center gap-2 mb-4 pt-5">
                    <div className="h-7 w-1 bg-blue-500 rounded-e-md ipad:hidden"></div>
                    <ArrowDown className="rotate-90 w-10 h-10 hidden ipad:block cursor-pointer" onClick={() => setIsFilter(false)} />
                    <h6 className="text-h6 2xl:text-scaled-h6 text-blue-500 font-semibold ipad:text-center ipad:w-full">
                      Filter & Sort
                    </h6>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2 px-4">
                      <label className="text-h8 2xl:text-scaled-h8 tracking-[1px] font-semibold text-black-500">
                        Primary Sort
                      </label>
                      <CustomSelect
                        options={sortOptions}
                        value={values.primary}
                        onChange={(value: string) =>
                          handleSortChange('primary', value)
                        }
                        placeholder="Select"
                        error={undefined}
                      />
                    </div>
                    <div className="space-y-2 px-4">
                      <label className="text-h8 2xl:text-scaled-h8 tracking-[1px] font-semibold text-black-500">
                        Secondary Sort
                      </label>
                      <CustomSelect
                        options={sortOptions}
                        value={values.secondary}
                        onChange={(value: string) =>
                          handleSortChange('secondary', value)
                        }
                        placeholder="Select"
                        error={undefined}
                      />
                    </div>
                    <div className="space-y-2 px-4">
                      <label className="text-h8 2xl:text-scaled-h8 tracking-[1px] font-semibold text-black-500">
                        Tertiary Sort
                      </label>
                      <CustomSelect
                        options={sortOptions}
                        value={values.tertiary}
                        onChange={(value: string) =>
                          handleSortChange('tertiary', value)
                        }
                        placeholder="Select"
                        error={undefined}
                      />
                    </div>
                    <div className="space-y-2 px-4">
                      <label className="text-h8 2xl:text-scaled-h8 tracking-[1px] font-semibold text-black-500">
                        Quaternary Sort
                      </label>
                      <CustomSelect
                        options={sortOptions}
                        value={values.quaternary}
                        onChange={(value: string) =>
                          handleSortChange('quaternary', value)
                        }
                        placeholder="Select"
                        error={undefined}
                      />
                    </div>
                  </div>
                  <div className='px-2'>
                    <Accordion
                      selectionMode="multiple"
                      className="accrodian-main mt-4"
                    >

                      <AccordionItem
                        key=""
                        aria-label="Relavant Industries"
                        title="Relavant Industries"
                        className="accordion_item "
                      >
                        {Industries?.map((industry) => (
                          <div
                            key={industry.Id}
                            className="flex items-start justify-between space-x-2 mb-1"
                          >
                            <input
                              type="checkbox"
                              id={industry.Id}
                              className="mt-[4px] w-[17px] h-[17px] border-solid border-1 border-[#B1B1B0]"
                              checked={values.relevantIndustries.includes(
                                industry.Id
                              )}
                              multiple
                              onChange={() => handleIndustryChange(industry.Id)}
                            />
                            <label
                              htmlFor={industry.Id}
                              className="text-[14px] tracking-[1px] color-[#080808]"
                            >
                              {industry.IndustryName}
                            </label>
                          </div>
                        ))}

                      </AccordionItem>

                      <AccordionItem key="3" aria-label="Tags" title="Tags">
                        <div>
                          <TagsInput
                            value={values.tags}
                            onChange={(e) => {
                              const filteredTags = e
                                .filter((tag) => tag.trim() !== '')
                                .filter(
                                  (value, index, self) =>
                                    self.indexOf(value) === index
                                );
                              setValues({
                                ...values,
                                tags: filteredTags,
                              });

                            }}
                          />
                          {values?.tags?.map((keyword, indexValue) => (
                            <p className="similiar_keywork" key={indexValue}>
                              {keyword}{' '}
                              <span
                                onClick={() => {
                                  const filteredTags = values.tags.filter(
                                    (tag, index) => index !== indexValue
                                  );
                                  setValues({
                                    ...values,
                                    tags: filteredTags,
                                  });
                                }}
                              >
                                X
                              </span>
                            </p>
                          ))}
                        </div>
                        <div className="mt-4">
                          <Switch
                            label="Majority Black Owned Companies Only"
                            isOn={values.blackedOwned}
                            onToggle={() =>
                              setValues({
                                ...values,
                                blackedOwned: !values.blackedOwned,
                              })
                            }
                          />
                          <Switch
                            label="Verified Companies Only"
                            isOn={values.verifiedCompanies}
                            onToggle={() =>
                              setValues({
                                ...values,
                                verifiedCompanies: !values.verifiedCompanies,
                              })
                            }
                          />
                        </div>
                      </AccordionItem>
                      <AccordionItem
                        key="4"
                        aria-label="Geography"
                        title="Geography"
                      >
                        {cities?.map((country) => (
                          <div
                            key={country.RegionId}
                            className="flex items-center"
                          >
                            <label htmlFor={country.Id}>
                              <input
                                type="checkbox"
                                id={country.RegionId}
                                checked={values.geographic.includes(
                                  country.RegionId
                                )}
                                multiple
                                className="mr-1"
                                onChange={() =>
                                  handleGeographyChange(country.RegionId)
                                }
                              />
                              {country.RegionName}
                            </label>
                          </div>
                        ))}

                        {/* {defaultContent} */}
                      </AccordionItem>
                    </Accordion>
                  </div>
                  <div className='ipad:flex hidden gap-4 border-t border-[#D2D4DA] px-4 py-4 fixed bg-white bottom-0 left-0 w-full'>
                    <button
                      className="flex items-center justify-center w-full border border-omblue-100 rounded-md gap-2 px-4 py-3.5 text-h9 2xl:text-scaled-h9 "
                      onClick={() => setValues({
                        primary: '',
                        secondary: '',
                        tertiary: '',
                        quaternary: '',
                        tags: [],
                        relevantIndustries: [] as string[],
                        blackedOwned: false as boolean,
                        verifiedCompanies: false as boolean,
                        geographic: [],
                      })}
                    >
                      <p>Clear All</p>
                    </button>
                    <button className="px-5 py-3.5 gap-2 w-full text-white bg-omblue-500 rounded-md" onClick={handleSearch}>
                      <p className="text-h9 2xl:text-scaled-h9 font-semibold">
                        Apply
                      </p>
                    </button>
                  </div>
                  {/* 
              <MultiSectionCheckboxAccordion
sections={sections}
selectedOptions={Object.entries(selectedOptions).flatMap(([sectionTitle, options]) =>
  options.map((id) => ({ sectionTitle, id }))
)}
onChange={(updatedSelection) => {
  // Convert the flat array back to a section-based object
  const newSelectedOptions:any = updatedSelection.reduce((acc, { sectionTitle, id }) => {
    acc[sectionTitle] = acc[sectionTitle] ? [...acc[sectionTitle], id] : [id];
    return acc;
  }, {} as { [key: string]: string[] });

  setSelectedOptions(newSelectedOptions);
}}
/> */}
                </div>
              </div>
            </div>
            {/* <div className="col-span-9 space-y-4">
          {[...results, ...Array.from({ length: 10 })].map((_, index) => (
            <Link href={`/discount-portal/${'1'}`} key={index}>
              <FavouriteCardDetails />
            </Link>
          ))}
        </div> */}
            <div className="col-span-9 ipad:col-span-12 space-y-4">
              {results?.map((data, index) => (
                <SearchResultCard key={index} index={index} data={data} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}