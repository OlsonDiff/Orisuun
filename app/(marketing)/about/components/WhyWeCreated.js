'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import right from '../../../../public/icons/right.svg';

const reasons = [
  {
    icon: '/about/icons/handshake.svg',
    text: "We all know that a big part of this journey will require us to build institutions and <span class='text-gradient' style='font-weight: 600;'>take big swings.</span> We need a mechanism to come together to do that.",
  },
  {
    icon: '/about/icons/target.svg',
    text: "This is a global effort that will <span class='text-gradient' style='font-weight: 600;'> bring a fractured diaspora back together </span> - focused on our number one shared goal",
  },
  {
    icon: '/about/icons/light-bulb.svg',
    text: "We know the main obstacles keeping Black-owned businesses from growing and flourishing like they should are <span class='text-gradient' style='font-weight: 600;'> solvable problems</span>",
  },
];

export const WhyWeCreated = () => {
  // const [currentIndex, setCurrentIndex] = useState(0);

  // const handleNext = () => {
  //   if (currentIndex < reasons.length - 1) {
  //     setCurrentIndex(currentIndex + 1);
  //   }
  // };

  // const handlePrev = () => {
  //   if (currentIndex > 0) {
  //     setCurrentIndex(currentIndex - 1);
  //   }
  // };
  useEffect(() => {
    const applySliderEffect = () => {
      const slider = document.querySelector('.slider');
      if (window.innerWidth <= 768) {
        let isDown = false;
        let startX;
        let scrollLeft;

        const mouseDown = (e) => {
          isDown = true;
          slider.classList.add('active');
          startX = e.pageX - slider.offsetLeft;
          scrollLeft = slider.scrollLeft;
        };

        const mouseLeave = () => {
          isDown = false;
          slider.classList.remove('active');
        };

        const mouseUp = () => {
          isDown = false;
          slider.classList.remove('active');
        };

        const mouseMove = (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - slider.offsetLeft;
          const walk = (x - startX) * 3; //scroll-fast
          slider.scrollLeft = scrollLeft - walk;
        };

        slider.addEventListener('mousedown', mouseDown);
        slider.addEventListener('mouseleave', mouseLeave);
        slider.addEventListener('mouseup', mouseUp);
        slider.addEventListener('mousemove', mouseMove);

        return () => {
          slider.removeEventListener('mousedown', mouseDown);
          slider.removeEventListener('mouseleave', mouseLeave);
          slider.removeEventListener('mouseup', mouseUp);
          slider.removeEventListener('mousemove', mouseMove);
        };
      }
    };

    applySliderEffect();
    window.addEventListener('resize', applySliderEffect);

    return () => {
      window.removeEventListener('resize', applySliderEffect);
    };
  }, []);
  return (
    <section className="pt-[120px] md:pt-[150px] w-full pl-4 pr-0 md:px-0 mb-[120px] md:mb-0">
      <div className="w-full flex flex-col gap-[41px] md:gap-[120px]">
        <div className="flex justify-center w-full">
          <h2 className="text-blue-strong text-[40px] h-full font-semibold leading-110 text-center">
            Why we created Orisuun
          </h2>
        </div>

        <div className="">
          <div className="">
            <div className="slider overflow-x-scroll flex gap-4 md:gap-[24px] max-w-fit mx-auto  lg:overflow-visible justify-between pr-4 lg:pr-0 hide-scrollbar">
              {reasons.map((item, index) => (
                <div
                  key={index}
                  className="slide   mx-auto px-4 py-[55.5px] flex-shrink-0 lg:flex-shrink border lg:min-w-0  border-[#2357C6] rounded-xl bg-[#F2F7FC]"
                >
                  <div className="flex flex-col items-center h-full max-w-[244px]  md:max-w-[436px]  ">
                    <Image
                      src={item.icon}
                      alt="icon"
                      width={32}
                      height={32}
                      className="pb-6"
                    />
                    <p
                      className="text-[20px] leading-150 text-gray-700 text-center"
                      dangerouslySetInnerHTML={{ __html: item?.text }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
