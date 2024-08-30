'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useAnimation,
  LazyMotion,
  domAnimation,
} from 'framer-motion';

export const BlackOwned = () => {
  const sectionRef = useRef(null);
  const [sectionTop, setSectionTop] = useState(0);
  const [isScrollingPaused, setIsScrollingPaused] = useState(false);
  // const { scrollY } = useScroll();
  // const controls = useAnimation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setSectionTop(rect.top + window.pageYOffset);
      }
    }
  }, []);

  const sectionHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

  // const progress = useTransform(
  //   scrollY,
  //   [sectionTop - sectionHeight, sectionTop + sectionHeight],
  //   [0, 1]
  // );

  // useEffect(() => {
  //   const handleScroll = (event) => {
  //     if (isScrollingPaused) {
  //       event.preventDefault();
  //     }
  //   };

  //   if (typeof window !== 'undefined') {
  //     window.addEventListener('scroll', handleScroll, { passive: false });
  //   }

  //   return () => {
  //     if (typeof window !== 'undefined') {
  //       window.removeEventListener('scroll', handleScroll);
  //     }
  //   };
  // }, [isScrollingPaused]);

  // useEffect(() => {
  //   const unsubscribe = progress.onChange((value) => {
  //     if (value >= 0.5 && value < 0.8) {
  //       setIsScrollingPaused(true);
  //     } else {
  //       setIsScrollingPaused(false);
  //     }

  //     if (value >= 1) {
  //       controls.start({ opacity: 1, transition: { duration: 1 } });
  //     } else {
  //       controls.start({ opacity: 0, transition: { duration: 1 } });
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [progress, controls]);

  // const leftX = useTransform(progress, [0, 0.5, 1], ['-100vw', '0vw', '0vw']);
  // const rightX = useTransform(progress, [0, 0.5, 1], ['100vw', '0vw', '0vw']);

  // const rotate = useTransform(progress, [0, 0.5], [0, 45]);
  // Final static values
  const leftX = '0vw';
  const rightX = '0vw';
  const rotate = '45deg';

  return (
    <section
      ref={sectionRef}
      className="px-4 md:px-12 hidden md:block relative"
    >
      {/* <div className="h-screen flex items-center justify-center relative">
        <LazyMotion features={domAnimation}>
          <motion.div
            style={{ x: leftX }}
            className="absolute"
            transition={{ type: 'spring', stiffness: 30, damping: 20 }}
          >
            <Image
              src="/about/icons/star2.svg"
              alt="left star"
              width={272}
              height={268}
            />
          </motion.div>
          <motion.div
            style={{ x: rightX, rotate }}
            className="absolute"
            transition={{ type: 'spring', stiffness: 30, damping: 20 }}
          >
            <Image
              src="/about/icons/star1.svg"
              alt="right star"
              width={169}
              height={166}
            />
          </motion.div>
        </LazyMotion>
      </div> */}
      <div className="bg-about h-[375px] rounded-[12px] mb-[150px]">
        <div className="bg-[url('/about/icons/circle5.svg')] bg-no-repeat bg-left-top w-full h-full">
          <div className="md:bg-[url('/about/icons/spike5.svg')] p-1 bg-no-repeat bg-right w-full h-full flex flex-col gap-8 justify-center items-center text-center rounded-[12px]">
            <p className="text-white max-w-[706px] text-[24px] md:text-[40px] leading-[29px] md:leading-[44px] font-semibold">
              Orisuun is 100% Black-Owned
            </p>
            <p className="text-white max-w-[706px] text-[24px] md:text-[40px] leading-[29px] md:leading-[44px] font-semibold">
              The company is solely dedicated to economic empowerment, and it
              will always be that way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
