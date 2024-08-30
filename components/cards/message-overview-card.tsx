import MessageIcon from '@/icons/message-icon';
import Image from 'next/image';
import React from 'react';

interface IProps {
  image: string;
  name: string;
  message: string;
}

const MessageOverviewCard: React.FC<IProps> = ({ image, name, message }) => {
  return (
    <div className="flex gap-3 p-3 border-b border-grey-600 items-center">
      <Image
        src={image}
        alt={name}
        width={36}
        height={36}
        className="rounded-full profile-image w-9 h-9"
      />
      <div className="flex-1">
        <p className="text-h10 2xl:text-scaled-h10 font-semibold text-black-500 mb-0.5">
          {name}
        </p>
        <p className="text-h10 2xl:text-scaled-h10 font-medium text-blue-300">
          {message}
        </p>
      </div>
      <div className="w-[140px] 2xl:w-[calc(140px*var(--scale-factor))] hidden md:flex flex-col gap-1 items-end">
        <p className="text-h9 2xl:text-scaled-h9 font-medium text-blue-300">
          Today, 12:00 pm
        </p>
        <button className="text-h9 2xl:text-scaled-h9 text-omblue-500 font-medium border border-omblue-100 rounded-md p-3 flex items-center gap-2">
          Chat
          <MessageIcon className="w-4 h-4 2xl:w-scale-4 2xl:h-scale-4" />
        </button>
      </div>
    </div>
  );
};

export default MessageOverviewCard;
