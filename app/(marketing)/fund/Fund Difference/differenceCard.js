'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import BusinessIcon from '../../../../public/fund/terms.svg';
import RadicalIcon from '../../../../public/fund/transparency.svg';
import SupportIcon from '../../../../public/fund/support.svg';
import GoalsIcon from '../../../../public/fund/goals.svg';
import ReinvestmentIcon from '../../../../public/fund/reinvest.svg';
import PreventionIcon from '../../../../public/fund/prevention.svg';
import right from '../../../../public/icons/right.svg';

const differenceDetails = [
  {
    icon: BusinessIcon,
    title: 'Business Favorable Terms',
    title: 'Business Favorable Terms',
    note: "Because we are only interested in seeing recipients succeed, we offer our loans and equity and assistance as a customized package designed address the recipient's specific needs.",
  },
  {
    icon: RadicalIcon,
    title: 'Radical Transparency',
    note: 'We want to be and have to be innovative here. We will make it as easy as possible for you to keep an eye on us by providing real-time updates on all fund transactions and due diligence.',
    title: 'Radical Transparency',
    note: 'We want to be and have to be innovative here. We will make it as easy as possible for you to keep an eye on us by providing real-time updates on all fund transactions and due diligence.',
  },
  {
    icon: SupportIcon,
    title: 'Dedicated Support',
    note: 'Recipients of funds will receive high quality mentorship, advisory services, and ongoing availability for follow-on assistance.',
    title: 'Dedicated Support',
    note: 'Recipients of funds will receive high quality mentorship, advisory services, and ongoing availability for follow-on assistance.',
  },
  {
    icon: GoalsIcon,
    title: 'Investment Goals',
    note: "The Black Wealth Fund is investing for impact and not necessarily for return. Our goal is to maximize Black business owners' success.",
  },
  {
    icon: ReinvestmentIcon,
    title: '100% Reinvestment',
    note: 'All profits go back into the fund. The owners and operators of this fund do not take money of this fund for their own benefit.',
    title: '100% Reinvestment',
    note: 'All profits go back into the fund. The owners and operators of this fund do not take money of this fund for their own benefit.',
  },
  {
    icon: PreventionIcon,
    title: 'Fraud Prevention',
    note: 'All profits go back into the fund. The owners and operators of this fund do not take money of this fund for their own benefit.',
    title: 'Fraud Prevention',
    note: 'All profits go back into the fund. The owners and operators of this fund do not take money of this fund for their own benefit.',
  },
];

export const DifferenceCard = () => {
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setVisibleCards(3);
      } else {
        setVisibleCards(3);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (visibleCards >= 4) {
      setFocusedIndex(currentIndex + 2);
    } else {
      setFocusedIndex(currentIndex + 1);
    }
  }, [currentIndex, visibleCards]);

  const handlePrevClick = () => {
    if (currentIndex > 0 && focusedIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      containerRef.current.scrollTo({
        left: (currentIndex - 1) * (436 + 104),
        behavior: 'smooth',
      });
    }
  };

  const handleNextClick = () => {
    if (currentIndex <= 6) {
      setCurrentIndex(currentIndex + 1);
      containerRef.current.scrollTo({
        left: (currentIndex + 1) * (436 + 104),
        behavior: 'smooth',
      });
    }
  };

  // this handles the logic for the first card since by default the focusedIndex is 2 i.e currentIndex + 2 used for the visible card state

  const handleFirstClick = () => {
    if (focusedIndex === 1) {
      setFocusedIndex(focusedIndex - 1);
      containerRef.current.scrollTo({
        left: (focusedIndex - 1) * (436 + 104),
        behavior: 'smooth',
      });
    }
  };

  // this is also same logic as the first card but for the last card

  const handleLastClick = () => {
    if (focusedIndex >= 4) {
      setFocusedIndex(focusedIndex + 1);
      containerRef.current.scrollTo({
        left: (focusedIndex + 1) * (436 + 104),
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollLeft = containerRef.current.scrollLeft;
      const cardWidth = 436 + 104;
      const newCurrentIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(newCurrentIndex);
    }
  };

  return (
    <div className="mb-[105px] h-full w-full relative small-500:mb-0 small-500:px-4">
      <div
        className="flex w-full overflow-x-auto gap-[104px] small-500:gap-4 py-4 hide-scrollbar small-500:justify-start"
        onScroll={handleScroll}
        ref={containerRef}
      >
        {differenceDetails.map((item, index) => (
          <div
            key={index}
            tabIndex={0}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            className={`sm:w-[436px]  max-h-[296px] small-500:w-[80%] flex-shrink-0 transition-all bg-[#F5FAFF] rounded-xl p-[26px] small-500:p-4 ${focusedIndex === index ? 'border border-[#2357C6] shadow-lg' : ''
              } `}
          // className={`w-[436px] h-full flex-shrink-0 transition-all border border-black-500 bg-[#F5FAFF] rounded-xl p-[26px] shadow-xl ${focusedIndex === index ? 'border border-[#2357C6] shadow-md' : ''
          //   }`}
          >
            <div className="w-full h-full flex flex-col items-center gap-6">
              <Image
                src={item.icon}
                alt="difference icon"
                width={32}
                height={32}
              />
              <div className="flex flex-col items-center gap-3 w-full">
                <h3 className=" text-blue-strong text-[20px] font-semibold leading-[26px] small-500:text-center">
                  {item.title}
                </h3>
                <p className=" text-[#3B4761] text-center text-[20px] font-medium leading-150 small-500:text-[16px]">
                  {item.note}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {focusedIndex === 1 ? (
        <button
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-md bg-white small-500:hidden`}
          onClick={handleFirstClick}
        >
          <Image
            src={right}
            className="rotate-180"
            width={40}
            height={40}
            alt="previous"
          />
        </button>
      ) : (
        <button
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-md small-500:hidden ${currentIndex === 0 ? 'hidden' : 'block bg-white'
            }`}
          onClick={handlePrevClick}
          disabled={currentIndex === 0}
        >
          <Image
            src={right}
            className="rotate-180"
            width={40}
            height={40}
            alt="previous"
          />
        </button>
      )}
      {focusedIndex >= 4 ? (
        <button
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-md bg-white small-500:hidden ${focusedIndex === 5 ? 'hidden' : 'block'
            }`}
          onClick={handleLastClick}
          disabled={focusedIndex === 5}
        >
          <Image src={right} width={40} height={40} alt="next" />
        </button>
      ) : (
        <button
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-md small-500:hidden ${currentIndex >= differenceDetails.length - visibleCards &&
            focusedIndex >= 5
            ? 'hidden'
            : 'bg-white block'
            }`}
          onClick={handleNextClick}
          disabled={currentIndex >= differenceDetails.length - visibleCards}
        >
          <Image src={right} width={40} height={40} alt="next" />
        </button>
      )}
    </div>
  );
};
