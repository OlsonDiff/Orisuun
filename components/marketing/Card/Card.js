// components/Card.jsx
import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';

const Card = ({
  imageSrc,
  title,
  description,
  containerClassName,
  titleClassName,
  descriptionClassName,
}) => {
  return (
    <div
      className={clsx(
        'border border-[#D8D9D9] p-5 md:p-[26px] rounded-xl max-h-[400px] md:max-h-[308px]',
        containerClassName
      )}
    >
      {imageSrc && (
        <Image
          src={imageSrc}
          width={32}
          height={32}
          alt="icon"
          className="mb-6"
        />
      )}
      <h3
        className={clsx(
          'text-xl font-semibold leading-[130%] mb-4 text-left',
          titleClassName
        )}
      >
        {title}
      </h3>
      <p
        className={clsx(
          'md:text-xl text-[16px] font-medium leading-[150%] text-left ',
          descriptionClassName
        )}
      >
        {description}
      </p>
    </div>
  );
};

export default Card;
