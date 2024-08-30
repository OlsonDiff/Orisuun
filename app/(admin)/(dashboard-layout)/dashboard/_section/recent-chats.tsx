import MessageOverviewCard from '@/components/cards/message-overview-card';
import Image from 'next/image';
import React from 'react';
import chat from '@/public/images/vector/chat.svg';

const RecentChats = () => {
  return (
    <div className="shadow-custom-combined border border-[#E3E3E2] rounded-xl py-4 h-[300px] 2xl:h-[calc(300px*var(--scale-factor))] flex flex-col">
      <h6 className="text-h6 2xl:text-scaled-h6 text-blue-500 font-semibold mb-4 px-4">
        Recent Chats
      </h6>
      {true ? (
        <div className="overflow-y-scroll hide-scrollbar">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index}>
              <MessageOverviewCard
                image={
                  'https://s3-alpha-sig.figma.com/img/bef1/1d46/2f7666fbebe8b76a281f56230ee30db8?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PQGKMSPJzE0JRSeKcaKkquUvjvWWGqMjmtSBu5~iog1Ldjwd5gShY4J12qInN4UsWnpRUVGNYx-Ogxgi5TRml4dif~YOTJZ5fXCMHstebiuA5xhwpgWb1IkWRWBqsLFPHSc-8qK7uIiey1RPxe4JHtf9ierZYkYwefpHCVxG0DCfdt~eX~M8owucX34TwGcAT3h81FplMg0LC7FH1cie-ClaLDNkPyBPNGR0Dt1nCn8sxyW9kMAwjywlCJUFabTmEs~QFNPX31o5J43nYM1WwupZgm2d7~914MyMU6IlcMsJbja5Br6etzIkJeraeqGR-A2oS1tqsuTeYNDstOVE4Q__'
                }
                name={'Elliott Thornton'}
                message={
                  'That sounds perfect, Brooklyn. No further questions for now. Looking forward to the demo.'
                }
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <Image
            src={chat}
            alt="handshake"
            width={32}
            height={32}
            className="mx-auto"
          />
          <p className="text-h9 2xl:text-scaled-h9 font-medium text-blue-400 mx-auto">
            No recent chats found.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentChats;
