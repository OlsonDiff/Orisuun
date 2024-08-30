import Image from 'next/image';
import TeamIcon from '../../../../public/what we offer/team.svg';
import Blurs from '../../../../public/what we offer/platformBlur.svg';

const teamDetails = [
  {
    id: 1,
    parag: 'Members can form teams to conduct business as a unit.',
  },
  {
    id: 2,
    parag:
      'Members who have been invited to a team can join and leave that team as they see fit.',
  },
  {
    id: 3,
    parag:
      'Teams can create their own profiles to promote those activities that will be conducted as a team.',
  },
];

export const Team = () => {
  return (
    <div className="w-full flex lg:flex-row md:flex-col sm:flex-col small-500:flex-col md:gap-10 lg:justify-between small-500:mb-[0px]">
      <div className="w-full flex flex-col gap-6 items-start lg:w-[480px] small-500:pt-0 small-500:mb-10">
        <h2 className="md:text-[32px] font-semibold text-blue-strong leading-110 text-[20px]">
          Team Forming
        </h2>
        <div className="w-full flex flex-col gap-6">
          {teamDetails.map((text) => (
            <div key={text.id} className="w-full">
              <p
                className={`w-full md:text-[20px] text-blu-ray-300 font-medium text-[16px] leading-150`}
              >
                {text.parag}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="relative z-10 md:w-full small-500:h-full">
          <Image alt="platform" src={TeamIcon} />
        </div>
        <div className="absolute z-0 lg:w-[607.8px] lg:h-[373px] xl:top-[-20px] xl:left-[60px] lg:top-[-100px] lg:left-[0px] top-[-40px] left-[60px] small-500:top-[-20px] small-500:left-[0px] blur-xl md:w-full small-500:w-[300px] small-500:h-[350px]">
          <Image src={Blurs} alt="blurimage" />
        </div>
      </div>
    </div>
  );
};
