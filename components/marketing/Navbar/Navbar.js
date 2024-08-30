'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Hamburger from 'hamburger-react';

import { DropDown } from '../Dropdown';
import { Button } from '../Button';
import Platform from './Platform';
import Connect from './Connect';
import { usePathname } from 'next/navigation';

import { mainOptions } from '../../../data/marketing';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react';
import clsx from 'clsx';
import DemoEmbed from '../DemoEmbed';

const platformRoutes = [
  '/black-owned-businesses',
  '/professionals',
  '/experts',
  '/mentors',
  '/management-consultants',
  '/partners',
  '/investors',
  '/advocates',
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [navState, setNavState] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [openOption, setOpenOption] = useState();
  const [isPlatformRoute, setIsPlatformRoute] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setIsPlatformRoute(platformRoutes.includes(pathName));
  }, [pathName]);

  const onNavScroll = () => {
    if (window.scrollY > 15) {
      setNavState(true);
    } else {
      setNavState(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onNavScroll);

    return () => {
      window.removeEventListener('scroll', onNavScroll);
    };
  }, []);

  return (
    <div
      className={`sticky left-0 right-0 z-50 ${
        !navState ? 'top-0' : ' top-2 lg:top-5'
      }`}
      style={{
        background:
          isPlatformRoute &&
          !navState &&
          'linear-gradient(180deg, rgba(52, 100, 158, 0.80) 0%, rgba(52, 100, 158, 0.34) 49.19%, rgba(52, 100, 158, 0.00) 100%)',
      }}
    >
      <header
        style={{
          boxShadow: navState && '2px 4px 16px 0px rgba(8, 8, 8, 0.08)',
        }}
        className={` h-[100px] max-w-[1440px] 3xl:max-w-[1600px] 2k:max-w-[1800px] w-full mx-auto ${
          !navState
            ? 'p-4 lg:px-16'
            : 'px-8 py-[35.5px] right-0 left-0 flex items-center justify-center bg-white z-[200] blur-effect-theme transition-colors duration-300 rounded-[40px] align-middle'
        }`}
      >
        <nav className="flex items-end justify-between w-full relative">
          <div className="flex gap-[80px] w-full lg:w-auto justify-between lg:justify-start lg:items-end items-center">
            <Link
              href="/"
              onClick={() => {
                setOpenMenu(false);
                setOpenSubMenu(null);
              }}
            >
              <Image
                src={
                  isPlatformRoute && !navState ? 'white-logo.svg' : '/logo.svg'
                }
                className=""
                width={150}
                height={55}
                alt="logo"
                priority
              />
            </Link>
            <ul className="hidden lg:flex gap-6 relative">
              <li>
                <DropDown
                  isScrolled={navState}
                  title="Platform"
                  Component={Platform}
                  whiteColor={isPlatformRoute && !navState}
                />
              </li>
              <li>
                <DropDown
                  isScrolled={navState}
                  title="Connect"
                  Component={Connect}
                  whiteColor={isPlatformRoute && !navState}
                />
              </li>
              <li>
                <Link
                  className="font-semibold text-text-gray text-base"
                  href="/about"
                  style={{ color: isPlatformRoute && !navState && 'white' }}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="font-semibold text-text-gray text-base"
                  href="/pricing"
                  style={{ color: isPlatformRoute && !navState && 'white' }}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  className="font-semibold text-text-gray text-base"
                  href="/fund"
                  style={{ color: isPlatformRoute && !navState && 'white' }}
                >
                  Fund
                </Link>
              </li>
            </ul>
            <div className="flex items-center gap-3 lg:hidden">
              {!openMenu && (
                <Link href="/signup">
                  <Button size="sm" className="px-5">
                    Join!
                  </Button>
                </Link>
              )}
              <div className="block  bg-[#F8F8F8] rounded-full">
                <Hamburger
                  toggled={openMenu}
                  toggle={setOpenMenu}
                  label="Show menu"
                  color="black"
                  size={20}
                />
              </div>
            </div>
          </div>
          <div className="hidden lg:flex gap-2 items-end">
            <Link href="/signin">
              <Button
                size="sm"
                className="px-5"
                variant="outlined"
                style={{ color: isPlatformRoute && !navState && 'white' }}
              >
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="px-5">
                Join!
              </Button>
            </Link>
          </div>
          {openMenu && (
            <div
              className={`fixed top-16 left-0 z-100 h-full w-full flex flex-col justify-between px-4 py-8 bg-white overflow-y-auto ${
                navState ? 'top-20' : ''
              }`}
            >
              <div className="flex flex-col gap-5">
                {openOption ? (
                  <div className="flex flex-col w-full gap-6">
                    <button
                      className="w-full flex gap-2 items-center justify-start"
                      onClick={() => setOpenOption(undefined)}
                    >
                      <Image
                        src="/icons/toggle-right.svg"
                        alt="right arrow"
                        className="rotate-180"
                        width={8}
                        height={8}
                      />
                      <p className="text-base font-semibold text-blue-500">
                        {openOption}
                      </p>
                    </button>
                    {openOption === 'Connect' ? (
                      <div className="flex flex-col w-full gap-6">
                        <div className="flex flex-col justify-start gap-3">
                          <p className="text-base text-[#001E5F] font-semibold">
                            {mainOptions.connect.text}
                          </p>
                          <p className="text-sm text-[#001E5F] font-medium">
                            {mainOptions.connect.subText}
                          </p>
                        </div>
                        <div className="flex flex-col gap-6">
                          {mainOptions.connect.subLinks.map((s, i) => (
                            <Link
                              key={i}
                              href={s.link}
                              onClick={() => {
                                setOpenMenu(false);
                                setOpenOption(undefined);
                              }}
                              className="flex w-full gap-3 items-center"
                            >
                              <Image
                                src={`/icons/${s.image}.svg`}
                                alt={s.image}
                                width={20}
                                height={20}
                              />
                              <p className="text-base text-blue-500 font-semibold">
                                {s.text}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-20 w-full h-full mb-20">
                        <div className="flex w-full flex-col gap-4 justify-start">
                          <p className="text-sm text-blue-200">
                            BY MEMBER TYPE
                          </p>
                          <div className="flex flex-col gap-6 w-full">
                            {mainOptions.platform.memberType.map((m, i) => (
                              <Link
                                href={m.link}
                                key={i}
                                onClick={() => {
                                  setOpenMenu(false);
                                  setOpenOption(undefined);
                                }}
                                className="flex w-full gap-3"
                              >
                                <Image
                                  src={`/icons/${m.image}.svg`}
                                  alt={m.image}
                                  width={20}
                                  height={20}
                                />
                                <p className="text-base text-blue-500 font-semibold">
                                  {m.text}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </div>
                        <div className="flex w-full flex-col gap-4 justify-start">
                          <p className="text-sm text-blue-200">
                            BY FEATURE & FUNCTION
                          </p>
                          <div className="flex flex-col gap-6 w-full">
                            <TabGroup defaultIndex={0}>
                              <TabList className="grid grid-cols-2">
                                <Tab className="focus:outline-none">
                                  {({ hover, selected }) => (
                                    <h2
                                      className={clsx(
                                        'text-[#808181] font-semibold border-b-2 text-base pb-1',
                                        selected &&
                                          '!text-nav-blue border-nav-blue',
                                        hover && 'bg-[#001E5F]'
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
                                        'text-[#808181] font-semibold border-b-2 text-base pb-1',
                                        selected &&
                                          '!text-nav-blue border-nav-blue',
                                        hover && 'bg-[#001E5F]'
                                      )}
                                    >
                                      Support a business
                                    </h2>
                                  )}
                                </Tab>
                              </TabList>
                              <TabPanels className="h-full">
                                {mainOptions.platform.featureAndFunction.map(
                                  (f) => (
                                    <TabPanel
                                      key={f.name}
                                      className="flex w-full gap-4 overflow-y-auto"
                                    >
                                      <div className="flex flex-col py-8 w-full gap-7">
                                        {f.mainOptions.map((item, i) => (
                                          <Disclosure key={i}>
                                            <DisclosureButton className="group flex items-center justify-between w-[95%]">
                                              <div className="flex gap-2 w-full items-center">
                                                <Image
                                                  src={`/icons/${item.image}.svg`}
                                                  width={20}
                                                  height={20}
                                                  alt="support options"
                                                />
                                                <p className="text-base text-[#001E5F] font-semibold">
                                                  {item.option}
                                                </p>
                                              </div>
                                              <Image
                                                src="/icons/toggle-right.svg"
                                                alt="right arrow"
                                                className="rotate-90 group-data-[open]:-rotate-90"
                                                width={8}
                                                height={8}
                                              />
                                            </DisclosureButton>
                                            {item.subOptions.map((s, j) => (
                                              <DisclosurePanel key={j}>
                                                <Link
                                                  href={s?.link}
                                                  onClick={() => {
                                                    setOpenMenu(false);
                                                    setOpenOption(undefined);
                                                  }}
                                                  className="text-[#001E5F] font-medium text-sm"
                                                >
                                                  {s?.text}
                                                </Link>
                                              </DisclosurePanel>
                                            ))}
                                          </Disclosure>
                                        ))}
                                      </div>
                                    </TabPanel>
                                  )
                                )}
                              </TabPanels>
                            </TabGroup>
                          </div>
                        </div>
                        <div className="relative min-h-[400px] bg-mobileGradient h-full rounded-xl">
                          <div className="flex flex-col gap-5 p-6 w-full">
                            <h1 className="text-white text-center text-xl font-medium w-full items-center justify-center">
                              Learn more about Orisuun!
                            </h1>
                            <p className="text-white text-[15px] text-center font-medium w-full items-center justify-center">
                              See our growth platform in action and how it can
                              work for you!
                            </p>
                            <Button
                              className="text-white bg-transparent text-base font-bold leading-[150%] py-3 px-2.5 border border-white"
                              onClick={() => {
                                setIsOpen(true);
                              }}
                            >
                              Watch demo
                              <Image
                                src="/home/icons/exclude-white.svg"
                                className="inline-block ml-2"
                                alt="exclude"
                                loading="lazy"
                                width={20}
                                height={20}
                              />
                            </Button>
                          </div>
                          <Image
                            src="/bg/bg-mobile-menu.svg"
                            alt="bg-mobile"
                            className="w-full"
                            width={500}
                            height={500}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <div
                      className="w-full flex items-center justify-between"
                      onClick={() => {
                        setOpenOption('Platform');
                      }}
                    >
                      <div className="flex items-center justify-between w-full ">
                        <div className="font-semibold w-full text-blue-800">
                          Platform
                        </div>
                        <Image
                          src="/icons/toggle-right.svg"
                          className={openOption && 'hidden'}
                          alt="right arrow"
                          width={8}
                          height={8}
                        />
                      </div>
                    </div>
                    <div
                      className="w-full flex items-center justify-between"
                      onClick={() => {
                        setOpenOption('Connect');
                      }}
                    >
                      <div className="font-semibold w-full text-blue-800">
                        Connect
                      </div>
                      <Image
                        src="/icons/toggle-right.svg"
                        className={openOption && 'hidden'}
                        alt="right arrow"
                        width={8}
                        height={8}
                      />
                    </div>

                    {mainOptions.links.map((l, i) => (
                      <Link
                        key={i}
                        onClick={() => {
                          setOpenMenu(false);
                          setOpenOption(undefined);
                        }}
                        className="w-full flex items-center justify-between font-semibold text-blue-800"
                        href={l.link}
                      >
                        {l.mainText}
                      </Link>
                    ))}
                  </>
                )}
              </div>
              {openOption === undefined && (
                <div className="flex gap-2 w-full justify-between items-center mb-20">
                  <Link href="/signin" className="w-full">
                    <Button
                      size="sm"
                      className="px-5 w-full text-base font-semibold"
                      variant="outlined"
                      style={{ color: isPlatformRoute && !navState && 'white' }}
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup" className="w-full">
                    <Button
                      size="sm"
                      className="px-5 w-full text-base font-semibold"
                    >
                      Join!
                    </Button>
                  </Link>
                </div>
              )}
              <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50"
              >
                <div className="fixed inset-0 flex w-screen bg-[#111] bg-opacity-80 items-center justify-center ">
                  <DialogPanel className="space-y-4">
                    <div className="w-[925px] 2xl:w-[1200px] 2k:w-[1300px] max-w-[90vw] rounded-xl overflow-hidden">
                      <DemoEmbed />
                    </div>
                  </DialogPanel>
                </div>
              </Dialog>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
}
