import Image from 'next/image';
import Link from 'next/link';

const Connect = ({ closePopover }) => {
  return (
    <>
      <div className="flex justify-center gap-[138px] pb-[32px]">
        <div className="max-w-[201px] ">
          <h2 className="text-blue-strong text-[20px] font-semibold leading-7">
            Connect with Orisuun!
          </h2>
          <p className="text-blue-strong text-[14px] font-medium leading-[130%] mt-2">
            We&apos;re building something great, and we want you to be a part of
            it
          </p>
        </div>
        <div>
          <div className="flex gap-9">
            {/* column 1 */}
            <div className=" space-y-9">
              <Link
                href="new"
                className="flex gap-3 items-start"
                onClick={closePopover}
              >
                <div className=" p-3 border-2 border-none rounded bg-[#F0F7FD] ">
                  <Image
                    src="/icons/info.svg"
                    width={28}
                    height={28}
                    alt="info"
                  />
                </div>
                <div className="max-w-[240px] space-y-1 ">
                  <p className=" text-blue-strong font-semibold leading-6 text-base">
                    What’s new
                  </p>
                  <p className="text-sm text-[#6E6E6E] font-medium leading-[130%]">
                    We are constantly updating Orisuun&apos;s systems and adding
                    new features
                  </p>
                </div>
              </Link>
              <Link
                href="how-you-can-help-us"
                className="flex gap-3 items-start"
                onClick={closePopover}
              >
                <div className=" p-3 border-2 border-none rounded bg-[#F0F7FD] ">
                  <Image
                    src="/icons/plant.svg"
                    width={24}
                    height={24}
                    alt="plant"
                  />
                </div>
                <div className="max-w-[250px] space-y-1">
                  <p className=" text-blue-strong font-semibold leading-6 text-base">
                    Help us grow
                  </p>
                  <p className="text-sm text-[#6E6E6E] font-medium leading-[130%]">
                    Tap your network and connect Orisuun to the people we serve
                  </p>
                </div>
              </Link>
            </div>
            {/* column 2 */}
            <div className=" space-y-9">
              <Link
                href="beta"
                className="flex gap-3 items-start"
                onClick={closePopover}
              >
                <div className=" p-3 border-2 border-none rounded bg-[#F0F7FD] ">
                  <Image
                    src="/icons/launcher.svg"
                    width={28}
                    height={28}
                    alt="launcher"
                  />
                </div>
                <div className="max-w-[235px] space-y-1 ">
                  <p className=" text-blue-strong font-semibold leading-6 text-base">
                    Beta Launch and Onboarding
                  </p>
                  <p className="text-sm text-[#6E6E6E] font-medium leading-[130%]">
                    See our special offers for our early adopters
                  </p>
                </div>
              </Link>
              <Link
                href="feedback"
                className="flex gap-3 items-start"
                onClick={closePopover}
              >
                <div className=" p-3 border-2 border-none rounded bg-[#F0F7FD] ">
                  <Image
                    src="/icons/check-bag.svg"
                    width={24}
                    height={24}
                    alt="check-bag"
                  />
                </div>
                <div className="max-w-[290px] space-y-1">
                  <p className=" text-blue-strong font-semibold leading-6 text-base">
                    Feedback
                  </p>
                  <p className="text-sm text-[#6E6E6E] font-medium leading-[130%]">
                    Help us improve! Take our anonymous survey about our site
                    (Takes less than two minutes)
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Connect;
