import Image from 'next/image';
import PrivateIcon from '../../../../public/what we offer/private.svg';
import Blurs from '../../../../public/what we offer/platformBlur.svg';

export const PrivateChat = () => {
  return (
    <div className="w-full flex lg:flex-row md:flex-col sm:flex-col small-500:flex-col md:gap-10 lg:justify-between small-500:mb-[0px]">
      <div className="w-full flex flex-col gap-6 items-start lg:w-[480px] small-500:pt-0 small-500:mb-10">
        <h2 className="md:text-[32px] font-semibold text-blue-strong leading-110 text-[20px]">
          Private Chat
        </h2>
        <p className="md:text-[20px] text-blu-ray-300 font-medium leading-150 text-[16px]">
          We have developed a secure messaging system within the platform, so
          you do not have to take business off the platform.
        </p>
        <p className="md:text-[20px] text-blu-ray-300 font-medium leading-150 text-[16px]">
          Members can use the messaging system to send files of all types.
        </p>
      </div>

      <div className="relative">
        <div className="relative z-10 md:w-full small-500:h-full">
          <Image alt="platform" src={PrivateIcon} />
        </div>
        <div className="absolute z-0 w-[607.8px] lg:h-[373px] xl:top-[-20px] xl:left-[60px] lg:top-[-100px] lg:left-[0px] top-[-40px] left-[60px] small-500:top-[-20px] small-500:left-[0px] blur-xl md:w-full small-500:w-[300px] small-500:h-[350px]">
          <Image src={Blurs} alt="blurimage" />
        </div>
      </div>
    </div>
  );
};
