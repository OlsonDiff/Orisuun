'use client';

import ProfileCard from '@/components/cards/profile-card';
import CustomSelect from '@/components/ui/select';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import handshake from '@/public/images/vector/handshake.svg';
import message from '@/public/images/vector/message.svg';
import cross from '@/public/images/vector/cross.svg';
import exhange from '@/public/images/vector/exhange.svg';
import Crown from '@/icons/crown';
import { cn } from '@/utils/utils';
import Consultant from '@/icons/consultant';
import { getBDMatchingList } from '@/server-actions/dashboard';
import { useSelector } from 'react-redux';
import { RootState } from '@/data/store';

const icons = {
  consultant: <Consultant className="w-4 h-4 text-omblue-500" />,
  'digital-agency': <Crown className="w-4 h-4 text-omblue-500" />,
  'electrical-engineering': <Consultant className="w-4 h-4 text-omblue-500" />,
};

const sections = [
  'Business Development Opportunity Matches',
  'Co-founder Matches',
  'Board Member Matches',
];

const Dummydata = [
  {
    name: 'Market Penetration',
    user: {
      image:
        'https://s3-alpha-sig.figma.com/img/b52e/1df2/041e981fea2ab7e77f156b65e259af97?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U7STpJUR5ty2Hsr9TfO5RcoNReT3noz59LCA~smDDE5Ayx-LchEsyC3RoO4-bvOOKV2CVYWICImMMh~1QR8pbtyXVKAqetar9b2sr3OpJc-L9aFxoo2BtENYtTV~nNXze4oah1yfoocn725Bs9-3TgBetoeqTpx7zZ5r-kpZDtUs07hE4kMB-BW4DBvR~AmgMQMl0IWHJkktYRXToWtEsNY~tbzreDqzuL5~6hV-vzLtspxdlHUniZXLs-kiCbq2sxWYxI6Mz7uK3vKAEB-UQrNSzlc4avFxxci92GytKv0lfcC42U6GGrE8gKaSONAXrx2-71zIGZmJnDk6gLV76A__',
      name: 'Brooks Orozco',
      icon: 'consultant',
      company: 'Consultant',
    },
    status: 'Mutually Matched',
  },
  {
    name: 'Market Expansion',
    user: {
      image:
        'https://s3-alpha-sig.figma.com/img/b52e/1df2/041e981fea2ab7e77f156b65e259af97?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U7STpJUR5ty2Hsr9TfO5RcoNReT3noz59LCA~smDDE5Ayx-LchEsyC3RoO4-bvOOKV2CVYWICImMMh~1QR8pbtyXVKAqetar9b2sr3OpJc-L9aFxoo2BtENYtTV~nNXze4oah1yfoocn725Bs9-3TgBetoeqTpx7zZ5r-kpZDtUs07hE4kMB-BW4DBvR~AmgMQMl0IWHJkktYRXToWtEsNY~tbzreDqzuL5~6hV-vzLtspxdlHUniZXLs-kiCbq2sxWYxI6Mz7uK3vKAEB-UQrNSzlc4avFxxci92GytKv0lfcC42U6GGrE8gKaSONAXrx2-71zIGZmJnDk6gLV76A__',
      name: 'Consultant Team',
      icon: 'digital-agency',
      company: 'Digital Agency',
    },
    status: 'Matched',
  },
  {
    name: 'Product Development',
    user: {
      image:
        'https://s3-alpha-sig.figma.com/img/b52e/1df2/041e981fea2ab7e77f156b65e259af97?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U7STpJUR5ty2Hsr9TfO5RcoNReT3noz59LCA~smDDE5Ayx-LchEsyC3RoO4-bvOOKV2CVYWICImMMh~1QR8pbtyXVKAqetar9b2sr3OpJc-L9aFxoo2BtENYtTV~nNXze4oah1yfoocn725Bs9-3TgBetoeqTpx7zZ5r-kpZDtUs07hE4kMB-BW4DBvR~AmgMQMl0IWHJkktYRXToWtEsNY~tbzreDqzuL5~6hV-vzLtspxdlHUniZXLs-kiCbq2sxWYxI6Mz7uK3vKAEB-UQrNSzlc4avFxxci92GytKv0lfcC42U6GGrE8gKaSONAXrx2-71zIGZmJnDk6gLV76A__',
      name: 'Expert Team',
      icon: 'digital-agency',
      company: 'Business Development Expert',
    },
    status: 'Mutually Matched',
  },
  {
    name: 'Market Expansion',
    user: {
      image:
        'https://s3-alpha-sig.figma.com/img/b52e/1df2/041e981fea2ab7e77f156b65e259af97?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U7STpJUR5ty2Hsr9TfO5RcoNReT3noz59LCA~smDDE5Ayx-LchEsyC3RoO4-bvOOKV2CVYWICImMMh~1QR8pbtyXVKAqetar9b2sr3OpJc-L9aFxoo2BtENYtTV~nNXze4oah1yfoocn725Bs9-3TgBetoeqTpx7zZ5r-kpZDtUs07hE4kMB-BW4DBvR~AmgMQMl0IWHJkktYRXToWtEsNY~tbzreDqzuL5~6hV-vzLtspxdlHUniZXLs-kiCbq2sxWYxI6Mz7uK3vKAEB-UQrNSzlc4avFxxci92GytKv0lfcC42U6GGrE8gKaSONAXrx2-71zIGZmJnDk6gLV76A__',
      name: 'Maya Finley',
      icon: 'electrical-engineering',
      company: 'Electrical Engineering',
    },
    status: 'Matched',
  },
];

const NoData = () => {
  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <Image
          src={handshake}
          alt="handshake"
          width={32}
          height={32}
          className="mx-auto"
        />
        <p className="text-h9 2xl:text-scaled-h9 font-medium text-blue-400 mx-auto">
          No business development match found.
        </p>
      </div>
    </div>
  );
};

const BusinessDevelopment = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [selected, setSelected] = useState(0);
  const [data, setData] = useState(Dummydata);

  const fetchBDMatch = useCallback(async () => {
    try {
      const response = await getBDMatchingList(currentUser.UserId);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      fetchBDMatch();
    }
  }, [selected, currentUser, fetchBDMatch]);
  return (
    <div className="shadow-custom-combined border border-[#E3E3E2] rounded-xl h-[332px] 2xl:h-[calc(332px*var(--scale-factor))] flex flex-col">
      <h6 className="text-h6 md:text-scaled-h6 text-blue-500 font-semibold mb-4 pt-4 px-4">
        Posts
      </h6>
      <div className="md:flex mb-4 hidden">
        {sections.map((section, index) => (
          <p
            key={index}
            onClick={() => setSelected(index)}
            className={cn(
              'flex-grow text-h9 2xl:text-scaled-h9 cursor-pointer font-semibold text-omblue-600 py-3 px-4 border-b-2 transition-all',
              selected === index ? 'border-omblue-600' : 'border-transparent'
            )}
          >
            {section}
          </p>
        ))}
      </div>

      <div className="block md:hidden mb-4 px-4">
        <CustomSelect
          options={[
            {
              label: 'Business Development Opportunity Matches',
              value: 'Business Development Opportunity Matches',
            },
            {
              label: 'Co-founder Matches',
              value: 'Co-founder Matches',
            },
            {
              label: 'Board Member Matches',
              value: 'Board Member Matches',
            },
          ]}
          onChange={(e) => console.log(e)}
          error={undefined}
          value={undefined}
          placeholder="Business Development Opportunity Matches"
        />
      </div>

      {/* Desktop view */}
      <div className="hidden md:flex flex-col flex-grow overflow-hidden pb-4">
        <div className="grid grid-cols-12 bg-omblue-25">
          <div className="col-span-3 p-3 text-blue-500 text-h9 2xl:text-scaled-h9 font-semibold">
            BD Opportunity
          </div>
          <div className="col-span-3 p-3 text-blue-500 text-h9 2xl:text-scaled-h9 font-semibold">
            Profile
          </div>
          <div className="col-span-3 p-3 text-blue-500 text-h9 2xl:text-scaled-h9 font-semibold">
            Status
          </div>
          <div className="col-span-3 p-3 text-blue-500 text-h9 2xl:text-scaled-h9 font-semibold">
            Actions
          </div>
        </div>

        {data.length > 0 ? (
          <div className="flex flex-col overflow-y-scroll hide-scrollbar">
            {data.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 border-b border-grey-600"
              >
                <div className="col-span-3">
                  <p className="p-3 text-h10 2xl:text-scaled-h10 font-semibold flex items-center text-black-500">
                    {item.name}
                  </p>
                </div>
                <div className="col-span-3">
                  <div className="p-3 flex items-center">
                    <ProfileCard
                      variant="sm"
                      name={item.user?.name}
                      company={item.user?.company}
                      // @ts-ignore
                      icon={item.user?.icon ? icons[item.user?.icon] : null}
                      isImage={false}
                      image={item.user.image}
                    />
                  </div>
                </div>
                <div className="col-span-3">
                  <p
                    className={cn(
                      'p-3 text-h10 2xl:text-scaled-h10 font-medium flex items-center',
                      item.status === 'Matched'
                        ? 'text-blue-500'
                        : 'text-green-500'
                    )}
                  >
                    {item.status}
                  </p>
                </div>
                <div className="col-span-3">
                  <div className="p-3 text-h9 2xl:text-scaled-h9 font-semibold text-olblue-500">
                    <div className="flex items-center gap-2">
                      {item.status === 'Matched' ? (
                        <button className="border border-blue-100 p-2 rounded-full">
                          <Image
                            src={exhange}
                            alt="message"
                            width={16}
                            height={16}
                            className="w-4 h-4 2xl:w-scaled-2.5 2xl:h-scaled-2.5"
                          />
                        </button>
                      ) : (
                        <button className="border border-blue-100 p-2 rounded-full">
                          <Image
                            src={message}
                            alt="message"
                            width={16}
                            height={16}
                            className="w-4 h-4 2xl:w-scaled-2.5 2xl:h-scaled-2.5"
                          />
                        </button>
                      )}
                      <button className="border border-danger-100 p-2 rounded-full">
                        <Image
                          src={cross}
                          alt="message"
                          width={16}
                          height={16}
                          className="w-4 h-4 2xl:w-scaled-2.5 2xl:h-scaled-2.5"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoData />
        )}
      </div>

      <div className="flex w-full md:hidden flex-col items-center px-4 py-2">
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

          {/* Mobile view */}

          <div className="flex items-center justify-between gap-2">
            <ProfileCard
              variant="sm"
              name="Brooks Orozco"
              company="Consultant"
              image="https://s3-alpha-sig.figma.com/img/b52e/1df2/041e981fea2ab7e77f156b65e259af97?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oJ4CI60SfZDBcEOshC-sHR0VWjSscdN-N5Fyl2p6YLJVpQNpRJhdK1wlvPo5mU5wyHJtE3UL4uONPSWQkmTO6oz6Ce5UMvaYNwfWWaxnnR9bsxaIRzoadg2-imUJSzAn-6eV6wDMqKiGzKB4zNjQ0ElOCI5~bcGrC-aBLcpqApPrqFI0D3u4r2hMW5Zx86X02b3H3LPsIQFYRQjl9CTHEYnuhH6tzkC~8p8lM-~lKqteziS6Nsh-OgwUklU0dECXvj590RCu7xUPDKv5aCdYPVrnwtIZ6j78UuJxt0wRpiwPfqpI~1EgqWkNA6iwoZMTzU~ZQMmRV-SDCLYX8BXz0Q__"
            />
            <div className="flex items-center gap-2">
              <button className="border border-blue-100 p-2 rounded-full">
                <Image src={message} alt="message" width={16} height={16} />
              </button>
              <button className="border border-danger-100 p-2 rounded-full">
                <Image src={cross} alt="message" width={16} height={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDevelopment;
