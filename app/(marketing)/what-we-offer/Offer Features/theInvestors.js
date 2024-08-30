import Image from 'next/image';
import InvestorsIcon from '../../../../public/what we offer/investors.png';
import { FeaturesButton } from '../component/button1';

const investors = [
  {
    id: 1,
    parag:
      'These are the revenue growers – they’re going to provide growth capital and set you up for success.',
  },
];

export const TheInvestors = () => {
  return (
    <div className="w-full h-full flex lg:flex-row md:flex-col sm:flex-col small-500:flex-col md:gap-10 lg:justify-between small-500:mb-[0px] ">
      <div className="h-full xl:pt-[136.89px] pt-0 ">
        <div className="flex flex-col items-start gap-8 lg:w-[594px]">
          <div className="w-full flex flex-col items-start gap-6 small-500:gap-3">
            <div className="flex flex-col items-start gap-4">
              <FeaturesButton
                buttons={[
                  {
                    id: 1,
                    text: 'Can be verified',
                  },
                  {
                    id: 2,
                    text: 'Access to Team Forming',
                  },
                ]}
              />
              <h2 className="md:text-[32px] font-semibold text-blue-strong leading-110 text-[20px]">
                The Investors
              </h2>
            </div>
            <p className="text-blu-ray-300 md:text-[20px] font-medium leading-150 text-[16px]">
              Those established and professional investors and institutions
              actively searching impactful investment opportunities.
            </p>
          </div>
          <div className="w-full flex flex-col items-start gap-6">
            <h2 className="text-blue-strong md:text-[20px] font-semibold leading-[26px] text-[16px]">
              Role on Orisuun
            </h2>
            <div className="w-full flex flex-col items-start gap-5">
              {investors.map((text) => (
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
        <Image alt="investor" src={InvestorsIcon} />
      </div>
    </div>
  );
};
