'use client';

import React, { useRef, useState, useEffect } from 'react';
import ProfileCard from '@/components/cards/profile-card';
import ChevronRight from '@/icons/chevron-right';
import Favourite from '@/icons/favourite';
import Image from 'next/image';
import favourite from '@/public/images/vector/favourite.svg';
import Crown from '@/icons/crown';

const tabs = [
  'All',
  'Experts',
  'Consultants',
  'Professionals',
  'Businesses',
  'Mentor',
];

const Favourites = () => {
  const [selected, setSelected] = useState(tabs[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const nextIndex = (currentIndex + 1) % tabs.length;
      const tabElement = tabRefs.current[nextIndex];

      if (tabElement) {
        tabElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });

        setCurrentIndex(nextIndex);
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            const index = Number(entry.target.dataset.index);
            if (!isNaN(index)) {
              setCurrentIndex(index);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const currentTabRefs = tabRefs.current;

    Object.values(currentTabRefs).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(currentTabRefs).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="shadow-custom-combined border border-[#E3E3E2] rounded-xl overflow-hidden py-4 h-[300px] 2xl:h-[calc(300px*var(--scale-factor))] flex flex-col p-4">
      <h6 className="text-h6 2xl:text-scaled-h6 text-blue-500 font-semibold mb-4">
        Favourites
      </h6>
      <div className="relative h-32 2xl:h-scaled-32">
        <div
          className="flex items-center gap-2 text-h9 2xl:text-scaled-h9 mb-4 overflow-x-auto hide-scrollbar pr-12"
          ref={scrollContainerRef}
        >
          {tabs.map((tab, index) => (
            <p
              key={`${tab}-${index}`}
              ref={(el: HTMLParagraphElement | null) => {
                tabRefs.current[index] = el;
              }}
              data-index={index}
              onClick={() => setSelected(tab)}
              className={`border-b-2 p-3 w-60 2xl:w-scaled-60 cursor-pointer whitespace-nowrap ${
                selected === tab
                  ? 'text-omblue-600 border-omblue-600 font-semibold'
                  : 'text-[#797B82] border-transparent font-medium'
              }`}
            >
              {tab}
            </p>
          ))}
        </div>
        <div
          onClick={handleScroll}
          className="cursor-pointer absolute -top-2 right-0 h-full flex items-center bg-gradient-to-l from-white via-white to-transparent pr-2"
        >
          <ChevronRight className="text-gray-500" />
        </div>
      </div>
      {true ? (
        <div className="flex items-center gap-4 flex-wrap overflow-y-scroll hide-scrollbar">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 border border-grey-600 rounded-md p-4"
            >
              <ProfileCard
                image="https://s3-alpha-sig.figma.com/img/cbae/1550/7d62b2c9ff8b51ac3a648cf214d14866?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i~bWF51sL~Ea6i9xoKCrSlpWpNTVRs06JEiiDimjkoE-n-OvY3hQ2Dxs3vxoUzcgZpYdU5pDJdc306k0tczrhtxSiyXIK~4bX7c6fdbYdFrs-mlxW2Ix3kHqejNlXMd8XkaI9MFf1sNtVjxnWXNugcTdCW3neMT1WTHWNTPQwoEoSitLADQ0Vg~rAV~H~W3Klme7s5kCT20Mrtc9FtMU2Lrnc4CLw3wAaJpR09T~tfe1h379n7bpbp~BO-pnt-DprISw56ixiLSBo7txwoCdTkLK2smVEHny55OvZeFtOKf-K~ebDoESiiC8UZrfFHXzRCERbOdJCzNTFdLeMJG73Q__"
                name={'Amirah'}
                company={'Startup Attorney'}
                variant="sm"
                icon={<Crown className="w-4 h-4 text-omblue-500" />}
                isImage={false}
              />
              <button className="border p-2 rounded-full border-green-400 bg-green-100">
                <Favourite className="text-green-500" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <Image
            src={favourite}
            alt="handshake"
            width={32}
            height={32}
            className="mx-auto"
          />
          <p className="text-h9 2xl:text-scaled-h9 font-medium text-blue-400 mx-auto">
            No favorites profiles found.
          </p>
        </div>
      )}
    </div>
  );
};

export default Favourites;
