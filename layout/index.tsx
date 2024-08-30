'use client';

import React, { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import Sidebar from './sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { addCurrentUser } from '@/data/slices/user-slice';
import { RootState } from '@/data/store';
import { getLoggedInUserDataAction } from '@/server-actions/createProfile';
import { cn } from '@/utils/utils';
import Hamburger from '@/icons/sidebar/hamburger';
import { setOpenSidebar } from '@/data/slices/common-slice';
import { useMobileMediaQuery } from '@/hooks/useMediaQuery';
import useOutsideClick from '@/hooks/useOutsideClick';

interface IProps {
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
  const isMobile = useMobileMediaQuery("1024px");
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { openSidebar } = useSelector((state: RootState) => state.common);
  const token =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('accessToken') ?? ''
      : '';

  const dispatch = useDispatch();
  const handleGetUserData = useCallback(async () => {
    try {
      const result = await getLoggedInUserDataAction(token);
      if (result.success) {
        dispatch(addCurrentUser(result.data));
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, token]);
  const useOutsideClick = (callback) => {
    const ref = React.useRef();

    React.useEffect(() => {
      const handleClick = (event) => {
        callback();
      };

      document.addEventListener('click', handleClick);

      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, []);

    return ref;
  };
  const handleClickOutside = () => {

    console.log(openSidebar, "openSidebar");
    if (isMobile) {
      dispatch(setOpenSidebar());
      return;
    }
  };
  // const ref = useOutsideClick(handleClickOutside);
  // useOutsideClick(ref, () =>  dispatch(setOpenSidebar()));
  useEffect(() => {
    if (token && !currentUser) {
      handleGetUserData();
    }
  }, [token, currentUser, handleGetUserData]);

  useEffect(() => {
    const updateScaleFactor = () => {
      const scaleFactor = Math.min(
        window.innerWidth / 1440,
        window.innerHeight / 900
      );
      document.documentElement.style.setProperty(
        '--scale-factor',
        scaleFactor.toString()
      );

      // Calculate and set the sidebar width
      const sidebarWidth = 250 * scaleFactor;
      document.documentElement.style.setProperty(
        '--sidebar-width',
        `${sidebarWidth}px`
      );
    };

    updateScaleFactor();
    window.addEventListener('resize', updateScaleFactor);
    return () => window.removeEventListener('resize', updateScaleFactor);
  }, []);

  return (
    <div className="">
      <Sidebar expanded={expanded} setExpanded={setExpanded} />
      <Hamburger className='hamburger-icon' onClick={() => {
        if (isMobile) {
          dispatch(setOpenSidebar());
          return;
        }
      }} />
      <main
        className={cn(
          `overflow-auto transition-all duration-300`,
          expanded
            ? 'lg:ml-[250px] 2xl:ml-[calc(250px*var(--scale-factor))]'
            : 'lg:ml-[120px] 2xl:ml-[calc(120px*var(--scale-factor))]'
        )}
      // ref={ref}
      >
        <div className="h-full w-full">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
