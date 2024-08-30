'use client';

import Breadcrumbs from '@/components/breadcrumbs';
import SearchResultCard from '@/components/cards/search-result-card';
import MultiSectionCheckboxAccordion from '@/components/ui/checbox-dropdown';
import CustomSelect from '@/components/ui/select';
import Switch from '@/components/ui/switch';
import ArrowDown from '@/icons/arrow-down';
import ChevronLeft from '@/icons/chevron-left';
import ChevronRight from '@/icons/chevron-right';
import Filters from '@/icons/filters';
import Hamburger from '@/icons/sidebar/hamburger';
import {
  filterCities,
  filterLocations,
  filterSorts,
  filterTypes,
} from '@/utils/constants';
import { capitalizeWords, cn } from '@/utils/utils';
import axios from 'axios';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

const apiEndpoint = process.env.NEXT_PUBLIC_APP_BASE_URL
  ? `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api`
  : 'https://api.orisuun.com/api';

const sortOptions = [
  { value: 'Reviews', label: 'Reviews' },
  { value: 'Ratings', label: 'Ratings' },
  { value: 'Size', label: 'Size' },
  { value: 'BlackOwnedPercent', label: '(%) BlackOwnedPercent' },
  { value: 'Year', label: 'Years In Business' },
  { value: 'CompanyName', label: 'Name' },
]

const GeographyExploreSection = () => {
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(true);
  const [showFiltersRegion, setShowFiltersRegion] = useState(true);
  const [blackOwnedOnly, setBlackOwnedOnly] = useState(true);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showAllCities, setShowAllCities] = useState(true);
  const [breadcrumbs, setBreadcrumbs] = useState<
    { title: string; url?: string }[]
  >([
    {
      title: 'Home',
      url: '/explore',
    },
  ]);
  const [locations, setLocations] = useState([]);
  const [industriesData, setIndustriesData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [profileType, setProfileType] = useState([]);
  const [primarySort, SetPrimarySort] = useState<any>([]);
  const [secondarySort, SetSecondarySort] = useState<any>([]);
  const [tertiarySort, SetTertiarySort] = useState<any>([]);
  const [quaternarySort, SetQuaternarySort] = useState<any>([]);
  const [industries, SetIndustries] = useState<any>([]);
  const [selectIndustry, SetSelectIndustry] = useState<any>([]);
  const [isFilter, setIsFilter] = useState(false)
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState<string[]>([])
  const filterRef = useRef(null); // Step 1: Create a ref


  // const q = searchParams.get('q');
  const industrySearch = searchParams.get('industry');

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

  useEffect(() => {
    if (isFilter) {
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    }
    else {
      document.getElementsByTagName('body')[0].style.overflow = 'auto';
    }

  }, [isFilter])

  useEffect(() => {
    const newBreadcrumbs: { title: string; url?: string }[] = [
      {
        title: 'Home',
        url: '/explore',
      },
    ];

    const q = searchParams.get('q');

    if (q) {
      newBreadcrumbs.push({
        title: capitalizeWords(q.replaceAll('-', ' ')),
        url: `geography?q=${encodeURIComponent(q)}`,
      });
    }

    setBreadcrumbs(newBreadcrumbs);
  }, [searchParams]);

  useEffect(() => {
    (async () => {
      try {
        const categorizedOptions = categorizeOptions(selectedOptions);
        console.log("categorizedOptions ", categorizedOptions);


        const userData = JSON.parse(localStorage.getItem('userData'));
        const payload = {
          UserId: userData?.Id,
          CountryCities: selectedCity.map(city => city.toString()),
          Locations: selectedLocations,
          boTypes: categorizedOptions?.OpportunityType,
          IsVerified: verifiedOnly,
          IsBlackedOwned: blackOwnedOnly,
          ProfileTypes: selectedProfile,
          Industries: [

          ],
          PageSize: 0,
          PageNo: 0,
          ParentId: 0,
          SortPrimary: primarySort?.value ? primarySort?.value : "",
          SortSecondary: secondarySort?.value ? secondarySort?.value : "",
          SortTertiary: tertiarySort?.value ? tertiarySort?.value : "",
          SortQuaternary: quaternarySort?.value ? quaternarySort?.value : "",
          MatchesType: categorizedOptions?.MatchType?.length > 0 ? categorizedOptions?.MatchType : [1],
        }
        const res = await axios.post(`${apiEndpoint}/Explore/GeoGraphyProfilesV1`, payload, {
          headers: {
            XApiKey:
              'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
          },
        })
        if (res.status == 200) {
          setIndustriesData(res.data?.Result)
        }
      } catch (error) {
        console.log("error ", error);
        toast.error("Failed to fetch data");
      }
    })()
  }, [selectedOptions, selectedProfile, selectedCity, selectedLocations, blackOwnedOnly, verifiedOnly, secondarySort, primarySort, tertiarySort, quaternarySort])

  const categorizeOptions = (selectedOptions) => {
    const categories = {
      OpportunityType: [],
      MatchType: [],
    };

    selectedOptions.forEach((option) => {
      filterTypes.forEach((section) => {
        const match = section.options.find((item) => item.id === option);
        if (match) {
          switch (section.title) {
            case 'Business Opportunity Type':
              categories.OpportunityType.push(option);
              break;
            case 'Matches Type':
              categories.MatchType.push(option);
              break;
            default:
              break;
          }
        }
      });
    });

    return categories;
  };

  const restructureData = (data: any) => {
    return data.map(region => ({
      title: region.RegionName,
      options: region.CityList.map(city => ({
        id: city.Id,
        label: city.CityName,
      }))
    }));
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${apiEndpoint}/Search/GetLocationsListV1`, {
          headers: {
            XApiKey:
              'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
          },
        })
        if (res.status == 200) {
          const updatedRecords = res.data?.Result
          const filterCities = restructureData(updatedRecords);
          setCities(filterCities)
          const filterLocations = [
            {
              title: 'Locations',
              options: updatedRecords?.map((location: any) => ({
                id: location.RegionName,
                label: location.RegionName,
              }))
            },
          ];
          setLocations(filterLocations)
          console.log("ress ", filterLocations);
        }

        const resProfileTypes = await axios.get(`${apiEndpoint}/MyProfile/GetUserProfileTypes`, {
          headers: {
            XApiKey:
              'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
          },
        })

        if (resProfileTypes.status == 200) {
          const profiles = resProfileTypes?.data?.Result
          const profileType = [
            {
              title: 'Profile Type',
              options: profiles?.map((profile) => ({
                id: profile?.Id,
                label: profile?.UserProfileName,
              })),
            }]
          setProfileType(profileType)
        }

      } catch (error) {
        console.log("Error ", error)
      }
    })()
  }, [])

  console.log("locations ", locations, selectedCity, cities.map(c => c.title), cities);


  return (
    <div className="px-6">
      <div className="py-6">
        <div className="lg:hidden flex items-center justify-between py-4">
          <Hamburger className="hamburger-top-icon" />
          <p className="text-h7 2xl:text-scaled-h7 font-semibold text-blue-600">
            Explore
          </p>
          <Image
            src="https://s3-alpha-sig.figma.com/img/dac5/a3ff/5be85d0f6bc0bd1a076017beb8ff1fd5?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Fbq8-00tTn89qrFknVra54OEOZxXUv6gEBapDYp8O4rLEeirGr7tIZgBAhKx--cAblwfzvHi6jnmdWcuQHAT70Lbii-ZohFcFitXIviIUEnBQ-7f7ZbtvLqhlrW8ShZpTynL7brvs0guDJAZ7lM5VzZ1XLh7g66pmjS9KmOvjugVI~ZIhC27v3NbK5Fg-28J~ljwAdv1-TaQ4AJMXRvp1Ft0QTji5mJMphYf1gmISiou8uUwVIyU04hKvJXTu9i0n-7EtXwpCZ5Ztb0e3sw7vf9hjuCSV61BXvg2-Ojz7Mb1EGG3YqXLWoymTIDSexU0aeHfDLZiOungr2bQFTXOlQ__"
            alt="user"
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
        <div className="space-y-6">
          <div className='flex items-center justify-between'>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <button
              type="button"
              onClick={() => setIsFilter(true)}
              className="hidden ipad:flex border bg-white text-h9 2xl:text-scaled-h9 font-medium py-3 rounded-md focus:outline-none focus:border-omblue-500 focus:bg-[#f3f7f9] transition-colors duration-200 border-black-200 w-[46px] flex align-center justify-center"
            >
              <Filters className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-grow flex md:overflow-hidden">
            <div className="flex flex-col gap-4">
              <div>

                {/* <div
                className={cn(
                  'block w-72 2xl:w-scaled-64 flex-none hide-scrollbar bg-white shadow-filter-primary my-6 p-4 transition-all',
                  !showFilters
                    ? 'max-h-16 overflow-hidden'
                    : 'max-h-[60rem] overflow-y-auto'
                )}
              >
                <div
                  className="flex items-center gap-2 mb-4"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <div className="h-7 w-1 bg-blue-500 rounded-e-md"></div>
                  <h6 className="text-h6 2xl:text-scaled-h6 text-blue-500 font-semibold">
                    Filters & Sort
                  </h6>
                  <ChevronRight className="ms-auto rotate-90" />
                </div>
                <div className="space-y-4">
                  {filterSorts.map((sort, key) => (
                    <div key={key} className="space-y-2">
                      <label className="text-h9 2xl:text-scaled-h9 font-semibold text-black-500">
                        {sort.label}
                      </label>
                      <CustomSelect
                        placeholder="Select One"
                        options={sort.options}
                        onChange={() => { }}
                        error={undefined}
                        value={undefined}
                      />
                    </div>
                  ))}
                </div>
                <hr className="my-4 border-b-black-500" />
                <MultiSectionCheckboxAccordion
                  sections={filterTypes}
                  selectedOptions={[]}
                  onChange={() => { }}
                />
                <div className="mt-4">
                  <Switch
                    label="Majority Black Owned Companies Only"
                    isOn={blackOwnedOnly}
                    onToggle={() => setBlackOwnedOnly(!blackOwnedOnly)}
                  />
                  <Switch
                    label="Verified Companies Only"
                    isOn={verifiedOnly}
                    onToggle={() => setVerifiedOnly(!verifiedOnly)}
                  />
                </div>
                <MultiSectionCheckboxAccordion
                  sections={filterLocations}
                  selectedOptions={[]}
                  onChange={() => { }}
                />
              </div> */}
                <div className={cn("col-span-3 filter-container", isFilter ? 'show-filter' : "")}>
                  <div
                    ref={filterRef}
                    className={cn(
                      'block flex-none hide-scrollbar mb-3 bg-white shadow-filter-primary p-4 max-w-md transition-all',
                      !showFilters
                        ? 'max-h-16 overflow-hidden'
                        : 'max-h-[60rem] overflow-y-auto'
                    )}
                  >
                    <div
                      className="flex items-center gap-2 mb-4"
                      onClick={() => setShowFiltersRegion(!showFiltersRegion)}
                    >
                      <div className="h-7 w-1 bg-blue-500 rounded-e-md"></div>
                      <h6 className="text-h6 2xl:text-scaled-h6 text-blue-500 font-semibold">
                        Region
                      </h6>
                      <ChevronRight className="ms-auto rotate-90" />
                    </div>
                    <Switch
                      label="See all cities"
                      onToggle={() => setShowAllCities(!showAllCities)}
                      isOn={showAllCities}
                    />
                    {!showAllCities ? (
                      <div className="mt-2">
                        <MultiSectionCheckboxAccordion
                          sections={cities}
                          selectedOptions={selectedCity}
                          onChange={setSelectedCity}
                          defaultClosedSections={cities.map(c => c.title)}
                        />
                      </div>
                    ) : null}
                  </div>
                  <div
                    className={cn(
                      'block flex-none hide-scrollbar bg-white shadow-filter-primary p-4 max-w-md transition-all',
                      !showFilters
                        ? 'max-h-16 overflow-hidden'
                        : 'max-h-[60rem] overflow-y-auto'
                    )}
                  >
                    <div
                      className="flex items-center gap-2 mb-4"
                    // onClick={() => setShowFilters(!showFilters)}
                    >
                      <div className="h-7 w-1 bg-blue-500 rounded-e-md ipad:hidden"></div>
                      <ArrowDown className="rotate-90 w-10 h-10 hidden ipad:block cursor-pointer" onClick={() => setIsFilter(false)} />
                      <h6 className="text-h6 2xl:text-scaled-h6 text-blue-500 font-semibold">
                        Filters & Sort
                      </h6>
                      {/* <ChevronRight className="ms-auto rotate-90" /> */}
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-h9 2xl:text-scaled-h9 font-semibold text-black-500">
                          Primary Sort
                        </label>
                        <CustomSelect
                          placeholder="Select One"
                          options={sortOptions}
                          onChange={SetPrimarySort}
                          error={undefined}
                          value={primarySort}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-h9 2xl:text-scaled-h9 font-semibold text-black-500">
                          Secondary Sort
                        </label>
                        <CustomSelect
                          placeholder="Select One"
                          options={sortOptions}
                          onChange={SetSecondarySort}
                          error={undefined}
                          value={secondarySort}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-h9 2xl:text-scaled-h9 font-semibold text-black-500">
                          Tertiary Sort
                        </label>
                        <CustomSelect
                          placeholder="Select One"
                          options={sortOptions}
                          onChange={SetTertiarySort}
                          error={undefined}
                          value={tertiarySort}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-h9 2xl:text-scaled-h9 font-semibold text-black-500">
                          Quaternary Sort
                        </label>
                        <CustomSelect
                          placeholder="Select One"
                          options={sortOptions}
                          onChange={SetQuaternarySort}
                          error={undefined}
                          value={quaternarySort}
                        />
                      </div>
                      {/* {filterSorts.map((sort, key) => (
                      <div key={key} className="space-y-2">
                        <label className="text-h9 2xl:text-scaled-h9 font-semibold text-black-500">
                          {sort.label}
                        </label>
                        <CustomSelect
                          placeholder="Select One"
                          options={sortOptions}
                          onChange={() => { }}
                          error={undefined}
                          value={undefined}
                        />
                      </div>
                    ))} */}
                    </div>
                    <hr className="my-4 border-b-black-500" />
                    <MultiSectionCheckboxAccordion
                      sections={profileType}
                      selectedOptions={selectedProfile}
                      onChange={setSelectedProfile}
                    />
                    <MultiSectionCheckboxAccordion
                      sections={filterTypes}
                      selectedOptions={selectedOptions}
                      onChange={setSelectedOptions}
                    />
                    <div className="mt-4">
                      <Switch
                        label="Majority Black Owned Companies Only"
                        isOn={blackOwnedOnly}
                        onToggle={() => setBlackOwnedOnly(!blackOwnedOnly)}
                      />
                      <Switch
                        label="Verified Companies Only"
                        isOn={verifiedOnly}
                        onToggle={() => setVerifiedOnly(!verifiedOnly)}
                      />
                    </div>
                    {/* <MultiSectionCheckboxAccordion
                  sections={locations}
                  selectedOptions={selectedLocations}
                  onChange={setSelectedLocations}
                /> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-grow md:overflow-y-auto md:p-4 flex flex-col gap-4">
              {industriesData?.length > 0 ? industriesData.map((industriesData, index) => (
                <SearchResultCard index={index} key={index} data={industriesData} />
              )) : <>
                <p>There is no data </p>
              </>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeographyExploreSection;
