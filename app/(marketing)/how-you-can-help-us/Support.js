import Image from 'next/image';
import { Button } from '../../../components/marketing';
import Link from 'next/link';
const Support = () => {
  return (
    <section className="mt-[120px] lg:mt-[150px] lg:px-[80px] px-4">
      <div
        className="mx-auto flex md:px-0 gap-2 md:gap-20 xl:gap-40 flex-col-reverse sm:flex-row justify-between"
        data-aos="fade-up"
      >
        <div className="sm:py-12 py-10 lg:px-0">
          <Image
            src="/how-svgs/contribution.png"
            width={624}
            height={504}
            alt="contribution-illustration"
            className="rounded-[12px]"
          />
        </div>
        <div className="mt-4 sm:mt-20 text-center mx-auto flex flex-col items-center xl:gap-[60px] gap-8 ">
          <div className="flex flex-col sm:gap-6 gap-4 items-center">
            <h2 className="text-blue-strong md:text-[40px] text-[24px] font-semibold leading-[110%]">
              Support the Black Wealth Fund
            </h2>
            <p className="text-[#5b657b] text-xl font-medium leading-[150%] text-center max-w-[500px] small-500:w-full ">
              Join the Black Wealth Fund&apos;s movement of radical transparency
              while marshalling community resources for collective growth.
            </p>
          </div>
          <div className="lg:block md:flex md:items-center md:justify-center">
            <Button>
              <Link href="/signup">Contribute to the Fund</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;
