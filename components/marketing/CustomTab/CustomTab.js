import { Tab, TabGroup, TabList } from '@headlessui/react';
import { clsx } from 'clsx';

export const CustomTab = ({
  selectedIndex,
  setSelectedIndex,
  tabList,
  className,
}) => {
  return (
    <TabGroup
      className=""
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
    >
      <TabList
        className={clsx(
          'h-[50px] md:h-[62px] small-500:w-[90vw] w-[450px] bg-[#F8F8F8] grid grid-cols-3 items-center rounded-[66px]',
          className
        )}
      >
        {tabList.map((data, i) => (
          <Tab as="div" key={i} className="focus:outline-none">
            {({ hover, selected }) => (
              <button
                className={clsx(
                  'flex flex-col w-full h-[48px] md:h-[60px] justify-center items-center focus:outline-none',
                  selected && 'bg-white rounded-[59px] shadow-price2 '
                )}
              >
                <span
                  className={clsx(
                    'leading-6 text-base md:text-xl font-medium',
                    selected ? 'text-[#1B3C7B] font-semibold' : 'text-[#808181]'
                  )}
                >
                  {data?.plan}
                </span>
                <span className="text-[10px] md:text-xs text-nav-blue font-medium">
                  {data?.free}
                </span>
              </button>
            )}
          </Tab>
        ))}
      </TabList>
    </TabGroup>
  );
};
