"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Hamburger from "hamburger-react";

import { DropDown } from "../Dropdown";
import { Button } from "../Button";
import Platform from "./Platform";
import Connect from "./Connect";
import { mobileNavItems } from "@/data";
import { useJoinContext } from "@/context";
import { JoinModal } from "../Modal";

export function Navbar() {
  const [navState, setNavState] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const { setOpenJoin, openJoin } = useJoinContext();

  const handleSubMenu = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  const onNavScroll = () => {
    if (window.scrollY > 15) {
      setNavState(true);
    } else {
      setNavState(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onNavScroll);

    return () => {
      window.removeEventListener("scroll", onNavScroll);
    };
  }, []);

  return (
    <header
      className={`sticky h-[94px]  ${
        !navState
          ? "right-0 z-50 p-4 lg:px-16"
          : "mx-1 lg:mx-16 px-8 pt-8 pb-10 top-2 lg:top-5 left-0 right-0  flex items-center justify-center bg-white z-[200] blur-effect-theme transition-colors duration-300 rounded-[40px] shadow-2xl"
      }`}
    >
      <nav className="flex items-end justify-between w-full relative">
        <div className="flex gap-14 w-full lg:w-auto justify-between lg:justify-start lg:items-end">
          <Link
            href="/"
            onClick={() => {
              setOpenMenu(false);
              setOpenSubMenu(null);
            }}
          >
            <Image
              src="/logo.svg"
              className=""
              width={150}
              height={55}
              alt="logo"
            />
          </Link>
          <ul className="hidden lg:flex gap-6 relative">
            <li>
              <DropDown
                isScrolled={navState}
                title="Platform"
                Component={Platform}
              />
            </li>
            <li>
              <DropDown
                isScrolled={navState}
                title="Connect"
                Component={Connect}
              />
            </li>
            <li>
              <Link
                className="font-semibold text-text-gray text-base"
                href="/about"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="font-semibold text-text-gray text-base"
                href="/pricing"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                className="font-semibold text-text-gray text-base"
                href="/fund"
              >
                Fund
              </Link>
            </li>
          </ul>
          <div className="block lg:hidden">
            <Hamburger
              toggled={openMenu}
              toggle={setOpenMenu}
              label="Show menu"
              color="black"
              size={20}
            />
          </div>
        </div>
        <div className="hidden lg:flex gap-2 items-end">
          <Link href="/signin">
            <Button size="sm" className="px-5" variant="outlined">
              Sign In
            </Button>
          </Link>

          <Button onClick={() => setOpenJoin(true)} size="sm" className="px-5">
            Join!
          </Button>
        </div>
        {openMenu && (
          <div className="fixed top-16 left-0 h-screen w-full pl-6 py-6 bg-[white]">
            {mobileNavItems.map((item, i) => (
              <div
                key={i}
                className="w-full h-[3rem] flex items-center justify-between border-t"
              >
                <Link
                  className="font-semibold w-full  text-blue-strong"
                  href={item?.link}
                  onClick={() => {
                    setOpenMenu(false);
                    setOpenSubMenu(null);
                  }}
                >
                  {item.text}
                </Link>
                {item?.hasButton === true && (
                  <button
                    onClick={() => handleSubMenu(i)}
                    className="bg-[#F6F6F6] px-10 sm:px-16 h-full grid place-items-center "
                  >
                    <Image
                      src="/icons/toggle.svg"
                      className=" rotate-[270deg]"
                      alt="right arrow"
                      width={20}
                      height={20}
                    />
                  </button>
                )}
                <div
                  className={`fixed h-screen w-full bg-white py-4 pl-4 top-0 left-0 submenu ${
                    openSubMenu === i ? "submenu-open" : ""
                  }`}
                >
                  <button
                    onClick={() => setOpenSubMenu(null)}
                    className="flex gap-1 items-center h-[3rem] pl-2 text-nav-blue font-medium bg-[#F2F5FE] text-sm w-full"
                  >
                    <Image
                      src="/icons/dropdownClicked.svg"
                      className="rotate-[270deg]"
                      alt="right arrow"
                      width={20}
                      height={20}
                    />
                    <span>Back</span>
                  </button>
                  {item?.subMenu?.map((subitem, j) => (
                    <div key={j} className="w-full h-[3rem] flex border-t py-4">
                      <Link
                        className="font-medium text-sm px-2 w-full"
                        href={subitem?.subLink}
                        onClick={() => {
                          setOpenMenu(false);
                          setOpenSubMenu(null);
                        }}
                      >
                        {subitem?.subText}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="w-full border-t py-2">
              <button
                onClick={() => {
                  setOpenMenu(false);
                  setOpenSubMenu(null);
                  setOpenJoin(true);
                }}
                className="font-semibold text-blue-strong"
              >
                Join!
              </button>
            </div>
          </div>
        )}
        {openJoin && <JoinModal />}
      </nav>
    </header>
  );
}
