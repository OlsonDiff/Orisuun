import Image from 'next/image';
import StarLeft from '../../../../public/fund/term-star-1.svg';
import StarRight from '../../../../public/fund/term-star-2.svg';
import Curve from '../../../../public/fund/curve.svg';

const visionCard = [
  {
    term: 'medium term',
    amountPerMonth: '$10 million / month',
    icon: StarLeft,
    contributors: [
      {
        high: '1 million contributors',
        mid: '100,000 contributors',
        low: '10,000 contributors',
      },
    ],
    feePerMonth: [
      {
        ten: '$10 per month',
        hundred: '$100 per month',
        thousand: '$1000 per month',
      },
    ],
  },
  {
    term: 'long term',
    amountPerMonth: '$100 million / month',
    icon: StarRight,
    contributors: [
      {
        high: '5 million contributors',
        mid: '1 million contributors',
        low: '100,000 contributors',
      },
    ],
    feePerMonth: [
      {
        ten: '$20 per month',
        hundred: '$100 per month',
        thousand: '$1000 per month',
      },
    ],
  },
];

export const VisionCard = () => {
  return (
    <>
      <Image
        src={Curve}
        alt="curve"
        width={209}
        height={52}
        className="absolute lg:-top-[70px] lg:block md:hidden small-500:hidden"
      />
      {visionCard.map((vision, index) => (
        <div
          key={index}
          className="w-[515px] h-[270px] bg-gray-100-custom border border-gray-300-custom px-10 py-9 rounded-xl small-500:w-full small-500:px-4 small-500:py-5 small-500:h-full"
        >
          <div className="h-full flex flex-col items-start gap-8 small-500:gap-6">
            <div className="flex w-full items-start">
              <div className="flex flex-col items-start gap-1 whitespace-nowrap small-500:gap-2">
                <p className="w-[108px] h-[18px] text-[16px] uppercase text-blue-strong font-semibold leading-110 opacity-60 small-500:text-[14px]">
                  {vision.term}
                </p>
                <p className="w-[198px] h-[36px] text-blue-strong text-[24px] font-semibold leading-150 small-500:text-[20px]">
                  {vision.amountPerMonth}
                </p>
              </div>
              <Image
                alt="vision star"
                src={vision.icon}
                width={32}
                height={32}
                className="ml-auto"
              />
            </div>
            <div className="w-full h-full flex justify-between">
              <div className={`h-[108px] small-500:h-full`}>
                {vision.contributors.map((contributor, fig) => (
                  <div
                    key={fig}
                    className={`h-full flex flex-col gap-3 whitespace-nowrap `}
                  >
                    <p
                      className={`text-blu-ray-300 text-[20px] font-medium leading-[140%] w-full small-500:text-[14px] `}
                    >
                      {contributor.high}
                    </p>
                    <p
                      className={`text-blu-ray-300 text-[20px] font-medium leading-[140%] w-full small-500:text-[14px] `}
                    >
                      {contributor.mid}
                    </p>
                    <p
                      className={`text-blu-ray-300 text-[20px] font-medium leading-[140%] w-full small-500:text-[14px] `}
                    >
                      {contributor.low}
                    </p>
                  </div>
                ))}
              </div>
              <div className={`h-[108px] `}>
                {vision.feePerMonth.map((fee, fig) => (
                  <div
                    key={fig}
                    className={`h-full flex flex-col gap-3 whitespace-nowrap`}
                  >
                    <p
                      className={`text-blu-ray-300 text-[20px] font-medium leading-[140%] w-full small-500:text-[14px] `}
                    >
                      {fee.ten}
                    </p>
                    <p
                      className={` text-blu-ray-300 text-[20px] font-medium leading-[140%] w-full small-500:text-[14px] `}
                    >
                      {fee.hundred}
                    </p>
                    <p
                      className={` text-blu-ray-300 text-[20px] font-medium leading-[140%] w-full small-500:text-[14px] `}
                    >
                      {fee.thousand}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
