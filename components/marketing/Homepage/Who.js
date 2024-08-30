'use client';

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';

const UsersTags = [
  // The People
  {
    tagTitle: 'The People',
    tagNote: [],
    btnTags: [],
    tagDescription:
      'Those out there who want to support Black-owned businesses through patronage. They are your new customers and clients.',
    tagRole: [
      'They use the Search and Explore functions on our database to find Black-owned businesses to buy from',
      'They contribute to fundraising campaigns',
      'They provide valuable feedback to the businesses they visit',
    ],
    img: '/home/images/image-one-mobile.png',
  },
  // The Professionals
  {
    tagTitle: 'The Professionals',
    tagNote: [],
    btnTags: [
      'Can be verified',
      'Access to Team Forming',
      'Have option to charge for services',
    ],
    tagDescription:
      'Those currently licensed and practicing in regulated fields such as law, accounting, architecture, information technology, engineering, finance, journalism, marketing, and many others.',
    tagRole: [
      'The professionals on the platform are experienced operators. They are ready to help with the problem of the day, month, or year.',
      'These are the standardizers – they’re going make sure regular business functions are operating properly. They can lighten your load.',
    ],
    img: '/home/images/image-two-mobile.png',
  },
  // The Experts
  {
    tagTitle: 'The Experts',
    tagNote: [],
    btnTags: [
      'Can be verified',
      'Access to Team Forming',
      'Have option to charge',
    ],
    tagDescription:
      'Those recognized and credentialed individuals (or small organizations) who can confidently claim to be among the top of their field.',
    tagRole: [
      'The key resource in taking an idea to its maximum potential.',
      'These are the clarifiers and elevators – they’re going to sharpen your ideas with perspective and insight.',
    ],
    img: '/home/images/image-three-mobile.png',
  },
  // The Mentors
  {
    tagTitle: 'The Mentors',
    btnTags: [
      'Can be verified',
      'Access to Team Forming',
      'Have option to charge',
    ],
    tagDescription:
      'Those accomplished business people who have succeeded in starting or running a business*.',
    tagNote: [
      'The business must have reached three years of positive net income and revenues over $1 million under the leadership of the mentor.',
      '*High-level executives at multinational corporations also qualify to serve as mentors.',
    ],
    tagRole: [
      'These are the teachers – they’re going to help you avoid easily-made mistakes.',
      'Mentors are meant to guide on business decisions. To foster deep knowledge of a business’s history and trajectory, mentorships should be an ongoing relationship that increase in value over time.',
    ],
    img: '/home/images/image-four-mobile.png',
  },
  // management consultants
  {
    tagTitle: 'The Management Consultants',
    tagNote: [],
    btnTags: [
      'Can be verified',
      'Access to Team Forming',
      'Have option to charge',
    ],
    tagDescription:
      'Those accomplished and practicing management consultants currently or recently employed at a national-level management consulting firm. Students at select graduate-level business schools also qualify.',
    tagRole: [
      'Research specific business issues and report back with detailed models, plans, and options.',
      'Keep your business ahead of the competition with strategic planning.',
    ],
    img: '/home/images/image-five-mobile.png',
  },
  // The Partners
  {
    tagTitle: 'The Partners',
    tagNote: [],
    btnTags: ['Can be verified', 'Access to Team Forming'],
    tagDescription: 'Large and multinational corporations',
    tagRole: [
      'Our partners are here to support on an institutional level. They’re matching campaign donations, they’re bringing you into their organization as a vendor, and they’re giving you access to all of the professional talent at their firms.',
      'They are also the cost cutters - our Discount Portal is full of special offers from our partners, who are eager to help you grow.',
    ],
    img: '/home/images/image-six-mobile.png',
  },
  // The Investors
  {
    tagTitle: 'The Investors',
    tagNote: [],
    btnTags: ['Can be verified', 'Access to Team Forming'],
    tagDescription:
      'Those established and professional investors and institutions actively searching impactful investment opportunities.',
    tagRole: [
      'These are the revenue growers – they’re going to provide growth capital and set you up for success.',
    ],
    img: '/home/images/image-seven-mobile.png',
  },
  // The Black-Owned Businesses
  {
    tagTitle: 'The Black-Owned Businesses',
    tagNote: [],
    btnTags: ['Can be verified', 'Access to Team Forming'],
    tagDescription:
      'Those privately-owned businesses around the world with at least 25% Black ownership. These businesses may operate in any industry and be any size.',
    tagRole: [
      'The platform is designed to help these businesses find the resources to expand and scale.',
    ],
    img: '/home/images/image-eight-mobile.png',
  },
  // The People
];

const Who = () => {
  const image = [
    { img: '/home/images/slide-image-1.png' },
    { img: '/home/images/slide-image-2.png' },
    { img: '/home/images/slide-image-3.png' },
    { img: '/home/images/slide-image-4.png' },
    { img: '/home/images/slide-image-5.png' },
    { img: '/home/images/slide-image-6.png' },
    { img: '/home/images/slide-image-7.png' },
    { img: '/home/images/slide-image-8.png' },
  ];

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <main ref={container} className="relative top-[60px] h-[7800px] my-[100px]">
      <div className="pt-[60px] px-[80px] pb-[80px] hidden bg-[#F2F7FC] md:flex flex-col justify-center items-center rounded-[25px]">
        <div>
          <h3 className="text-blue-strong text-center text-[40px]  font-semibold leading-[110%]">
            Who&apos;s on Orisuun
          </h3>
          {image.map((Each, i) => {
            const targetScale = 1 - (image.length - i) * 0.02;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                {...Each}
                progress={scrollYProgress}
                // range={[i * 0.1, 1]}
                range={[i * 0.1, i * 0.1 + 0.15]}
                targetScale={targetScale}
              />
            );
          })}
        </div>
      </div>
      <div className="bg-[#F2F7FC] md:hidden px-5 pb-10">
        <h3 className="text-blue-strong font-semibold text-center text-[24px] leading-[28.8px] pt-10 pb-8">
          Who&apos;s on Orisuun
        </h3>

        {UsersTags.map((users, index) => {
          const { tagTitle, tagDescription, tagNote, tagRole, img } = users;
          return (
            <div
              key={index}
              className="shadow-md rounded-[8px] px-5 bg-white mt-[28px] mb-[16px]"
            >
              <div className="pt-7">
                <h1 className="font-semibold text-[20px] leading-[22px] text-blue-strong">
                  {tagTitle}
                </h1>
                <p className="font-medium text-base text-[#6e6e6e] mt-3 text-left">
                  {tagDescription}
                </p>
                {tagNote.length > 0 && (
                  <div className="flex flex-col space-y-5 mt-5">
                    {tagNote.map((note, index) => {
                      return (
                        <div
                          key={index}
                          className="bg-[#F8F8F8]  py-2 px-3 rounded-lg"
                        >
                          <p className="text-[#5C5C5C] text-sm leading-[18.2px] font-medium">
                            {note}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className="mt-8">
                  <h2 className="text-blue-strong font-semibold text-base leading-[20.8px]">
                    Role on Orisuun
                  </h2>
                  <div className="flex flex-col gap-3 mt-5">
                    {tagRole.map((role, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-start border-l border-[#6e6e6e] "
                        >
                          <div className="max-h-fit ">
                            <p className="text-gray-600 text-base font-medium  pl-2">
                              {role}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="w-full h-full">
                    <Image
                      src={img}
                      layout="responsive"
                      loading="lazy"
                      width={248}
                      height={264}
                      objectFit="cover"
                      alt={`${tagTitle} image`}
                      className={`w-full h-full pb-4 ${
                        index === 5 ? '-mt-16' : ''
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Who;

const Card = ({ i, img, progress, range, targetScale }) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-0 flex items-center justify-center overflow-hidden">
      <motion.div
        style={{
          scale,
          top: `calc(15vh + ${i * 10}px)`,
        }}
        className="relative origin-top !h-[950px]"
      >
        <Image
          src={img}
          alt={`image-${i}`}
          width={1720}
          height={780}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
};
