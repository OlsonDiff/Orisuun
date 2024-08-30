import Image from 'next/image';

const ToolsCard = ({
  header,
  paragraphs,
  imageSrc,
  imageLeft,
  contentHeight,
  cardHeight,
  titleLength,
  titleHeight,
}) => {
  return (
    <div
      className={`flex justify-between w-full gap-10 flex-col ${
        imageLeft ? 'lg:flex-row-reverse' : 'lg:flex-row'
      } lg:gap-0 lg:pt-[71px] lg:pb-[70px] md:gap-20`}
    >
      <div
        className={`h-full ${contentHeight} flex flex-col gap-10 md:mt-[59px] lg:w-[594px] small-500:order-1`}
      >
        <h2
          className={`md:text-[32px] text-blue-strong font-semibold leading-110 text-[20px]`}
        >
          {header}
        </h2>
        <div className={`w-full h-full flex flex-col gap-6 ${cardHeight}`}>
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-blu-ray-300 md:text-[20px] font-medium leading-150 text-[16px]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      <div className="h-full small-500:order-2">
        <Image
          src={imageSrc}
          alt={header}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default ToolsCard;
