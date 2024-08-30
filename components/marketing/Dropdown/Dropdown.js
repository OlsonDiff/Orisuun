import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from '@headlessui/react';
import Image from 'next/image';
import clsx from 'clsx';

export const DropDown = ({ whiteColor, title, isScrolled, Component }) => {
  return (
    <div className="relative">
      <Popover>
        {({ open, close }) => (
          <>
            <PopoverButton className="block text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
              <div
                className={clsx(
                  'flex items-end gap-1 pb-1',
                  !isScrolled && open && 'border-b-2 border-nav-blue',
                  !whiteColor && 'hover:opacity-80'
                )}
              >
                <span
                  className={clsx(
                    'font-semibold text-text-gray text-base',
                    open && '!text-nav-blue',
                    whiteColor && '!text-white'
                  )}
                >
                  {title}
                </span>
                {open ? (
                  <Image
                    src={
                      whiteColor && !isScrolled
                        ? '/icons/whiteDropdownClicked.svg'
                        : '/icons/dropdownClicked.svg'
                    }
                    width={22}
                    height={22}
                    alt="dropdown"
                  />
                ) : (
                  <Image
                    className=""
                    src={
                      whiteColor && !isScrolled
                        ? '/icons/whiteDropdown.svg'
                        : '/icons/dropdown.svg'
                    }
                    width={22}
                    height={22}
                    alt="dropdown"
                  />
                )}
              </div>
            </PopoverButton>
            <Transition
              enter="transition ease-out duration-75"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {/* The idea is that the popover would have no background but the width would be full but the child component would have baclground with max-width and other styling */}
              <PopoverPanel
                // anchor="bottom start"
                className={clsx(
                  'focus:outline-none z-[202] fixed left-0 right-0 !w-screen !max-w-none  ',
                  isScrolled && 'pb-2 top-[90px]  ',
                  whiteColor && !isScrolled && 'bg-white',
                  !isScrolled && 'bg-white'
                )}
                // className={clsx(
                //   'z-[202] !w-screen !max-w-none',
                //   isScrolled && ' pb-2',
                //   whiteColor && !isScrolled && 'bg-white',
                //   !isScrolled && 'bg-white'
                // )}
                style={{
                  boxShadow:
                    !isScrolled && '-10px 8px 16px 0px rgba(8, 8, 8, 0.08)',
                }}
              >
                <div
                  className={clsx(
                    'pt-[18px] px-[64px] bg-white lg:overflow-y-auto xl:overflow-y-hidden hide-scrollbar !w-screen  max-w-[1440px] mx-auto lg:pt-10 ',
                    isScrolled &&
                      '[--anchor-gap:40px] !px-8 shadow 2xl:overflow-y-hidden hide-scrollbar bg-white sticky rounded-[32px] mt-10 max-w-[1440px] 3xl:max-w-[1600px] 2k:max-w-[1800px] scroll-smooth '
                  )}
                >
                  <Component closePopover={close} />
                </div>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};
