import Image from 'next/image';
import Card from '../../../components/marketing/Card/Card';

const TopContent = () => {
  const cardData = [
    {
      id: 1,
      imageSrc: '/how-svgs/megaphone.svg',
      title: 'Know someone who would be interested in joining Orisuun?',
      description:
        'Help us enhance our network, drive innovation, and increase opportunities for collective business success.',
      containerClassName: 'bg-[#F8F8F8]',
      titleClassName: 'text-blue-strong',
      descriptionClassName: 'text-[#5B657B]',
    },
    {
      id: 2,
      imageSrc: '/icons/partners-menu.svg', // example image, replace with your own
      title: 'Are you associated with a potential partner?',
      description:
        'Bringing in the large, multinational corporations will expand our reach, enhance our credibility, and drive substantial business growth.',
      containerClassName: 'bg-[#F8F8F8]',
      titleClassName: 'text-blue-strong',
      descriptionClassName: 'text-[#5B657B]',
    },
    {
      id: 3,
      imageSrc: '/how-svgs/money-bill-coin.svg',
      // No image for this card
      title:
        'Do you know someone who would be interested in contributing to our work at Orisuun?',
      description:
        'Empower Black communities, foster economic growth, and create sustainable opportunities for future generations.',
      containerClassName: 'bg-[#F8F8F8]',
      titleClassName: 'text-blue-strong',
      descriptionClassName: 'text-[#5B657B]',
    },
  ];
  return (
    <section className="md:mt-[91px] mt-[60px] ">
      <div className="lg:px-[80px] px-4 mx-auto text-center" data-aos="fade-up">
        <div className="flex flex-col gap-20">
          <div className="flex flex-col gap-6">
            <h1 className="md:text-[64px] text-[36px] leading-[43.2px] font-semibold md:leading-[110%] text-blue-strong small-500:max-w-[288px] text-center mx-auto ">
              Help us build Orisuun!
            </h1>
            <p className="md:text-xl text-[16px] font-medium leading-[150%] text-[#5B657B]  mx-auto  max-w-[457px]">
              We need you. We need your insights, your participation, your
              connections, your patience, and your faith.
            </p>
          </div>
          <div className="flex flex-col gap-8 md:gap-10">
            <h2 className="md:text-[40px] text-[24px] font-semibold leading-[44px] text-blue-strong">
              Be a Connector
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 mx-auto ">
              {cardData.map((card) => (
                <Card
                  key={card.id}
                  imageSrc={card.imageSrc}
                  title={card.title}
                  description={card.description}
                  containerClassName={card.containerClassName}
                  titleClassName={card.titleClassName}
                  descriptionClassName={card.descriptionClassName}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopContent;
