import WistiaEmbed from '../WitsiaEmbed';

const How = () => {
  return (
    <section className="px-4 lg:px-[80px] mx-auto mt-[120px] md:mt-[131px] text-center pb-0 md:pb-[86px]">
      <div className=" max-w-[926px] mx-auto 2xl:max-w-[1024px] 2k:max-w-[1100px]">
        <h3 className="text-blue-strong text-[40px] font-semibold leading-[110%] max-w-[598px] mx-auto mb-4 hidden md:block">
          A new way to connect with business opportunities
        </h3>
        <h3 className="text-blue-strong text-[24px] leading-[28.8px] font-semibold  md:max-w-[598px] mx-auto mb-4 md:hidden">
          How we can help you
        </h3>
        <p className="text-base text-center font-medium text-[#5B657B] max-w-[434px] mx-auto mb-[60px] md:mb-10 leading-[30px]">
          Our platform is about transcending traditional networking pitfalls. We
          democratize access to expertise and insight - streamlining your path
          to growth!
        </p>
        <div className="w-full h-auto border border-gray-300 rounded-lg">
          <WistiaEmbed />
        </div>
      </div>
    </section>
  );
};

export default How;
