import Image from 'next/image';
import PeopleIcon from '../../../../public/what we offer/people.png';
import { FeaturesButton } from '../component/button1';

const people = [
  {
    id: 1,
    parag:
      'Use the Search and Explore functions connected to the database to find Black owned businesses to buy from',
  },
  {
    id: 2,
    parag: 'Contribute to fundraising campaigns',
  },
  {
    id: 3,
    parag: 'They provide valuable feedback to the businesses they visit',
  },
];

export const ThePeople = () => {
  return (
    <div className="w-full h-full flex flex-col gap-[5.11px]">
      <div className="w-full flex justify-center items-center xl:mb-0 mb-[100px] small-500:mb-[28px]">
        <h2 className="text-blue-strong md:text-[40px] font-semibold leading-110 text-center text-[24px]">
          Platform Features
        </h2>
      </div>
      <div className="w-full h-full flex lg:flex-row md:flex-col sm:flex-col small-500:flex-col md:gap-10 lg:justify-between small-500:mb-[0px]">
        <div className="h-full xl:pt-[136.89px] pt-0 ">
          <div className="w-full flex flex-col items-start gap-8 lg:w-[594px]">
            <div className="w-full flex flex-col items-start gap-6 small-500:gap-3">
              <div className="flex flex-col items-start gap-4">
                <h2 className="md:text-[32px] font-semibold text-blue-strong leading-110 text-[20px]">
                  The People
                </h2>
              </div>

              <p className="text-blu-ray-300 md:text-[20px] font-medium leading-150 text-[16px]">
                Those out there who want to support Black-owned businesses
                through patronage. They are your new customers and clients.
              </p>
            </div>
            <div className="w-full flex flex-col items-start gap-6">
              <h2 className="text-blue-strong md:text-[20px] font-semibold leading-[26px] text-[16px]">
                Role on Orisuun
              </h2>
              <div className="w-full flex flex-col items-start gap-5">
                {people.map((text) => (
                  <div key={text.id} className={`flex gap-5 w-full`}>
                    <div className="border-l border-blu-ray-300"></div>
                    <p className="md:text-[20px] font-medium text-blu-ray-300 leading-150 text-[16px]">
                      {text.parag}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center ">
          <Image alt="people" src={PeopleIcon} />
        </div>
      </div>
    </div>
  );
};
