import ProfileCard from '@/components/cards/profile-card';
import Image from 'next/image';
import React from 'react';
import star from '@/public/images/vector/star.svg';
import thumbsUp from '@/public/images/vector/thumbs-up.svg';
import Crown from '@/icons/crown';
import Star from '@/icons/star';

const Rating = () => {
  return (
    <div className="shadow-custom-combined border border-[#E3E3E2] rounded-xl p-4 h-[332px] 2xl:h-[calc(332px*var(--scale-factor))] flex flex-col">
      <h6 className="text-h6 2xl:text-scaled-h6 text-blue-500 font-semibold mb-4">
        Latest Ratings
      </h6>

      <div className="flex flex-col flex-grow overflow-hidden">
        <div className="grid grid-cols-12 bg-omblue-25 p-3">
          <div className="col-span-6 text-start text-blue-500 text-h9 2xl:text-scaled-h9 font-semibold">
            Profile
          </div>
          <div className="col-span-3 text-start text-blue-500 text-h9 2xl:text-scaled-h9 font-semibold">
            Rating
          </div>
          <div className="col-span-3 text-start text-blue-500 text-h9 2xl:text-scaled-h9 font-semibold">
            Status
          </div>
        </div>

        {true ? (
          <div className="overflow-y-scroll hide-scrollbar">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-12 border-b border-grey-600 p-3"
              >
                <div className="col-span-6">
                  <ProfileCard
                    variant="sm"
                    name="Brooks Orozco"
                    company="Consultant"
                    icon={<Crown className="w-4 h-4 text-omblue-500" />}
                    isImage={false}
                    image="https://s3-alpha-sig.figma.com/img/b52e/1df2/041e981fea2ab7e77f156b65e259af97?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oJ4CI60SfZDBcEOshC-sHR0VWjSscdN-N5Fyl2p6YLJVpQNpRJhdK1wlvPo5mU5wyHJtE3UL4uONPSWQkmTO6oz6Ce5UMvaYNwfWWaxnnR9bsxaIRzoadg2-imUJSzAn-6eV6wDMqKiGzKB4zNjQ0ElOCI5~bcGrC-aBLcpqApPrqFI0D3u4r2hMW5Zx86X02b3H3LPsIQFYRQjl9CTHEYnuhH6tzkC~8p8lM-~lKqteziS6Nsh-OgwUklU0dECXvj590RCu7xUPDKv5aCdYPVrnwtIZ6j78UuJxt0wRpiwPfqpI~1EgqWkNA6iwoZMTzU~ZQMmRV-SDCLYX8BXz0Q__"
                  />
                </div>
                <div className="col-span-3 font-medium text-black-500">
                  <div className="flex items-center gap-0.5 mb-1">
                    <Star className="w-4 h-4 text-omblue-500" />
                    <p className="text-h7 2xl:text-scaled-h7">4.0</p>
                  </div>
                  <p className="text-h10 2xl:text-scaled-h10 font-normal text-blue-300">
                    Satisfied
                  </p>
                </div>
                <div className="col-span-3 text-h9 2xl:text-scaled-h9 font-medium text-green-400">
                  <p>Private</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-4">
              <Image
                src={thumbsUp}
                alt="handshake"
                width={32}
                height={32}
                className="mx-auto"
              />
              <p className="text-h9 2xl:text-scaled-h9 font-medium text-blue-400 mx-auto">
                No ratings found.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rating;
