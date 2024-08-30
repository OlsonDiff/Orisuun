import Image from 'next/image';
import ExpertIcon from '../../../../public/what we offer/experts.svg';
import { FeaturesButton } from '../component/button1';

const experts = [
  {
    id: 1,
    parag: 'The key resource in taking an idea to its maximum potential.',
  },
  {
    id: 2,
    parag:
      'These are the clarifiers and elevators – they’re going to sharpen your ideas with perspective and insight.',
  },
];

export const TheExperts = () => {
  return (
    <div className="w-full h-full flex lg:flex-row md:flex-col sm:flex-col small-500:flex-col md:gap-10 lg:justify-between small-500:mb-[0px]">
      <div className="h-full">
        <div className="flex flex-col items-start gap-8 lg:w-[594px]">
          <div className="flex flex-col items-start gap-6">
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
                  {
                    id: 3,
                    text: 'Have option to charge',
                  },
                ]}
              />
              <h2 className="md:text-[32px] font-semibold text-blue-strong leading-110 text-[20px]">
                The Experts
              </h2>
            </div>
            <p className="text-blu-ray-300 md:text-[20px] font-medium leading-150 text-[16px]">
              Those recognized and credentialed individuals (or small
              organizations) who can confidently claim to be among the top of
              their field.
            </p>
          </div>
          <div className="flex flex-col items-start gap-6">
            <h2 className="text-blue-strong text-[20px] font-semibold leading-[26px] small-500:text-[16px]">
              Role on Orisuun
            </h2>
            <div className="w-full flex flex-col items-start gap-5">
              {experts.map((text) => (
                <div key={text.id} className={`flex gap-5 w-full`}>
                  <div className="border-l border-blu-ray-300"></div>
                  <p className="text-[20px] font-medium text-blu-ray-300 leading-150 small-500:text-[16px]">
                    {text.parag}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <Image alt="expert" src={ExpertIcon} />
      </div>
    </div>
  );
};
