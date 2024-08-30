import Image from 'next/image';
import WhatWeOffer from '../../../../public/what we offer/what_we_offer_main.png';

export const Explore = () => {
  return (
    <section className="flex w-full h-full lg:flex-row md:flex-col sm:flex-col small-500:flex-col md:gap-[60px] lg:justify-between">
      <div className="w-full flex flex-col justify-start items-start md:w-[585px] lg:pt-[170px] md:pt-[40px] small-500:pt-[40px] small-500:px-4 order-1 lg:order-1">
        <h1 className="text-blue-strong font-semibold leading-110 mb-[60px] xl:text-[48px] lg:text-[36px] md:text-[48px] sm:text-[28px] text-[28px] ">
          Explore what comes with an Orisuun subscription:
        </h1>
        <div className="w-full lg:flex md:flex sm:hidden small-500:hidden">
          <div className=" h-full flex flex-col items-start gap-3">
            <h3 className="text-[#2357C6] text-[20px] font-semibold leading-[26px]">
              Site functionality
            </h3>
            <p className="text-blu-ray-300 text-[20px] font-medium leading-150 ">
              The tools on the site that allow for discovery, communication, and
              connection
            </p>
          </div>
          <div className="border-l border-[#D8D9D9] mx-10"></div>
          <div className="h-full flex flex-col items-start gap-3">
            <h3 className="text-[#2357C6] text-[20px] font-semibold leading-[26px]">
              Site features
            </h3>
            <p className="text-blu-ray-300 text-[20px] font-medium leading-150">
              Exclusive groups offering invaluable resources tailored
              specifically for our members.
            </p>
          </div>
        </div>
      </div>
      <div className="relative xl:pb-[31px] lg:pt-[0px] lg:pb-[31px] order-2 lg:order-2 rounded-[25px]">
        <div className="w-full relative top-0 z-10 ">
          <Image
            alt="icon"
            src={WhatWeOffer}
            loading="lazy"
            className="w-full  z-10"
          />
        </div>
      </div>
    </section>
  );
};
