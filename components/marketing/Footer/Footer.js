'use client';
import { useState, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { FooterForm } from './FooterForm';
import { LinkedinIcon } from '../SVG/LinkedinIcon/LinkedinIcon';
import { FacebookIcon } from '../SVG/FacebookIcon/FacebookIcon';
import { InstagramIcon } from '../SVG/InstagramIcon/InstagramIcon';
import { TwitterIcon } from '../SVG/TwitterIcon/TwitterIcon';
import { DemoVideoDialog } from '../Navbar/Platform';

export function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);

  useEffect(() => {
    if (shouldOpenDialog) {
      setIsOpen(true);
    }
  }, [shouldOpenDialog]);

  const handleWatchDemoClick = () => {
    setShouldOpenDialog(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setShouldOpenDialog(false);
  };

  return (
    <div>
      <div className="flex gap-3 justify-center mt-10 lg:hidden">
        <a
          href="https://www.youtube.com/@orisuun"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
        >
          <LinkedinIcon />
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=61563305668351"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FacebookIcon />
        </a>
        <a
          href="https://www.instagram.com/realorisuun/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <InstagramIcon />
        </a>
        <a
          href="https://twitter.com/intent/follow?screen_name=realorisuun"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <TwitterIcon />
        </a>
      </div>
      <footer className="xl:px-[80px] px-4 lg:py-[50px] !mx-auto max-w-[1440px] 3xl:max-w-[1600px] 2k:max-w-[1800px] ">
        <div className="mt-[60px] lg:mt-[53px] w-full ">
          <div className="grid grid-cols-2  md:grid-cols-4 gap-12 lg:grid-cols-5 justify-between ">
            {/* colum 1 */}
            <div className="hidden lg:block">
              <h4 className="text-black-500-custom text-[20px] font-bold leading-7 mb-4">
                Connect
              </h4>
              <div className="flex gap-[7px]">
                <a
                  href="https://www.youtube.com/@orisuun"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <LinkedinIcon />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61563305668351"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="https://www.instagram.com/realorisuun/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://twitter.com/intent/follow?screen_name=realorisuun"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <TwitterIcon />
                </a>
              </div>
            </div>
            <div className="">
              <h4 className="text-blue-strong text-base leading-[20.8px] md:text-black-500-custom md:text-[20px] font-bold md:leading-7 mb-4">
                Orisuun and you
              </h4>
              <nav>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/black-owned-businesses"
                      className="text-[14px] font-medium leading-[130%] text-[#5A5A5A] hover:text-nav-blue"
                    >
                      For Black-Owned Businesses
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/management-consultants"
                      className="text-[14px] font-medium leading-[130%] text-[#5A5A5A] hover:text-nav-blue"
                    >
                      For Management Consultants
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/experts"
                      className="text-[14px] font-medium leading-[130%] text-[#5A5A5A] hover:text-nav-blue"
                    >
                      For Experts
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/professionals"
                      className="text-[14px] font-medium leading-[130%] text-[#5A5A5A] hover:text-nav-blue"
                    >
                      For Professionals
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/investors"
                      className="text-[14px] font-medium leading-[130%] text-[#5A5A5A] hover:text-nav-blue"
                    >
                      For Investors
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/mentors"
                      className="text-[14px] font-medium leading-[130%] text-[#5A5A5A] hover:text-nav-blue"
                    >
                      For Mentors
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/partners"
                      className="text-[14px] font-medium leading-[130%] text-[#5A5A5A] hover:text-nav-blue"
                    >
                      For Partners
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/advocates"
                      className="text-[14px] font-medium leading-[130%] text-[#5A5A5A] hover:text-nav-blue"
                    >
                      For Advocates
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            {/* colum 2 */}
            <div className="w-fit">
              <h4 className="text-blue-strong text-base leading-[20.8px] md:text-black-500-custom md:text-[20px] font-bold md:leading-7 mb-4">
                The Company
              </h4>
              <nav>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/about"
                      className="text-[14px] font-medium leading-[130%] text-[#5A5A5A] hover:text-nav-blue"
                    >
                      Who We Are
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-[14px] font-medium leading-[130%] text-[#5A5A5A] hover:text-nav-blue"
                    >
                      What We Are Not
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-[14px] font-medium leading-[130%] text-[#5A5A5A] hover:text-nav-blue"
                    >
                      How We Can Help You
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-[14px] font-medium leading-[130%] text-[#5A5A5A] hover:text-nav-blue"
                    >
                      Why This Is Critical
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-[14px] font-medium leading-[130%] text-[#5A5A5A] hover:text-nav-blue"
                    >
                      Our Values
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-[14px] font-medium leading-[130%] text-[#5A5A5A] hover:text-nav-blue"
                    >
                      Our Vision
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/how-you-can-help-us"
                      className="text-[14px] font-medium leading-[130%] text-[#5A5A5A] hover:text-nav-blue"
                    >
                      How You Can Help Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/new"
                      className="text-[14px] font-medium leading-[130%] text-[#5A5A5A] hover:text-nav-blue"
                    >
                      What’s New
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/new"
                      className="text-[14px] font-medium leading-[130%] text-[#5A5A5A] hover:text-nav-blue"
                    >
                      What’s Coming
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/feedback"
                      className="text-[14px] font-medium leading-[130%] text-[#5A5A5A] hover:text-nav-blue"
                    >
                      We Need Your Feedback
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-[14px] font-medium leading-[130%] text-[#5A5A5A] hover:text-nav-blue"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* column 3 */}
            <div className="">
              <h4 className="text-blue-strong text-base leading-[20.8px] md:text-black-500-custom md:text-[20px] font-bold md:leading-7 mb-4">
                Fund
              </h4>
              <nav>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/fund"
                      className="text-[14px] font-medium leading-[130%] text-[#5A5A5A] hover:text-nav-blue"
                    >
                      The Black Wealth Fund
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* column 4*/}
            <div className="">
              <h4 className="text-blue-strong text-base leading-[20.8px] md:text-black-500-custom md:text-[20px] font-bold md:leading-7 mb-4">
                Check Us Out
              </h4>
              <nav>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={handleWatchDemoClick}
                      className="text-[14px] font-medium leading-[130%] text-[#5A5A5A] hover:text-nav-blue border-none outline-none"
                    >
                      Demo Our Platform
                    </button>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className="text-[14px] font-medium leading-[130%] text-[#5A5A5A] hover:text-nav-blue"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className="text-[14px] font-medium leading-[130%] text-[#5A5A5A] hover:text-nav-blue"
                    >
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className="text-[14px] font-medium leading-[130%] text-[#5A5A5A] hover:text-nav-blue"
                    >
                      Sign Up
                    </Link>
                  </li>
                </ul>

                {isOpen && (
                  <DemoVideoDialog isOpen={isOpen} handleClose={handleClose} />
                )}
              </nav>
            </div>
          </div>
        </div>
        <FooterForm />
      </footer>
    </div>
  );
}
