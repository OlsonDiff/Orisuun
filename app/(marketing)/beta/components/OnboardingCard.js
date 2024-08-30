import Image from 'next/image';

import Discount from '../../../../public/beta/images/discount.svg';
import Sparkle from '../../../../public/beta/images/star-sparkle.svg';
import Rocket from '../../../../public/beta/images/rocket.svg';

const card = [
  {
    icon: Discount,
    title: 'Discounts while Beta is running',
    parag:
      'During the onboarding phase, our prices are as low as they will ever be. Subscription prices are currently discounted up to 60%.',
  },
  {
    icon: Sparkle,
    title: 'Pioneers features',
    parag:
      'First 100 members in each category will get early access to new features, special considerations, free verifications, and lifetime profile promotion for as long as they maintain a single account.',
  },
  {
    icon: Rocket,
    title: 'Trailblazers features',
    parag:
      'Our discounted onboarding prices will be locked in for three years for the first 1000 members in each category.',
  },
];

export const OnboardingCard = () => {
  return (
    <>
      {card.map((item, index) => (
        <div
          key={index}
          className={`max-w-[406.34px] px-[26px] pb-[26px] pt-8 bg-white shadow rounded-xl  border border-[#D8D9D9] transition-all duration-300 ${
            index === 1 ? 'max-h-[322px]' : 'max-h-[262px]'
          }`}
        >
          <div className="w-full h-full flex flex-col gap-6">
            <div className="flex justify-center">
              <div className="w-[52px] h-[52px] p-3 bg-[#F2F7FC] rounded">
                <Image alt="icon" src={item.icon} width={32} height={32} />
              </div>
            </div>
            <div className="max-w-[353.33px] h-full flex flex-col gap-3">
              <div className="w-full h-[26px] flex justify-center items-center ">
                <h2 className="text-blue-strong text-[18px] leading-6 lg:text-[20px] font-semibold lg:leading-[26px] text-center">
                  {item.title}
                </h2>
              </div>
              <div
                className={`w-full ${index === 1 ? 'h-[150px] ' : 'h-[90px]'}`}
              >
                <p className="w-full text-center text-blu-ray-300 lg:text-[19.5px] font-medium lg:leading-150 text-base">
                  {item.parag}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

{
  /* <div className="p-6 bg-white shadow rounded-lg">
<h3 className="text-xl font-semibold mb-2">
  Discounts while Beta is running
</h3>
<p className="text-gray-600">
  During the Beta period, all pioneers will receive significant
  discounts on our services.
</p>
</div>
<div className="p-6 bg-white shadow rounded-lg">
<h3 className="text-xl font-semibold mb-2">Pioneers features</h3>
<p className="text-gray-600">
  First to experience new features and provide feedback to shape the
  platform.
</p>
</div>
<div className="p-6 bg-white shadow rounded-lg">
<h3 className="text-xl font-semibold mb-2">Trailblazers features</h3>
<p className="text-gray-600">
  Exclusive access to features not available to the public.
</p>
</div> */
}
