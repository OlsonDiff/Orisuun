import { cn } from '@/utils/utils';
import Image from 'next/image';
import React from 'react';
import crown from '@/public/images/vector/crown.svg';

interface IProps {
  image?: string;
  name: string;
  company?: string;
  icon?: string | React.ReactNode;
  isImage?: boolean;
  variant?: 'sm' | 'lg' | 'xl';
}

const ProfileCard: React.FC<IProps> = ({
  image,
  name,
  company,
  icon = crown,
  isImage = true,
  variant = 'lg',
}) => {
  console.log(image, 'image');
  console.log(name, 'name');

  console.log(company, 'company');
  console.log(icon, 'icon');

  return (
    // <div className="w-full flex items-center gap-3">
    //   <div
    //     className={cn(
    //       variant === 'lg'
    //         ? 'w-12 h-12 2xl:w-[21%] 2xl:h-[21%] rounded-full'
    //         : 'w-9 h-9 2xl:w-[15%] 2xl:h-[15%] rounded-full'
    //     )}
    //   >
    //     <Image
    //       src={image}
    //       alt={name}
    //       width={variant === 'lg' ? 48 : 36}
    //       height={variant === 'lg' ? 48 : 36}
    //       className={'rounded-full w-full h-full'}
    //     />
    //   </div>
    //   <div className="">
    // <p
    //   className={cn(
    //     'font-semibold text-black-500 mb-1',
    //     variant === 'lg'
    //       ? 'text-h6 2xl:text-scaled-h6'
    //       : 'text-h10 2xl:text-scaled-h10'
    //   )}
    // >
    //   {name}
    // </p>
    //     <div className="flex items-start gap-2 w-4 h-4">
    // {isImage ? (
    //   <Image src={icon} alt={name} width={16} height={16} />
    // ) : (
    //   icon
    // )}

    // <p
    //   className={cn(
    //     'text-h10 2xl:text-scaled-h10 text-blue-300',
    //     variant === 'lg' ? 'font-medium' : 'font-normal'
    //   )}
    // >
    //   {company}
    // </p>
    //     </div>
    //   </div>
    // </div>
    <div className="flex items-start gap-2">
      <div
        className={cn(
          'rounded-full',
          variant === 'xl'
            ? 'w-16 h-16'
            : variant === 'lg'
            ? 'w-12 h-12'
            : 'w-9 h-9'
        )}
      >
        <Image
          src={image}
          alt={name}
          width={variant === 'xl' ? 64 : variant === 'lg' ? 48 : 36}
          height={variant === 'xl' ? 64 : variant === 'lg' ? 48 : 36}
          className="w-full h-full rounded-full border"
        />
      </div>
      <div className="flex-grow-1">
        <p
          className={cn(
            'font-semibold text-black-500 mb-1 capitalize',
            variant === 'lg' || variant === 'xl'
              ? 'text-h6 2xl:text-scaled-h6'
              : 'text-h10 2xl:text-scaled-h10'
          )}
        >
          {name}
        </p>
        <div className="flex items-start gap-1">
          <div className="w-4 h-4">
            {isImage ? (
              <Image src={icon} alt={name} width={16} height={16} />
            ) : (
              icon
            )}
          </div>
          <p
            className={cn(
              ' text-blue-300',
              variant === 'lg' || variant === 'xl'
                ? 'font-medium text-h10 2xl:text-scaled-h10'
                : 'font-normal text-h10 2xl:text-scaled-h10'
            )}
          >
            {company}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
