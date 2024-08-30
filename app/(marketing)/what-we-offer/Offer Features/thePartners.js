import Image from 'next/image';
import PartnersIcon from '../../../../public/what we offer/partners.svg';
import { FeaturesButton } from '../component/button1';

const partners = [
  {
    id: 1,
    parag:
      "Our partners are here to support on an institutional level. <br/> They're matching campaign donations, they're bringing you into their organization as a vendor, and they're giving you access to all of the professional talent at their firms.",
  },
  {
    id: 2,
    parag:
      'They are also the cost cutters - our Discount Portal is full of special offers from our partners, who are eager to help you grow.',
  },
];

export const ThePartners = () => {
  return (
    <div className="w-full h-full flex lg:flex-row md:flex-col sm:flex-col small-500:flex-col md:gap-10 lg:justify-between small-500:mb-[0px]">
      <div className="flex lg:order-1 md:order-2 small-500:order-2 pb-[55.72px] small-500:pb-0">
        <Image alt="partners" src={PartnersIcon} />
      </div>
      <div className="h-full flex lg:w-[594px] lg:order-2 md:order-1 small-500:order-1 lg:pt-[60px] lg:pb-[192px]">
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
                ]}
              />
              <h2 className="md:text-[32px] font-semibold text-blue-strong leading-110 text-[20px]">
                The Partners
              </h2>
            </div>
            <p className="text-blu-ray-300 md:text-[20px] font-medium leading-150 text-[16px]">
              Large, multinational corporations.
            </p>
          </div>
          <div className="w-full flex flex-col items-start gap-6">
            <h2 className="text-blue-strong md:text-[20px] font-semibold leading-[26px] text-[16px]">
              Role on Orisuun
            </h2>
            <div className="w-full flex flex-col items-start gap-5">
              {partners.map((text) => (
                <div key={text.id} className={`flex gap-5 w-full`}>
                  <div className="border-l border-blu-ray-300"></div>
                  <div
                    className="md:text-[20px] font-medium text-blu-ray-300 leading-150 text-[16px]"
                    dangerouslySetInnerHTML={{ __html: text?.parag }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
