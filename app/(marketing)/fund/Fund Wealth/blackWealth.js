'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { TableHead } from '../component/tableHead';
import { BlackWealthArrow } from '../../../../components/marketing/SVG/blackWealthArrow';
import { BlackWealthArrowMob } from '../../../../components/marketing/SVG/blackWealthArrowMob';

const firstBlackLevel = [
  {
    text: 'Simply getting to a prototype or doing the research and development necessary can be beyond the financial means of many aspiring  entrepreneurs',
    bg: 'bg-[#69B3E72B]',
  },
  {
    text: "On average, resources available in Black communities aren't as high as they are for other groups",
    bg: 'bg-[#69B3E714]',
  },
  {
    text: 'Finding and getting in front of angel investors can be a difficult task',
    bg: 'bg-[#69B3E72B]',
  },
  {
    text: 'Venture capital investments have historically been disproportionately concentrated with non-Black business owners',
    bg: 'bg-[#69B3E714]',
  },
  {
    text: 'Sale of an established business requires the help of brokers and other mediaries',
    bg: 'bg-[#69B3E72B]',
  },
];

const secondBlackLevel = [
  {
    text: 'The Black Wealth Fund can provide grants to promising and well-researched, well-explained plans',
    bg: 'bg-[#69B3E72B]',
  },
  {
    text: 'The Black Wealth Fund can provide convertible notes (low interest paying debt that can be converted into equity).<br /><br />The Black Wealth Fund also offers business planning and professional services at this stage as well as access to mentors, for free',
    bg: 'bg-[#69B3E714]',
  },
  {
    text: 'In addition to equity investments, The Black Wealth Fund offers generous debt investments with rates, terms, and durations well below normal market conditions.<br /><br />The Black Wealth Fund also offers business planning and professional services at this stage as well as access to mentors and experts in a relevant field, for free',
    bg: 'bg-[#69B3E72B]',
  },
  {
    text: 'In addition to equity investments, The Black Wealth Fund offers generous debt investments with rates, terms, and durations well below normal market conditions.<br /><br />The Black Wealth Fund also offers business planning and professional services at this stage as well as mentors and experts in a relevant field, for free',
    bg: 'bg-[#69B3E714]',
  },
  {
    text: 'The BlackWealth Fund does not provide any assistance with exits.However, the Orisuun platform will have the resources need to facilitate exits',
    bg: 'bg-[#69B3E72B]',
  },
];

export const BlackWealth = () => {
  const [showBlackWealth, setShowBlackWealth] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef(null);

  const checkForScrollOnPage = useCallback((event) => {
    if (imageRef.current) {
      const { top } = imageRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      top <= windowHeight * 0.7
        ? setShowBlackWealth(true)
        : setShowBlackWealth(false);
    }
  }, []);

  const checkForScreenSize = () => {
    const width = window.innerWidth;
    setIsSmallScreen(width <= 768);
  };

  useEffect(() => {
    window.addEventListener('scroll', checkForScrollOnPage, { passive: true });
    window.addEventListener('resize', checkForScreenSize);
    checkForScreenSize();
    return () => {
      window.removeEventListener('scroll', checkForScrollOnPage, {
        passive: true,
      });
      window.removeEventListener('resize', checkForScreenSize);
    };
  }, []);

  return (
    <div
      ref={imageRef}
      className="w-full relative xl:px-20 md:px-6 mt-10 small-500:px-4 mb-[150px] small-500:mb-[120px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full gap-4">
        <div className="w-full flex justify-start items-center">
          <h2 className="w-full text-blue-strong text-[32px] font-semibold leading-150 lg:w-[483px] small-500:text-[20px]">
            The Black Wealth Fund&apos;s Approach
          </h2>
        </div>
        <section className="overflow-x-auto hide-scrollbar">
          <div className="w-full flex flex-col md:w-[1200px] small-500:w-[1150px] xl:w-full small-500:h-full">
            <TableHead className={`md:w-[200px]`} />
            {/* bottom */}
            <div className="h-[159.2px] w-full flex gap-4 border-b border-[#D5E8FA] small-500:gap-2">
              <div className="md:w-[180px] px-3 py-[21.94px] flex justify-start items-start small-500:w-[120px] small-500:py-[12.5px]">
                <p className="text-[#3B4761] text-[16px] font-semibold leading-[20px] small-500:text-[14px] small-500:py-3">
                  Realities of this stage
                </p>
              </div>
              <div className="grid w-full grid-cols-5 gap-4 small-500:gap-2">
                {firstBlackLevel.map((item, index) => (
                  <div
                    key={index}
                    className={`h-[159.2px] w-[204px] ${item.bg} py-[25.6px] px-[14.63px] rounded-tl-xl rounded-tr-xl small-500:py-5 small-500:px-3`}
                  >
                    <p
                      className={`text-[#3B4761] text-[14px] font-medium leading-[18.2px] ${index === 0
                          ? `w-[172px] h-[108px]`
                          : index === 2 || index === 4
                            ? `w-[172px] h-[54px]`
                            : index === 3
                              ? `w-[172px] h-[90px]`
                              : `w-[176.88px] h-[72px]`
                        }`}
                    >
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-[303.2px] w-full flex gap-4 small-500:gap-2">
              <div className="md:w-[180px] px-3 py-[21.94px] flex justify-start items-start small-500:w-[120px] small-500:py-[12.5px]">
                <p className="text-[#3B4761] text-[14px] font-semibold leading-[20px] small-500:text-[14px] small-500:py-3">
                  How Orisuun&apos;s Black Wealth Fund Can Help
                </p>
              </div>
              <div className="grid w-full grid-cols-5 gap-4 small-500:gap-2">
                {secondBlackLevel.map((item, index) => (
                  <div
                    key={index}
                    className={`h-[303.2px] w-[204px] ${item.bg} py-[25.6px] px-[14.63px] rounded-bl-xl rounded-br-xl small-500:py-5 small-500:px-3`}
                  >
                    <div
                      className={`text-[#3B4761] text-[14px] font-medium leading-[18.2px] `}
                      dangerouslySetInnerHTML={{ __html: item?.text }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {showBlackWealth && isHovered && (
        <div
          className={`absolute lg:-top-[100px] lg:left-[583px] left-5 -top-[140px]`}
        >
          {!isSmallScreen ? <BlackWealthArrow /> : <BlackWealthArrowMob />}
        </div>
      )}
    </div>
  );
};
