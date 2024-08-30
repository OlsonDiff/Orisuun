import Image from 'next/image';
import ProfessionalIcon from '../../../../public/what we offer/professional.png';
import { FeaturesButton } from '../component/button1';

const professional = [
  {
    id: 1,
    parag:
      'The professionals on the platform are experienced operators. They are ready to help with the problem of the day, month, or year.',
  },
  {
    id: 2,
    parag:
      'These are the standardizers – they’re going make sure regular business functions are operating properly. They can lighten your load.',
  },
];

export const TheProfessionals = () => {
  return (
    <div className="w-full h-full flex lg:flex-row md:flex-col sm:flex-col small-500:flex-col md:gap-10 lg:justify-between small-500:mb-[0px]">
      <div className="flex lg:order-1 md:order-2 small-500:order-2">
        <Image alt="professional" src={ProfessionalIcon} />
      </div>
      <div className="h-full lg:pt-[136.89px] pt-0 flex lg:w-[594px] lg:order-2 md:order-1 small-500:order-1 ">
        <div className="w-full flex flex-col items-start gap-8">
          <div className="w-full flex flex-col items-start gap-6">
            <div className="flex flex-col items-start gap-4">
              <FeaturesButton />
              <h2 className="md:text-[32px] font-semibold text-blue-strong leading-110 text-[20px]">
                The Professionals
              </h2>
            </div>
            <p className="text-blu-ray-300 md:text-[20px] font-medium leading-150 text-[16px]">
              Those currently licensed and practicing in regulated fields such
              as law, accounting, architecture, information technology,
              engineering, finance, journalism, marketing, and many others.
            </p>
          </div>
          <div className="flex flex-col items-start gap-6">
            <h2 className="text-blue-strong md:text-[20px] font-semibold leading-[26px] text-[16px]">
              Role on Orisuun
            </h2>
            <div className="w-full flex flex-col items-start gap-5">
              {professional.map((text) => (
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
    </div>
  );
};
