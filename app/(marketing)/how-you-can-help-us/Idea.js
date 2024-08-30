import Image from 'next/image';
import { Button } from '../../../components/marketing';
import Link from 'next/link';
const Idea = () => {
  return (
    <section className="mt-[120px] md:mt-[150px] bg-[#f8f8f8] lg:px-[80px] px-4 ">
      <div
        className="mx-auto flex  gap-2 md:gap-10 xl:gap-40 flex-col sm:flex-row justify-between"
        data-aos="fade-up"
      >
        <div className="lg:pt-[100px] pt-[40px]">
          <h2 className="text-blue-strong sm:text-[40px] text-[24px] leading-[28.8px] font-semibold md:leading-[110%] mb-6">
            Do you have an idea for us?
          </h2>
          <p className="text-[#5b657b] text-xl font-medium leading-[150%] w-full sm:max-w-[335px] mb-[60px]">
            Take our two-minute survey and give us some valuable feedback!
          </p>
          <div className="flex gap-6 justify-between md:justify-start w-full">
            <Button className="bg-[#2357C6] font-bold sm:leading-6 w-[60%] text-[16px]  md:text-[16px] ">
              <Link href="/signup">Take our survey</Link>
            </Button>
            <Button
              variant="outlined"
              className="text-[#8E95A4] font-medium sm:leading-6 w-[40%] text-[16px] md:text-[16px] p-0 !border-none"
            >
              Send an email
            </Button>
          </div>
        </div>
        <div className="py-12">
          <Image
            src="/how-svgs/idea.png"
            width={624}
            height={504}
            alt="idea-illustration"
            className="rounded-[12px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Idea;
