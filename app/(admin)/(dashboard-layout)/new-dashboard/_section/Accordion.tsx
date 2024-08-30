import Image from 'next/image';
import message from '@/public/images/vector/message.svg';
import cross from '@/public/images/vector/cross.svg';
import expandMoreDropDown from '@/public/images/vector/expand-more-dropdown.svg';
import swap from '@/public/images/vector/swap.svg';
import briefCase from '@/public/images/vector/case.svg';
import chatOutline from '@/public/images/vector/chat-outline.svg';
import compareArrow from '@/public/images/vector/compare-arrow.svg';
import cancleOutline from '@/public/images/vector/cancle-outline.svg';
import { useState } from 'react';

interface Props {
  item: any;
}

const Accordion: React.FC<Props> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="grid grid-cols-12 border-b border-grey-600 items-center min-h-[64px]">
        <div className="col-span-5">
          <div className="grid grid-cols-2">
            <p className="text-h10 flex items-center text-black-500 pl-[20px]">
              {item.name}
            </p>
            <div className="flex flex-col items-center justify-center 2xl:mr-auto">
              <Image
                src={swap}
                alt="swap"
                width={20}
                height={20}
                className="w-[20px] h-[20px]"
              />
              <p className="text-h10 italic text-green-700">Associated with</p>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex items-center">
            <div className="rounded-full w-[36px] h-[36px] flex items-center">
              <img
                src={item.user.image}
                alt="images"
                className="w-full h-full rounded-full border"
              />
            </div>
            <div className="ml-[8px]">
              <p className="text-h10 font-semibold mb-[4px]">{item.user.name}</p>
              <div className="flex items-center">
                <div className="rounded-full w-[20px] h-[20px] flex items-center bg-[#E3E3E2] justify-center">
                  <Image
                    src={briefCase}
                    width={12}
                    height={12}
                    alt="brifCase"
                  />
                </div>
                <p className="text-h10 ml-[4px] text-[#898988]">{item.user.company}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <p className={`text-h10 ${item.status === 'Matched' ? 'text-[#0a193a]' : 'text-green-700'}`}>{item.status}</p>
        </div>
        <div className="col-span-2">
          <div className="flex gap-[8px]">
            <div className={`p-1.5 rounded-[5px] flex items-center ${item.status === 'Matched' ? 'bg-[#2357C6]': 'bg-[#E8B006] '}`}>
              <Image src={item.status === 'Matched' ? compareArrow : chatOutline} width={16} height={16} alt="chat" />
            </div>
            <div className="bg-[#DC3545] p-1.5 rounded-[5px] flex items-center">
              <Image src={cancleOutline} width={16} height={16} alt="chat" />
            </div>
            <div
              className="bg-[#E9EEF9] p-1.5 rounded-full ml-auto mr-4 flex items-center justify-center shadow-[0_0_21_0_#0808080D]"
              onClick={() => setExpanded(!expanded)}
            >
              <Image
                src={expandMoreDropDown}
                width={16}
                height={16}
                alt="chat"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`grid grid-cols-12 bg-[#fafaf9] transition-all pr-4 ${
          expanded ? 'max-h-fit pt-3 pb-3 border-b border-grey-600' : 'max-h-0 overflow-hidden p-0'
        }`}
      >
        <div className="col-span-3 pl-[20px]">
          <div className="text-h10 text-black-500">
            <p>Date and Time</p>
            <p className="text-[#898988] mt-2">05 Jan, 2024 07:39am</p>
          </div>
        </div>
        <div className="col-span-4">
          <div className="text-h10 text-black-500">
            <p>Matchig Tag</p>
            <div className="flex items-center flex-wrap gap-x-[15px] gap-y-[10px] mt-3">
              <span className="block bg-[#f0f7fd] pt-1 pb-1 pl-2 pr-2 rounded-2xl text-[#749dba] text-h10">
                Dsign Agency
              </span>
              <span className="block bg-[#e9eef9] pt-1 pb-1 pl-2 pr-2 rounded-2xl text-[#557dd3] text-h10">
                UI Design
              </span>
              <span className="block bg-[#e8f3ee] pt-1 pb-1 pl-2 pr-2 rounded-2xl text-[#5aa984] text-h10">
                Agency
              </span>
              <span className="block bg-[#fff9e6] pt-1 pb-1 pl-2 pr-2 rounded-2xl text-[#ffcb31] text-h10">
                UX
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-5">
          <div className="text-h10 text-black-500">
            <p>BD Opportunity Description</p>
            <p className="text-[#898988] mt-2">
              We are seeking a higly creative and talented individual to join
              our growing Design.{' '}
              <span className="text-[#2357c6]">Read More</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accordion;
