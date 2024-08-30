'use client';

import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Select } from '@headlessui/react';
import { apiEndpoint, cn } from '@/utils/utils';
import { useMobileMediaQuery } from '@/hooks/useMediaQuery';
import { RootState } from '@/data/store';
import {
  getBusinessOpportunitySeekingList,
  getBusinessOpportunityFacilitateList,
} from '@/server-actions/businessDevelopment';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// Components
import Button from '@/components/ui/button';
import ProfileCard from '@/components/cards/profile-card';

// Icons
import Hamburger from '@/icons/sidebar/hamburger';
import ChevronRight from '@/icons/chevron-right';
import Crown from '@/icons/crown';

// Images
import message from '@/public/images/vector/message.svg';
import transfer from '@/public/images/vector/exhange.svg';
import cross from '@/public/images/vector/cross.svg';
import OpportunityCard from '@/components/cards/opportunity-card';
import { toast } from 'react-toastify';
import axios from 'axios';

const BusinessDevelopment: React.FC = () => {
  const [selected, setSelected] = useState('Facilitate');
  const [showDetails, setShowDetails] = useState<number | null>(null);
  const isMobile = useMobileMediaQuery();
  const [businessOpportunityList, SetBusinessOpportunityList] = useState([]);
  const [selectedOppourtunity, setSelectedOpportunity] = useState([]);
  const [selectedOppourtunityUserId, setSelectedOpportunityUserId] = useState([]);
  const [opportunityMatch, setOpportunityMatch] = useState([]);

  // const { currentUser } = useSelector((state: RootState) => state.user);

  const fetchBusinessOppotunityLists = useCallback(async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"))
      const data = {
        UserId: userData?.Id,
      };
      if (selected === 'Seeking') {
        const response = await getBusinessOpportunitySeekingList(data);
        console.log(response.data?.BDSeekingList, 'response.data seeking');
        SetBusinessOpportunityList(response.data?.BDSeekingList);
        setSelectedOpportunity(response.data?.BDSeekingList[0]?.BDId)
        setSelectedOpportunityUserId(response.data?.BDSeekingList[0]?.UserId)
      } else if (selected === 'Facilitate') {
        const response = await getBusinessOpportunityFacilitateList(data);
        console.log(response.data?.BDFacilitateList, 'response.data facilitate');
        SetBusinessOpportunityList(response.data?.BDFacilitateList);
        setSelectedOpportunity(response.data?.BDFacilitateList[0]?.BDId)
        setSelectedOpportunityUserId(response.data?.BDFacilitateList[0]?.UserId)
      }
    } catch (error) {
      toast.error(error?.response?.data?.Message || 'Error while fetching data')
      console.error('Error fetching regions:', error);
    }

  }, [selected]);

  useEffect(() => {
    fetchBusinessOppotunityLists();
  }, [fetchBusinessOppotunityLists, selected]);

  useEffect(() => {
    (async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (selectedOppourtunity) {
          const res = await axios.post(
            `${apiEndpoint}/BusinessOpportunity/GetMatchedListBasedonBdId`,
            {
              BDId: selectedOppourtunity,
              UserId: selectedOppourtunityUserId,
            },
            {
              headers: {
                XApiKey: 'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
              },
            }
          );

          if (res.status === 200) {
            setOpportunityMatch(res.data?.Result);
          }
        }
      } catch (error) {
        console.log("Error ", error);
        setOpportunityMatch([]);
      }
    })()
  }, [selectedOppourtunity, selectedOppourtunityUserId])

  if (showDetails !== null) {
    return (
      <div className="px-4">
        <div className="md:hidden flex items-center justify-between py-4">
          <ChevronRight
            onClick={() => setShowDetails(null)}
            className="rotate-180 text-black-700"
          />
        </div>
        <div className="my-6">
          <h6 className="text-h6 2xl:text-scaled-h6 font-semibold text-blue-500 mb-6">
            Business Development Opportunity Matching
          </h6>
          <OpportunityCard
            id={showDetails}
            onClick={() => {
              if (isMobile) {
                setShowDetails(showDetails);
              }
            }}
            borderless
            selected={selected}
            SetBusinessOpportunityList={SetBusinessOpportunityList}
            selectedOpportunity={selectedOppourtunity}
            setSelectedOpportunity={setSelectedOpportunity}
            setSelectedOpportunityUserId={setSelectedOpportunityUserId}
          // SetBusinessOpportunityList={SetBusinessOpportunityList}
          />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex w-full md:hidden flex-col items-center px-4 py-2"
              >
                <div className="w-full border border-grey-600 rounded-md px-4 py-3">
                  <div className="w-full flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <p className="text-h10 2xl:text-scaled-h10 font-semibold flex items-center text-black-500">
                        Market Penetration
                      </p>
                      <p className="text-h10 2xl:text-scaled-h10 font-medium flex items-center text-green-500">
                        Mutually Matched
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <ProfileCard
                      variant="sm"
                      name="Brooks Orozco"
                      company="Consultant"
                      image="https://s3-alpha-sig.figma.com/img/b52e/1df2/041e981fea2ab7e77f156b65e259af97?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oJ4CI60SfZDBcEOshC-sHR0VWjSscdN-N5Fyl2p6YLJVpQNpRJhdK1wlvPo5mU5wyHJtE3UL4uONPSWQkmTO6oz6Ce5UMvaYNwfWWaxnnR9bsxaIRzoadg2-imUJSzAn-6eV6wDMqKiGzKB4zNjQ0ElOCI5~bcGrC-aBLcpqApPrqFI0D3u4r2hMW5Zx86X02b3H3LPsIQFYRQjl9CTHEYnuhH6tzkC~8p8lM-~lKqteziS6Nsh-OgwUklU0dECXvj590RCu7xUPDKv5aCdYPVrnwtIZ6j78UuJxt0wRpiwPfqpI~1EgqWkNA6iwoZMTzU~ZQMmRV-SDCLYX8BXz0Q__"
                    />
                    <div className="flex items-center gap-2">
                      <button className="border border-blue-100 p-2 rounded-full">
                        <Image
                          src={message}
                          alt="message"
                          width={16}
                          height={16}
                        />
                      </button>
                      <button className="border border-danger-100 p-2 rounded-full">
                        <Image
                          src={cross}
                          alt="message"
                          width={16}
                          height={16}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  console.log("businessOpportunityList ", businessOpportunityList, selectedOppourtunity);


  return (
    <div className="px-4 md:px-6 h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <div className="md:hidden flex items-center justify-between py-4">
        <Hamburger />
        <p className="text-h7 2xl:text-scaled-h7 font-semibold text-blue-600">
          Business Development
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

      {/* Navigation and Create Button */}
      <div className="flex-shrink-0 py-6">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="hidden md:flex items-center gap-6 text-h7 2xl:text-scaled-h7">
            <button
              onClick={() => setSelected('Seeking')}
              className={cn(
                'cursor-pointer border-b-2',
                selected === 'Seeking'
                  ? 'border-omblue-600 text-omblue-600 font-semibold'
                  : 'text-[#797B82] border-transparent font-medium'
              )}
            >
              <p className="px-4 py-3">Opportunities We Are Seeking</p>
            </button>
            <button
              onClick={() => setSelected('Facilitate')}
              className={cn(
                'cursor-pointer border-b-2',
                selected === 'Facilitate'
                  ? 'border-omblue-600 text-omblue-600 font-semibold'
                  : 'text-[#797B82] border-transparent font-medium'
              )}
            >
              <p className="px-4 py-3">Opportunities We Can Facilitate</p>
            </button>
          </div>

          <Select
            className={
              'text-omblue-600 md:hidden flex-1 w-full focus-visible:outline-none'
            }
          >
            <option className="text-h9 2xl:text-scaled-h9 font-semibold">
              Opportunities We Are Seeking
            </option>
            <option className="text-h9 2xl:text-scaled-h9 font-semibold">
              Opportunities We Can Facilitate
            </option>
          </Select>

          <Link href={'/business-development/create'}>
            <Button title="Create New"></Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow grid grid-cols-12 gap-6 overflow-hidden pb-10">
        {/* Left Column */}
        <div className="col-span-12 md:col-span-4 flex flex-col overflow-hidden">
          <p className="py-4 pe-3 mb-2 text-h6 2xl:text-scaled-h6 text-blue-500 font-semibold md:block hidden">
            {selected === 'Seeking'
              ? 'Opportunities We are Seeking'
              : 'Opportunities We can Facilitate'}
          </p>
          <div className="flex-grow overflow-y-auto">
            <div className="flex flex-col gap-4">
              {businessOpportunityList?.length > 0 ?
                [...businessOpportunityList].map((item, index) => (
                  <OpportunityCard
                    key={index}
                    id={index}
                    opportunity={item}
                    onClick={() => {
                      if (isMobile) {
                        setShowDetails(index);
                      }
                    }}
                    selected={selected}
                    selectedOpportunity={selectedOppourtunity}
                    setSelectedOpportunity={setSelectedOpportunity}
                    setSelectedOpportunityUserId={setSelectedOpportunityUserId}
                    SetBusinessOpportunityList={SetBusinessOpportunityList}
                  />
                )) :
                <div className='className="flex border-b border-grey-600 p-10 justify-center text-center'>
                  No records found
                </div>
              }
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-8 md:flex hidden flex-col overflow-hidden">
          <h6 className="py-4 pe-3 mb-2 text-h6 2xl:text-scaled-h6 text-blue-500 font-semibold">
            Business Development Opportunity Matching
          </h6>
          <div className="flex-grow flex flex-col overflow-hidden">
            <div className="flex bg-omblue-25 p-3 flex-shrink-0">
              <div className="w-[40%] text-start text-blue-500 text-h9 2xl:text-scaled-h9 font-semibold">
                Profile
              </div>
              <div className="w-[30%] text-start text-blue-500 text-h9 2xl:text-scaled-h9 font-semibold">
                Status
              </div>
              <div className="w-[30%] text-start text-blue-500 text-h9 2xl:text-scaled-h9 font-semibold">
                Actions
              </div>
            </div>

            <div className="flex-grow overflow-y-auto">
              {opportunityMatch.length > 0 ? opportunityMatch?.map((data, index) => (
                <div key={index} className="flex border-b border-grey-600 p-3">
                  <div className="w-[40%]">
                    <ProfileCard
                      variant="sm"
                      name={data?.CompanyName}
                      company={data?.Tagline}
                      icon={<Crown className="w-4 h-4 text-omblue-600" />}
                      isImage={false}
                      image={`${data?.ProfilePicture ? data?.ProfilePicture : 'https://s3-alpha-sig.figma.com/img/b52e/1df2/041e981fea2ab7e77f156b65e259af97?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oJ4CI60SfZDBcEOshC-sHR0VWjSscdN-N5Fyl2p6YLJVpQNpRJhdK1wlvPo5mU5wyHJtE3UL4uONPSWQkmTO6oz6Ce5UMvaYNwfWWaxnnR9bsxaIRzoadg2-imUJSzAn-6eV6wDMqKiGzKB4zNjQ0ElOCI5~bcGrC-aBLcpqApPrqFI0D3u4r2hMW5Zx86X02b3H3LPsIQFYRQjl9CTHEYnuhH6tzkC~8p8lM-~lKqteziS6Nsh-OgwUklU0dECXvj590RCu7xUPDKv5aCdYPVrnwtIZ6j78UuJxt0wRpiwPfqpI~1EgqWkNA6iwoZMTzU~ZQMmRV-SDCLYX8BXz0Q__'}`}
                    />
                  </div>
                  <div
                    className={cn(
                      'w-[30%] text-h10 2xl:text-scaled-h10 font-medium flex items-center',
                      !data?.IsBDCreatedUserProfileMatched ? 'text-blue-500' : 'text-green-500'
                    )}
                  >
                    {data?.IsBDCreatedUserProfileMatched ? 'Mutually Matched' : 'Matched'}
                  </div>
                  <div className="w-[30%] flex items-center gap-2">
                    <button className="border border-blue-100 p-2 rounded-full">
                      <Image
                        src={index === 2 ? transfer : message}
                        alt="message"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    </button>
                    <button className="border border-danger-100 p-2 rounded-full">
                      <Image
                        src={cross}
                        alt="message"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    </button>
                  </div>
                </div>
              )) :
                <div className='className="flex border-b border-grey-600 p-10 justify-center text-center'>
                  No Business Development Opportunity Matches found
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDevelopment;
