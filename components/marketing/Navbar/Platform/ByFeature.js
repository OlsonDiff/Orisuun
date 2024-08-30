import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import {
  platformResources,
  platformTools,
  platformToolSupport,
} from '../../../../data/marketing';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

const ByFeature = ({ closePopover }) => {
  return (
    <div>
      <TabGroup defaultIndex={0} className="mb-[32px]">
        <TabList className="grid gap-3 grid-cols-2">
          <Tab className="focus:outline-none">
            {({ hover, selected }) => (
              <h2
                className={clsx(
                  'text-[#808181] border-b-2 font-medium text-lg pb-1',
                  selected && '!text-nav-blue border-nav-blue',
                  hover && 'bg-[#F0F7FD]'
                )}
              >
                Grow your business
              </h2>
            )}
          </Tab>
          <Tab className="focus:outline-none">
            {({ hover, selected }) => (
              <h2
                className={clsx(
                  'text-[#808181] border-b-2 font-medium text-lg pb-1',
                  selected && '!text-nav-blue border-nav-blue',
                  hover && 'bg-[#F0F7FD]'
                )}
              >
                Support a business
              </h2>
            )}
          </Tab>
        </TabList>

        {/* panel 1 */}
        <TabPanels className="h-[500px]">
          <TabPanel className="grid grid-cols-2 gap-4 overflow-y-auto">
            {/* col 1 */}
            <div className="pt-6">
              <div className="flex gap-2 px-3 py-2.5 rounded-xl bg-[#F1F2F2]">
                <Image
                  className=""
                  src="/icons/tools.svg"
                  width={19}
                  height={19}
                  alt="tools"
                />
                <h6 className="text-blue-strong font-bold ml-3">
                  Platform tools
                </h6>
              </div>
              <div className="font-medium text-blue-strong flex flex-col mt-4 max-w-[325px] ">
                {platformTools.map((item, i) => (
                  <Link
                    key={i}
                    href={item?.link}
                    onClick={closePopover}
                    className="group hover:bg-[#F0F7FD] hover:rounded-md py-2.5 flex items-center justify-between"
                  >
                    <p className="pl-3">{item?.text}</p>
                    <Image
                      src="/icons/chevron-right.svg"
                      width={24}
                      height={24}
                      alt="chevron-right"
                      className=" group-hover:inline hidden"
                    />
                  </Link>
                ))}
              </div>
            </div>
            {/* col 2 */}
            <div className="pt-6">
              <div className="flex gap-2 px-3 py-2.5 rounded-xl bg-[#F1F2F2]">
                <Image
                  className=""
                  src="/icons/resource.svg"
                  width={19}
                  height={19}
                  alt="resources"
                />
                <h6 className="text-blue-strong font-bold">
                  Platform Resources
                </h6>
              </div>
              <div className="font-medium text-blue-strong flex flex-col mt-4">
                {platformResources.map((item, i) => (
                  <Link
                    key={i}
                    href={item?.link}
                    onClick={closePopover}
                    className="group  hover:bg-[#F0F7FD]  hover:rounded-md px-3 py-2.5 flex items-center justify-between"
                  >
                    <span>{item?.text}</span>
                    <Image
                      src="/icons/chevron-right.svg"
                      width={24}
                      height={24}
                      alt="chevron-right"
                      className=" group-hover:visible invisible"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </TabPanel>

          {/* panel 2 */}
          <TabPanel className="grid grid-cols-2 gap-4">
            {/* col 1 */}
            <div className="pt-4">
              <div className="flex gap-2 px-3 py-2.5 rounded-xl bg-[#F1F2F2]">
                <Image
                  className=""
                  src="/icons/tools.svg"
                  width={19}
                  height={19}
                  alt="tools"
                />
                <h6 className="text-blue-strong font-bold">Platform tools</h6>
              </div>
              <div className="font-medium text-blue-strong flex flex-col gap-3  mt-3">
                {platformToolSupport.map((item, i) => (
                  <Link
                    key={i}
                    href={item?.link}
                    onClick={closePopover}
                    className="group  hover:bg-[#F0F7FD]  hover:rounded-md px-3 py-2 flex items-center justify-between"
                  >
                    <span>{item?.text}</span>
                    <Image
                      src="/icons/chevron-right.svg"
                      width={24}
                      height={24}
                      alt="chevron-right"
                      className=" group-hover:inline hidden"
                    />
                  </Link>
                ))}
              </div>
            </div>
            {/* col 2 */}
            <div className="pt-4">
              <div className="flex gap-2 px-3 py-2.5 rounded-xl bg-[#F1F2F2]">
                <Image
                  className=""
                  src="/icons/support.svg"
                  width={19}
                  height={19}
                  alt="support options"
                />
                <h6 className="text-blue-strong font-bold">Support options</h6>
              </div>
              <div className="font-medium text-blue-strong flex flex-col gap-3  mt-3 max-w-[390px] ">
                {platformResources.map((item, i) => (
                  <Link
                    key={i}
                    href={item?.link}
                    onClick={closePopover}
                    className="group  hover:bg-[#F0F7FD]  hover:rounded-md px-3 py-2 flex items-center justify-between"
                  >
                    <span>{item?.text}</span>
                    <Image
                      src="/icons/chevron-right.svg"
                      width={24}
                      height={24}
                      alt="chevron-right"
                      className=" group-hover:inline hidden"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default ByFeature;
