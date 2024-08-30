'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CustomTab } from '..';

const AllInOne = ({ isUserType }) => {
  const initialActiveIndex = isUserType ? 3 : 6;
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const iconSwiperRef = useRef(null);
  const imageSwiperRef = useRef(null);

  const allIcons = [
    { src: '/home/icons/discount-icon.svg', label: 'Discount Portal' },
    { src: '/home/icons/briefcase.svg', label: 'Business Development' },
    { src: '/home/icons/money-bill-coin.svg', label: 'Fundraising' },
    { src: '/home/icons/users.svg', label: 'Team Forming' },
    { src: '/home/icons/messages.svg', label: 'Private Chats' },
    { src: '/home/icons/credit-card.svg', label: 'Peer-to-peer transactions' },
    {
      src: '/home/icons/user-laptop.svg',
      label: 'Customizable Public Business Profiles',
    },
    {
      src: '/home/icons/user.svg',
      label: 'Customizable Public Collaborator Profiles',
    },
    { src: '/home/icons/database.svg', label: 'Sophisticated Database' },
    { src: '/home/icons/founder.svg', label: 'Co-founder Match' },
    { src: '/home/icons/scale.svg', label: 'Board of directors match' },
    { src: '/home/icons/explore.svg', label: 'Explore' },
  ];

  // const smallImages = [
  //   '/home/images/discount-portal-small.svg',
  //   '/home/images/business-development-small.svg',
  //   '/home/images/fund-raising-small.svg',
  //   '/home/images/team-forming-small.svg',
  //   '/home/images/private-chats-small.svg',
  //   '/home/images/peer-to-small.svg',
  //   '/home/images/customizable-business-small.svg',
  //   '/home/images/customizable-collaborator-small.svg',
  //   '/home/images/database-small.svg',
  //   '/home/images/founder-small.svg',
  //   '/home/images/directors-small.svg',
  //   '/home/images/explore-small.svg',
  // ];

  const allImages = [
    '/home/images/discount.svg',
    '/home/images/business-development.svg',
    '/home/images/fund-raising.svg',
    '/home/images/team-forming.svg',
    '/home/images/private-chats.svg',
    '/home/images/peer-transactions.svg',
    '/home/images/public-business.svg',
    '/home/images/public-collaborator.svg',
    '/home/images/database.svg',
    '/home/images/founder.svg',
    '/home/images/directors.svg',
    '/home/images/explore.svg',
  ];

  const growthIndexes = [0, 1, 2, 9, 10, 5]; // indexes of icons for Growth
  const visibilityIndexes = [3, 4, 6, 7, 8, 11]; // indexes of icons for Visibility and Collaboration

  const filteredIcons = isUserType
    ? selectedIndex === 0
      ? growthIndexes.map((i) => allIcons[i])
      : visibilityIndexes.map((i) => allIcons[i])
    : allIcons;

  const filteredImages = isUserType
    ? selectedIndex === 0
      ? growthIndexes.map((i) => allImages[i])
      : visibilityIndexes.map((i) => allImages[i])
    : allImages;

  useEffect(() => {
    if (isUserType) {
      setActiveIndex(3);
      if (imageSwiperRef.current && iconSwiperRef.current) {
        imageSwiperRef.current.slideTo(3);
        iconSwiperRef.current.slideTo(3);
      }
    } else {
      setActiveIndex(6);
      if (imageSwiperRef.current && iconSwiperRef.current) {
        imageSwiperRef.current.slideTo(6);
        iconSwiperRef.current.slideTo(6);
      }
    }
  }, [isUserType, selectedIndex]);

  const handleIconClick = (index) => {
    setActiveIndex(index);
    if (imageSwiperRef.current && iconSwiperRef.current) {
      imageSwiperRef.current.slideTo(index);
      iconSwiperRef.current.slideTo(index);
    }
  };

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
    if (imageSwiperRef.current && iconSwiperRef.current) {
      if (imageSwiperRef.current.activeIndex !== swiper.activeIndex) {
        imageSwiperRef.current.slideTo(swiper.activeIndex);
      }
      if (iconSwiperRef.current.activeIndex !== swiper.activeIndex) {
        iconSwiperRef.current.slideTo(swiper.activeIndex);
      }
    }
  };

  return (
    <section className="relative mt-[120px] md:mt-[100px] max-w-[1440px] 3xl:max-w-[1600px] 2k:max-w-[1800px]'} w-full mx-auto">
      {isUserType && (
        <p className="text-blue-strong uppercase font-semibold leading-[17.6px] text-center mb-2 opacity-50">
          How to Build
        </p>
      )}
      <h2 className="text-center text-blue-strong text-[40px] font-semibold leading-[110%] hidden md:block">
        {isUserType
          ? 'The tools and the team'
          : 'Your all-in-one solution for every team'}
      </h2>

      <h2 className="text-center text-blue-strong text-[24px] font-semibold leading-[28.8px] md:hidden">
        {isUserType ? 'The tools and the team' : 'Your all-in-one solution '}
      </h2>
      {!isUserType && (
        <p className="mt-4 mb-[40px] md:mb-[78px] text-[#5B657B] text-center text-base  md:text-xl font-medium md:leading-[150%]">
          Psst! This is your new main business tool
        </p>
      )}
      {isUserType && (
        <div className="w-full grid justify-center my-12">
          <CustomTab
            className="!grid-cols-2 md:!w-[550px]"
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            tabList={[
              { plan: 'Growth' },
              { plan: 'Visibility and collaboration' },
            ]}
          />
        </div>
      )}
      <div className="relative mb-[70px] md:px-16 items-center">
        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-[53px] md:w-[100px] bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
          <div className="absolute inset-y-0 right-0 w-[53px]  md:w-[100px] bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
          <Swiper
            spaceBetween={24}
            breakpoints={{
              640: {
                spaceBetween: 24, // spaceBetween value for screens larger than 640px
              },
              0: {
                spaceBetween: 32, // spaceBetween value for screens smaller than 640px
              },
            }}
            centeredSlides={true}
            slidesPerView="auto"
            onSlideChange={handleSlideChange}
            initialSlide={initialActiveIndex}
            onSwiper={(swiper) => (iconSwiperRef.current = swiper)}
          >
            {[...filteredIcons].map((icon, index) => (
              <SwiperSlide
                key={index}
                onClick={() => handleIconClick(index)}
                className="max-w-[120px] md:max-w-[174px]  flex justify-center"
              >
                <div className="flex flex-col justify-center items-center ">
                  <div
                    className={`mb-3 bg-[#F5FAFF] px-[15px] py-[18px] md:px-[24.5px] md:py-[25px] rounded-[12px] cursor-pointer ${
                      index === activeIndex
                        ? 'font-bold px-6 border border-[#2357C6] bg-[#F2F7FC] custom-double-shadow'
                        : ''
                    }`}
                  >
                    <Image
                      src={icon.src}
                      alt={icon.label}
                      width={44}
                      height={44}
                      className={`text-center cursor-pointer ${
                        index === activeIndex ? 'opacity-100' : 'opacity-50'
                      }`}
                    />
                  </div>
                  <p
                    className={`md:h-[78px] text-[14px] leading-[18.2px] text-center cursor-pointer md:text-xl font-semibold md:leading-[130%] ${
                      index === activeIndex
                        ? 'text-[#2357C6] '
                        : 'text-[#7FAAE3]'
                    }`}
                  >
                    {icon.label}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {/* <div className="md:py-20"> */}
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={handleSlideChange}
        initialSlide={initialActiveIndex}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => (imageSwiperRef.current = swiper)}
      >
        {[...filteredImages].map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative flex justify-center px-4 md:px-20 ">
              <Image
                src={image}
                alt={`Slide ${index}`}
                className="responsive-svg "
                width={1134}
                height={696}
                loading="eager"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 50vw"
                quality={100} //
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* </div> */}

      <Image
        src="/home/images/blurs.svg"
        width={1152}
        height={768}
        className="absolute bottom-[0px] xl:-bottom-[85px] 2xl:-bottom-[9.5rem]  z-0  xl:w-full xl:h-auto  2xl:right-0   "
        loading="eager"
        alt="blur"
      />
    </section>
  );
};

export default AllInOne;
