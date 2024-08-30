import Image from 'next/image';

export const WhyNow = () => {
  return (
    <section className=" pt-12 md:pt-[150px] p-4 lg:px-16">
      <h3 className="text-center text-blue-strong text-[40px] small-500:text-[24px] leading-[44px] font-semibold">
        Why do I need to join now?
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-rows-2 lg:grid-rows-1 gap-[32px] pt-[60px] small-500:pt-10 pb-[150px] small-500:pb-[120px]">
        <div className="border border-[#D8D9D9] bg-[#F8F8F8] rounded-xl p-[26px] small-500:px-4 small-500:py-5">
          <div className="relative size-[32px] small-500:size-[24px]">
            <Image
              src="/icons/pricing/discount.svg"
              alt="discount"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col gap-3 small-500:mt-5 mt-8">
            <h6 className="text-blue-strong font-semibold text-[20px] ">
              Discounts while Beta is running
            </h6>
            <p className="text-[#5B657B] text-[20px] font-medium">
              During onboarding phase, our prices are as low as they will ever
              be. Subscription prices are currently discounted up to 60%.
            </p>
          </div>
        </div>
        <div className="border border-[#D8D9D9] bg-[#F8F8F8] rounded-xl p-[26px] small-500:px-4 small-500:py-5">
          <div className="relative size-[32px] small-500:size-[24px]">
            <Image
              src="/icons/pricing/star.svg"
              alt="star"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col gap-3 small-500:mt-5 mt-8">
            <h6 className="text-blue-strong font-semibold text-[20px]">
              Features for first 100 members
            </h6>
            <p className="text-[#5B657B] text-[20px] font-medium">
              First 100 members in each category will get early access to new
              features, special considerations, free verifications, and lifetime
              profile promotion for as long as they maintain a single account.
            </p>
          </div>
        </div>
        <div className="border border-[#D8D9D9] bg-[#F8F8F8] rounded-xl p-[26px] small-500:px-4 small-500:py-5">
          <div className="relative size-[32px] small-500:size-[24px]">
            <Image
              src="/icons/pricing/rocket.svg"
              alt="rocket"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col gap-3 small-500:mt-5 mt-8">
            <h6 className="text-blue-strong font-semibold text-[20px] ">
              Discounts for first 1000 members
            </h6>
            <p className="text-[#5B657B] text-[20px] font-medium">
              Discounted onboarding prices will be locked in for three years for
              the first 1000 members in each category.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
