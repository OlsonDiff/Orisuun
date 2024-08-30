'use client';

import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/data/store';
import { getProfileType, resetUserState } from '@/data/slices/user-slice';
import { resetAuthState } from '@/data/slices/auth-slice';
import { cn } from '@/utils/utils';
import useOutsideClick from '@/hooks/useOutsideClick';

import ArrowDown from '@/icons/arrow-down';
import BellIcon from '@/icons/sidebar/bell-icon';
import BusinessDevelopmentIcon from '@/icons/sidebar/business-development-icon';
import ChatsIcon from '@/icons/sidebar/chats-icon';
import CofounderIcon from '@/icons/sidebar/cofounder-icon';
import Collapse from '@/icons/sidebar/collapse';
import DashboardIcon from '@/icons/sidebar/dashboard-icon';
import DiscountPortalIcon from '@/icons/sidebar/discount-portal-icon';
import EscrowIcon from '@/icons/sidebar/escrow-icon';
import ExploreIcon from '@/icons/sidebar/explore-icon';
import FavouritesIcon from '@/icons/sidebar/favourites-icon';
import FundRaisingIcon from '@/icons/sidebar/fund-raising-icon';
import LeaderboardIcon from '@/icons/sidebar/leaderboard-icon';
import LogoBW from '@/icons/logo-b&w';
import LogoSM from '@/icons/logo-sm';
import ProfileSearchIcon from '@/icons/sidebar/profile-search-icon';
import SearchIcon from '@/icons/sidebar/search-icon';
import User from '@/icons/user';
import Logout from '@/icons/logout';
import VerifyIcon from '@/icons/verification/verify-icon';
import StyledTick from '@/icons/verification/styled-tick';
import { useMobileMediaQuery } from '@/hooks/useMediaQuery';
import { setOpenSidebar } from '@/data/slices/common-slice';
import { getUserProfileTypes } from '@/server-actions/profile';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';


interface IProps {
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: React.FC<IProps> = ({ expanded, setExpanded }) => {
  const { openSidebar } = useSelector((state: RootState) => state.common);
  const pathname = usePathname();
  const router = useRouter();
  const [showOptions, setShowOptions] = useState(false);
  const ref = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const isMobile = useMobileMediaQuery("1024px");
  // useOutsideClick(ref, () => setShowOptions(false));

  const fetchProfileType = useCallback(async () => {
    try {
      const response = await getUserProfileTypes();

      if (response.success) {
        dispatch(getProfileType(response.data));
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching profile type:', error);

      toast('Failed to fetch user data', {
        toastId: 'api-error',
        type: 'error',
      });
    }
  }, [dispatch, router]);

  useEffect(() => {
    fetchProfileType();
  }, [fetchProfileType]);

  useEffect(() => {
    if (!user) {
      // If no user is found, redirect to the login page but check for api calls first
    } else {
      if (
        user &&
        !user.BusinessBasicProfileData &&
        !user.IndividualBasicProfileData &&
        pathname !== '/my-profiles/new-profile'
      ) {
        toast('User data not found', {
          toastId: 'api-error',
          type: 'error',
        });
        router.push('/my-profiles/new-profile');
      }
    }
  }, [user, router]);

  useEffect(() => {
    setShowOptions(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobile) {
      dispatch(setOpenSidebar());
    }
  }, [dispatch, isMobile]);

  const CustomLink = ({
    url,
    icon,
    text,
    expanded = false,
  }: {
    url: string;
    icon: React.ReactNode;
    text: string;
    expanded: boolean;
  }) => {
    return (
      <Link
        title={text}
        className={cn(
          'w-full flex items-center gap-3 px-3 py-3 text-h8 2xl:text-scaled-h8 font-medium border-l-2 border-transparent',
          pathname === url
            ? 'text-omblue-700 font-semibold border-omblue-700'
            : '',
          expanded ? '' : 'justify-center'
        )}
        href={url}
        onClick={() => setShowOptions(false)}
      >
        <div className="">{icon}</div>
        {expanded && <p className="">{text}</p>}
      </Link>
    );
  };
  const handleLogout = () => {
    localStorage.clear();
    // Clear the 'token' cookie
    Cookies.remove('token', { path: '/' });

    // Clear the 'userData' cookie
    Cookies.remove('userData', { path: '/' });
    dispatch(resetUserState());
    dispatch(resetAuthState());
    router.push('/signin');
  };

  return (
    <aside
      className={cn(
        'fixed z-[99] shadow-2xl h-full block overflow-y-auto transition-all duration-300 px-2 bg-white',
        openSidebar && isMobile ? '-translate-x-full' : 'translate-x-0',
        expanded && !isMobile
          ? 'md:w-[250px] 2xl:w-[calc(250px*var(--scale-factor))]'
          : !expanded && !isMobile
            ? 'md:w-[120px] 2xl:w-[calc(120px*var(--scale-factor))]'
            : ''
      )}
    >
      <div className="flex flex-col w-full h-full">

        <div
          onClick={() => {
            console.log("clickeed");

            if (isMobile) {
              dispatch(setOpenSidebar());
              return;
            }
            setExpanded(!expanded);
          }}
          className="cursor-pointer w-full flex items-center justify-between px-6 py-[18px]"
        >
          {!expanded ? (
            <LogoSM className="w-10 h-10 mx-auto" />
          ) : (
            <>
              <LogoBW className="w-28 h-8" />
              <Collapse className="w-5 h-5" />
            </>
          )}
        </div>
        <hr className="my-2 md:my-4" />

        <div
          className={cn(
            'w-full flex flex-grow-1 flex-col font-medium text-blue-300',
            expanded ? 'items-start' : 'items-center'
          )}
        >
          <CustomLink
            url="/explore"
            icon={
              <ExploreIcon className="2xl:w-scaled-4 2xl:h-scaled-4 w-5 h-5" />
            }
            text="Explore"
            expanded={expanded}
          />

          <hr className="w-full my-2 md:my-4" />

          <CustomLink
            url="/dashboard"
            icon={
              <DashboardIcon className="2xl:w-scaled-4 2xl:h-scaled-4 xs:w-5 xs:h-5" />
            }
            text="Dashboard"
            expanded={expanded}
          />

          <CustomLink
            url={'/business-development'}
            icon={
              <BusinessDevelopmentIcon className="2xl:w-scaled-4 2xl:h-scaled-4 xs:w-5 xs:h-5" />
            }
            text="Business Development"
            expanded={expanded}
          />

          <CustomLink
            url={'/cofounder-and-board-matcher'}
            icon={
              <CofounderIcon className="2xl:w-scaled-4 2xl:h-scaled-4 xs:w-5 xs:h-5" />
            }
            text="Co-Founder & Board Matcher"
            expanded={expanded}
          />
          <CustomLink
            url={'/discount-portal'}
            icon={
              <DiscountPortalIcon className="2xl:w-scaled-4 2xl:h-scaled-4 xs:w-5 xs:h-5" />
            }
            text="Discount Portal"
            expanded={expanded}
          />
          <CustomLink
            url={'/fundraising'}
            text="Fundraising"
            icon={
              <FundRaisingIcon className="2xl:w-scaled-4 2xl:h-scaled-4 xs:w-5 xs:h-5" />
            }
            expanded={expanded}
          />

          <CustomLink
            url={'/chats'}
            icon={
              <ChatsIcon className="2xl:w-scaled-4 2xl:h-scaled-4 xs:w-5 xs:h-5" />
            }
            text="Chats"
            expanded={expanded}
          />
          <CustomLink
            url={'/transactions-and-escrow'}
            icon={
              <EscrowIcon className="2xl:w-scaled-4 2xl:h-scaled-4 xs:w-5 xs:h-5" />
            }
            text="Transactions & Escrow"
            expanded={expanded}
          />
          <CustomLink
            url={'/favourites'}
            icon={
              <FavouritesIcon className="2xl:w-scaled-4 2xl:h-scaled-4 xs:w-5 xs:h-5" />
            }
            text="Favourites"
            expanded={expanded}
          />
          <CustomLink
            url={'/leaderboard'}
            icon={
              <LeaderboardIcon className="2xl:w-scaled-4 2xl:h-scaled-4 xs:w-5 xs:h-5" />
            }
            text="Leaderboard"
            expanded={expanded}
          />
          <hr className="w-full my-2 md:my-4" />
          <CustomLink
            url={'/profile-search'}
            icon={
              <ProfileSearchIcon className="2xl:w-scaled-4 2xl:h-scaled-4 xs:w-5 xs:h-5" />
            }
            text="Profile Search"
            expanded={expanded}
          />
          <CustomLink
            url={'/post-search'}
            icon={
              <SearchIcon className="2xl:w-scaled-4 2xl:h-scaled-4 xs:w-5 xs:h-5" />
            }
            text="Post Search"
            expanded={expanded}
          />
        </div>
        <hr className="my-2 md:my-4" />
        <div className="mt-auto">
          <CustomLink
            url={'/notifications'}
            icon={
              <BellIcon className="2xl:w-scaled-4 2xl:h-scaled-4 xs:w-5 xs:h-5" />
            }
            text="Notifications"
            expanded={expanded}
          />
          <div className="relative">
            <div
              className="flex items-center gap-3 px-5 py-3 mb-4 text-h8 2xl:text-scaled-h8 cursor-pointer"
              onClick={() => setShowOptions(!showOptions)}
            >
              <Image
                src={`https://orisuundocumentsdev.blob.core.windows.net/user-profile/${user?.ProfilePicture}`}
                alt="user profile"
                width={24}
                height={24}
                className={cn(
                  'xs:w-5 xs:h-5 2xl:w-scaled-4 2xl:h-scaled-4 rounded-full',
                  expanded ? '' : 'mx-auto'
                )}
              />
              <p className={expanded ? 'block leading-tight' : 'hidden'}>
                {user ? user.UserName : 'Test User'}
              </p>
              <ArrowDown
                className={
                  expanded
                    ? 'block xs:w-5 xs:h-5 2xl:w-scaled-4 2xl:h-scaled-4 rounded-full'
                    : 'hidden'
                }
              />
            </div>

            <div
              className={cn(
                'bg-white shadow absolute p-1 right-2 bottom-10 z-50 text-blue-300',
                { hidden: !showOptions }
              )}
              ref={ref}
            >
              <CustomLink
                url={'/my-profiles'}
                icon={
                  <User className="2xl:w-scaled-4 2xl:h-scaled-4 w-scaled-5 h-scaled-5" />
                }
                text="Profile"
                expanded={expanded}
              />

              <CustomLink
                url="/verification"
                icon={
                  <StyledTick className="2xl:w-scaled-4 2xl:h-scaled-4 w-scaled-5 h-scaled-5" />
                }
                text="Verification"
                expanded={expanded}
              />
              <CustomLink
                url="/subscription-plan"
                icon={
                  <VerifyIcon className="2xl:w-scaled-4 2xl:h-scaled-4 w-scaled-5 h-scaled-5" />
                }
                text="Subscription Plan"
                expanded={expanded}
              />
              <button
                className="flex items-center gap-3 px-5 py-3 text-h8 2xl:text-scaled-h8 w-full text-left"
                onClick={handleLogout}
              >
                <Logout className="2xl:w-scaled-4 2xl:h-scaled-4 w-scaled-5 h-scaled-5" />
                <p className={expanded ? 'block leading-tight' : 'hidden'}>
                  Logout
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
