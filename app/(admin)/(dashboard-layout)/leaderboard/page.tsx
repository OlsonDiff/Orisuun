'use client';

import CustomSelect from '@/components/ui/select';
import ChevronRight from '@/icons/chevron-right';
import Favourite from '@/icons/favourite';
import Globe from '@/icons/globe';
import LocationPin from '@/icons/location-pin';
import MessageIcon from '@/icons/message-icon';
import Hamburger from '@/icons/sidebar/hamburger';
import Star from '@/icons/star';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import france from '@/public/countries/france-flag.png';

const Leaderboard = () => {
  const totalCards = 10;
  const cardsPerColumn = 5;
  const columns = Math.ceil(totalCards / cardsPerColumn);
  return (
    <div className="px-2 py-5 md:p-6">
      <div className="w-full hidden items-center gap-4 justify-between mb-6">
        <Hamburger />
        <h6 className="text-h6 2xl:text-scaled-h6 font-semibold text-blue-500">
          Profiles
        </h6>
        <Link href={'/profiles/new-profile'}>
          <button className="hidden md:flex px-4 py-3 rounded-md bg-omblue-500 text-white max-w-[170px] font-semibold disabled:bg-omblue-50 disabled:text-omblue-200">
            Add Profile
          </button>
        </Link>
        <Image
          src="https://s3-alpha-sig.figma.com/img/dac5/a3ff/5be85d0f6bc0bd1a076017beb8ff1fd5?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hRU7BuxPw6dLRlu11a1lvCq5kqNtuJzOgTbSw6aJ0B-5NJ3f-4RpcweDywp6~-rBJB9WMTn2Qu2Vkcl1Zleq2dxHKHZiBKqv8uZrSU5pdk8RVIMXfBA3yFLHzIVc2npq80BUQ6YC2c1Bj1IVbPweOy2zVwYacztjf-uJTZKBUtLkLcN3QnP-uwGAOyu6AD4ZMJ1BrMwOtEmjNIwhEi4-MZPrlllgmcJOVuy8MljsvWrkou~OsICxeplqF40DjMi7tTZT0VYZR-sDXpePVqPP9R4K9liInCdKf771ifdUCKZVLwndIWy5nRUHykiiERf8Ozd7qtlbF6lKroa8h5PlIQ__"
          alt="user"
          width={32}
          height={32}
          className="rounded-full md:hidden"
        />
      </div>
      <div className="flex items-center justify-between gap-4 mb-10">
        <div className="w-full">
          <label className="text-black-500 text-h8 2xl:text-scaled-h8 font-semibold mb-1">
            Category
          </label>
          <CustomSelect
            placeholder="Select Category"
            options={[]}
            onChange={async (val) => {}}
            error={undefined}
            value={undefined}
          />
        </div>
        <div className="w-full">
          <label className="text-black-500 text-h8 2xl:text-scaled-h8 font-semibold mb-1">
            Profile Type
          </label>
          <CustomSelect
            placeholder="Select Profile Type"
            options={[]}
            onChange={async (val) => {}}
            error={undefined}
            value={undefined}
          />
        </div>
        <div className="w-full">
          <label className="text-black-500 text-h8 2xl:text-scaled-h8 font-semibold mb-1">
            Timeframe
          </label>
          <CustomSelect
            placeholder="Select Timeframe"
            options={[]}
            onChange={async (val) => {}}
            error={undefined}
            value={undefined}
          />
        </div>
        <div className="w-full">
          <label className="text-black-500 text-h8 2xl:text-scaled-h8 font-semibold mb-1">
            Location
          </label>
          <CustomSelect
            placeholder="Select Location"
            options={[]}
            onChange={async (val) => {}}
            error={undefined}
            value={undefined}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        {Array.from({ length: columns }).map((_, columnIndex) => (
          <div key={columnIndex} className="col-span-1 space-y-5">
            {Array.from({ length: cardsPerColumn }).map((_, rowIndex) => {
              const cardIndex = columnIndex * cardsPerColumn + rowIndex;
              if (cardIndex >= totalCards) return null;

              return (
                <div
                  key={cardIndex}
                  className="border border-grey-600 rounded-md flex items-center justify-between gap-6 p-4"
                >
                  <div className="text-[#E5D99A] bg-[#FFF9D9] border border-[#E5D99A] p-1 rounded-sm text-h10 2xl:text-scaled-h10 font-semibold">
                    #{cardIndex + 1}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center relative">
                      <Image
                        src="https://s3-alpha-sig.figma.com/img/ea21/e159/b04a9bd139fa644ac1f73366a8088a58?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pqGHkuzv-N2VmmNwPX5eMpRPmnosmOw5oaupUdi3WMo0fuLkIWcoJVroLH6Xc8VC8R0IQ92GEs13A8okfC1mes-0WlE8Znw9KwFMdPLL7R6sQBAwCPdG4x39hKHb1nN0XsEHRYNc36UcEohLzQWQ-3HeuoyzIggTzo6s7XhUdHlFk-QBsxXq0d-MFZvOwCm5Oe8W1jIo3D2rkq2BA23zIvpqwXK21lIyAw8odeTBXndH2DbRrsFHsgC3sWWYilEzDZxsAgznFM1gJmdkTUEEMKa3ZYZF0Q3rVkxFb7494-7fJGPPjTQQpX7tyTSWTeIunceWp-kWQZoDrz7XJeqxyA__"
                        alt="profile"
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full"
                      />
                      <div
                        title="france"
                        className="w-5 h-5 rounded-full border border-grey-600 p-1 right-10 top-10 absolute flex items-center justify-center"
                      >
                        <Image
                          src={france}
                          alt="country"
                          width={16}
                          height={16}
                          className="w-4 h-4 object-cover"
                        />
                      </div>
                    </div>
                    <p className="text-h10 2xl:text-scaled-h10 font-bold text-center text-black-500">
                      Management Consultant
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <LocationPin className="w-6 h-6 text-omblue-500" />
                      <p className="text-blue-500 text-h8 2xl:text-scaled-h8 font-medium">
                        Paris, France
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-omblue-500 ">
                      <p className="text-h8 2xl:text-scaled-h8 font-medium">
                        4.9
                      </p>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="w-4 h-4" />
                      ))}
                    </div>
                    <button className="flex items-center gap-0.5 text-blue-500">
                      <p className="text-h8 2xl:text-scaled-h8 font-medium">
                        44 Reviews
                      </p>
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <button className="text-green-500 w-full gap-1 flex items-center justify-center text-h9 2xl:text-scaled-h9 font-medium rounded-md border border-[#BBEDDE] p-2.5">
                      <Favourite className="w-4 h-4 text-green-500" /> Favorites
                    </button>
                    <button className="text-omblue-600 w-full gap-1 flex items-center justify-center text-h9 2xl:text-scaled-h9 font-medium rounded-md border border-omblue-100 p-2.5">
                      <Globe className="w-4 h-4 text-omblue-600" /> View Website
                    </button>
                    <button className="text-omblue-600 w-full gap-1 flex items-center justify-center text-h9 2xl:text-scaled-h9 font-medium rounded-md border border-omblue-100 p-2.5">
                      <MessageIcon className="w-4 h-4 text-omblue-600" />
                      Chat
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Leaderboard;
