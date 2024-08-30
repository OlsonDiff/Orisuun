'use client';
import { useState } from 'react';
import { Button } from '..';
import Image from 'next/image';
import { Dialog, DialogPanel } from '@headlessui/react';
import DemoEmbed from '../DemoEmbed';
import Link from 'next/link';
const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);
  const images = [
    '/home/images/illustration-home.png',
    '/home/images/illustration-home-two.png',
    '/home/images/illustration-home-three.png',
  ];

  // Set the initial state to a random image
  const [selectedImage, setSelectedImage] = useState(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  });

  return (
    <section className="px-4 lg:pl-[80px] w-full overflow-hidden">
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
      <div className="flex flex-col lg:flex-row lg:gap-0 justify-center 2xl:scale-105 2k:scale-110 relative  ">
        <div className="mt-[44px] md:mt-[111px]  md:max-w-[593px] mx-auto lg:mx-0 text-start  ">
          <p className="text-[#8E95A4] text-base font-semibold leading-[110%] uppercase mb-4 ">
            Welcome to Orisuun!
          </p>
          <h2 className="text-blue-strong text-[28px] leading-[33.6px] md:text-[48px] font-semibold md:leading-[110%] mb-6 max-w-[240px] md:max-w-[593px]">
            We connect business owners and growth-minded collaborators
          </h2>
          <Image
            src="/home/images/home-curve.svg"
            alt="curve"
            width={100}
            height={120}
            loading="lazy"
            className="absolute top-0 -right-10 small-500:-right-10  md:hidden small-500:overflow-x-clip"
          />
          <p className="text-[#5B657B] text-xl font-medium leading-[150%] mx-auto lg:mx-0 lg:max-w-[459px] mb-[60px] text-left">
            We connect Black-owned businesses with a vast network of investors,
            mentors, clients, and professionals eager to support their journey.
          </p>
          <div className="flex gap-4 flex-col justify-center items-center lg:justify-start md:flex-row">
            <Link href="/signup">
              <Button className="text-base font-bold leading-[150%] text-white py-2.5 px-5">
                Join the community
              </Button>
            </Link>

            <Button
              onClick={() => {
                setIsOpen(true);
              }}
              className="bg-white text-[#3d3d3d] text-base font-bold leading-[150%] py-2.5 px-5 border border-[#D8D9D9]"
            >
              Watch demo{' '}
              <Image
                src="/home/icons/exclude.svg"
                className="inline-block ml-2"
                alt="exclude"
                loading="lazy"
                width={20}
                height={20}
              />
            </Button>
          </div>
        </div>
        <div className="mt-[20px] mb-[85px] max-w-[796px] hidden md:block">
          <Image
            src={selectedImage}
            alt="illustration-home"
            width={796}
            height={701}
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 796px"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
