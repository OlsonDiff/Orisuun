"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CustomTab } from "@/components";

const AllInOne = ({ isUserType }) => {
  const initialActiveIndex = isUserType ? 3 : 6;
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const iconSwiperRef = useRef(null);
  const imageSwiperRef = useRef(null);

  const allIcons = [
    { src: "/home/icons/discount-icon.svg", label: "Discount Portal" },
    { src: "/home/icons/briefcase.svg", label: "Business Development" },
    { src: "/home/icons/money-bill-coin.svg", label: "Fundraising" },
    { src: "/home/icons/users.svg", label: "Team Forming" },
    { src: "/home/icons/messages.svg", label: "Private Chats" },
    { src: "/home/icons/credit-card.svg", label: "Peer-to-peer transactions" },
    {
      src: "/home/icons/user-laptop.svg",
      label: "Customizable Public Business Profiles",
    },
    {
      src: "/home/icons/user.svg",
      label: "Customizable Public Collaborator Profiles",
    },
    { src: "/home/icons/database.svg", label: "Sophisticated Database" },
    { src: "/home/icons/founder.svg", label: "Co-founder Match" },
    { src: "/home/icons/scale.svg", label: "Board of directors match" },
    { src: "/home/icons/explore.svg", label: "Explore" },
  ];

  const allImages = [
    "/home/images/discount.svg",
    "/home/images/business-development.svg",
    "/home/images/fund-raising.svg",
    "/home/images/team-forming.svg",
    "/home/images/private-chats.svg",
    "/home/images/peer-transactions.svg",
    "/home/images/public-business.svg",
    "/home/images/public-collaborator.svg",
    "/home/images/database.svg",
    "/home/images/founder.svg",
    "/home/images/directors.svg",
    "/home/images/explore.svg",
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
    <section className="mt-[100px]">
      {isUserType && (
        <p className="text-blue-strong uppercase font-semibold leading-[17.6px] text-center mb-2 opacity-50">
          How to Build
        </p>
      )}
      <h2 className="text-center text-blue-strong text-[40px] font-semibold leading-[110%]">
        {isUserType
          ? "The tools and the team"
          : "Your all-in-one solution for every team"}
      </h2>
      {!isUserType && (
        <p className="mt-4 mb-[78px] text-[#5B657B] text-center text-xl font-medium leading-[150%]">
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
              { plan: "Growth" },
              { plan: "Visibility and collaboration" },
            ]}
          />
        </div>
      )}
      <div className="relative  px-16 items-center">
        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-[100px] bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
          <div className="absolute inset-y-0 right-0 w-[100px] bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
          <Swiper
            spaceBetween={24}
            centeredSlides={true}
            slidesPerView="auto"
            onSlideChange={handleSlideChange}
            initialSlide={initialActiveIndex}
            onSwiper={(swiper) => (iconSwiperRef.current = swiper)}
          >
            {filteredIcons.map((icon, index) => (
              <SwiperSlide
                key={index}
                onClick={() => handleIconClick(index)}
                className="max-w-[174px] mb-[63px] flex justify-center"
              >
                <div className="flex flex-col justify-center items-center ">
                  <div
                    className={`mb-3 bg-[#F5FAFF] px-[24.5px] py-[25px] rounded-[12px] cursor-pointer ${
                      index === activeIndex
                        ? "font-bold px-6 border border-[#2357C6] bg-[#F2F7FC] custom-double-shadow"
                        : ""
                    }`}
                  >
                    <Image
                      src={icon.src}
                      alt={icon.label}
                      width={44}
                      height={44}
                      className={`text-center cursor-pointer ${
                        index === activeIndex ? "opacity-100" : "opacity-50"
                      }`}
                    />
                  </div>
                  <p
                    className={`h-[78px] text-center cursor-pointer text-xl font-semibold leading-[130%] ${
                      index === activeIndex
                        ? "text-[#2357C6] "
                        : "text-[#7FAAE3]"
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

      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={handleSlideChange}
        initialSlide={initialActiveIndex}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => (imageSwiperRef.current = swiper)}
      >
        {filteredImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative px-20 mt-10">
              <Image
                src={image}
                alt={`Slide ${index}`}
                className="w-full h-auto"
                width={1134}
                height={696}
              />
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 custom-blur z-[-1]"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default AllInOne;
