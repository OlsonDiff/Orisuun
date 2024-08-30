import Image from 'next/image';
import MentorIcon from '../../../../public/what we offer/mentor.svg';
import { FeaturesButton } from '../component/button1';

const mentors = [
  {
    id: 1,
    parag:
      'The business must have reached three years of positive net income and revenues over $1 million under the leadership of the mentor.',
  },
  {
    id: 2,
    parag:
      '*High-level executives at multinational corporations also qualify to serve as mentors.',
  },
];
const mentorsRole = [
  {
    id: 1,
    parag:
      'These are the teachers – they’re going to help you avoid easily-made mistakes.',
  },
  {
    id: 2,
    parag:
      'Mentors are meant to guide on business decisions. To foster deep knowledge of a business’s history and trajectory, mentorships should be an ongoing relationship that increase in value over time.',
  },
];

export const TheMentors = () => {
  return (
    <div className="w-full h-full flex lg:flex-row md:flex-col sm:flex-col small-500:flex-col md:gap-10 lg:justify-between small-500:mb-[0px]">
      <div className="flex lg:order-1 md:order-2 small-500:order-2">
        <Image alt="mentor" src={MentorIcon} />
      </div>
      <div className="h-full flex lg:pt-[60px] lg:pb-[128px] lg:w-[594px] lg:order-2 md:order-1 small-500:order-1 ">
        <div className="w-full flex flex-col items-start gap-8">
          <div className="w-full flex flex-col items-start gap-6">
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
                The Mentors
              </h2>
            </div>
            <p className="text-blu-ray-300 md:text-[20px] font-medium leading-150 text-[16px]">
              Those accomplished business-people who have succeeded in starting
              or running a business*.
            </p>
            <div className="flex flex-col items-start gap-3">
              {mentors.map((item) => (
                <div
                  key={item.id}
                  className={`flex flex-col items-start justify-center bg-[#F8F8F8] rounded-[5px] px-3 py-2`}
                >
                  <p className="text-[#5C5C5C] text-[14px] font-medium leading-[18.2px] ">
                    {item.parag}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col items-start gap-6">
            <h2 className="text-blue-strong md:text-[20px] font-semibold leading-[26px] text-[16px]">
              Role on Orisuun
            </h2>
            <div className="w-full flex flex-col items-start gap-5">
              {mentorsRole.map((text) => (
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
