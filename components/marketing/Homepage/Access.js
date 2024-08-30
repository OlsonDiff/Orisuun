import { AccessAccord } from '../Accordion';
import Link from 'next/link';
const question = 'How to access the platform?';
const content = `To access Orisuun’s platform, you first have to [register](localhost:3000/signup) for an account. Members should register under the account type [link to pricing page](https://pricing.example.com) that reflects their intended role on the site. Once a member has created an account, they can sign in [here](https://signin.example.com).`;
const Access = () => {
  return (
    <section
      className="mt-[120px] md:mt-[100px] bg-[#F5FAFF] pt-[100px] pb-[96px] md:px-20 px-4 mb-[120px] md:mb-[109px]"
      style={{ boxShadow: '0px 4px 13.9px 0px rgba(0, 0, 0, 0.10)' }}
    >
      <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-[134px] ">
        <div>
          <h3 className="text-blue-strong text-[24px] leading-[28.8px] md:text-[40px] font-semibold md:leading-[110%] max-w-[522px]">
            We want to be as transparent as possible.{' '}
          </h3>
          <p className="mt-6 text-[#5B657B] text-[20px] font-medium leading-[150%] max-w-[309px]">
            Here you can find answers to our most frequently asked questions
          </p>
          <p className="mt-6 text-[#5B657B] text-[20px] font-medium leading-[150%] max-w-[355px]">
            If you have other questions - please, contact us by email:
            <Link
              href="mailto:hello@orisuun.com"
              className="underline decoration-[#5B657B] underline-offset-[3px] ml-1"
            >
              hello@orisuun.com
            </Link>
          </p>
        </div>
        <div className=" md:w-[624px]">
          <AccessAccord question={question} content={content} />
        </div>
      </div>
    </section>
  );
};
export default Access;
