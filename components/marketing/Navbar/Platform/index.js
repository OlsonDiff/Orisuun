import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Dialog,
  DialogPanel,
} from '@headlessui/react';
import clsx from 'clsx';
import Image from 'next/image';
import MemberType from './MemberType';
import ByFeature from './ByFeature';
import Play from '../../../../public/images/play.png';
import DemoEmbed from '../../DemoEmbed';
import { useState, useEffect, useRef } from 'react';

const Platform = ({ closePopover }) => {
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
    <div
      className={` relative focus:outline-none ${isOpen ? ' h-[calc(100vh-100px)] z-50 overflow-hidden ' : ''
        }`}
    >
      <TabGroup defaultIndex={0} className="flex gap-8 focus:outline-none">
        <TabList className="flex flex-col gap-[10px]">
          <Tab className="focus:outline-none">
            {({ hover, selected }) => (
              <div
                className={clsx(
                  'flex items-center justify-between focus:outline-none data-[focus]:outline-white outline-none w-[195px] py-2.5 px-3',
                  selected && 'bg-[#F0F7FD]',
                  hover && 'bg-[#F0F7FD]'
                )}
              >
                <p className="text-blue-strong text-[15px] font-semibold">
                  By member type
                </p>
                {selected && (
                  <Image
                    className=""
                    src="/icons/right.svg"
                    width={22}
                    height={22}
                    alt="dropdown"
                  />
                )}
              </div>
            )}
          </Tab>
          <Tab className="focus:outline-none">
            {({ hover, selected }) => (
              <div
                className={clsx(
                  'flex items-center justify-between w-[195px] py-2.5 px-3',
                  selected && 'bg-[#F0F7FD]',
                  hover && 'bg-[#F0F7FD]'
                )}
              >
                <p className="text-blue-strong font-semibold text-[15px]">
                  By feature & function
                </p>
                {selected && (
                  <Image
                    className=""
                    src="/icons/right.svg"
                    width={22}
                    height={22}
                    alt="dropdown"
                  />
                )}
              </div>
            )}
          </Tab>
        </TabList>
        <TabPanels className="w-full">
          <TabPanel className="w-full grid grid-cols-3 gap-12 relative">
            <div className="col-span-2">
              <MemberType closePopover={closePopover} />
            </div>
            <div className="relative">
              <div className="bg-frame bg-cover mb-8 rounded-xl min-h-[416px] max-h-[416px]" />
              <button
                onClick={handleWatchDemoClick}
                className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] px-3 py-[10px] flex items-center gap-2 z-30 rounded-xl cursor-pointer border border-white"
              >
                <p className="text-sm font-semibold text-white">Watch Demo</p>
                <div className="py-[2px]">
                  <Image
                    className=""
                    src={Play}
                    width={16}
                    height={16}
                    alt="play"
                  />
                </div>
              </button>
            </div>
          </TabPanel>

          <TabPanel className="w-full grid grid-cols-3 gap-12 relative h-full pb-12">

            <div className="col-span-2">
              <ByFeature closePopover={closePopover} />
            </div>
            <div className="absolute right-0">
              <div className="bg-frame2 2xl:w-[346px] lg:w-[275px] xl:w-[312px] w-full aspect-[346/416] bg-center bg-cover mb-8 rounded-xl min-h-[590px]" />
              <button
                onClick={handleWatchDemoClick}
                className="absolute lg:top-[120px] lg:left-[75px] xl:left-[90px] 2xl:top-[125px] 2xl:left-[108px] px-3 py-[10px] flex items-center gap-2 z-30 rounded-xl cursor-pointer border border-white"
              >
                <p className="text-sm font-semibold text-white">Watch Demo</p>
                <div className="py-[2px]">
                  <Image
                    className=""
                    src={Play}
                    width={16}
                    height={16}
                    alt="play"
                  />
                </div>
              </button>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen bg-[#111] bg-opacity-20 items-center justify-center ">
          <DialogPanel className="space-y-4">
            <div className="w-[925px] 2xl:w-[1200px] 2k:w-[1300px] max-w-[90vw] rounded-xl overflow-hidden">
              <DemoEmbed />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export const DemoVideoDialog = ({ isOpen, handleClose }) => {
  const dialogRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClose]);

  return (
    // isOpen && (
    <div
      open={isOpen}
      onClose={handleClose}
      on
      className="fixed inset-0 flex w-screen h-full backdrop-blur-lg bg-[#111] bg-opacity-60 items-center justify-center z-50"
    >
      <div ref={dialogRef} className="space-y-4 z-50">
        <div className="w-[925px] 2xl:w-[1200px] 2k:w-[1300px] max-w-[90vw] rounded-xl overflow-hidden">
          <DemoEmbed />
        </div>
      </div>
    </div>
    // </div>
    // <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
    //   <div className="fixed inset-0 flex w-screen bg-[#111] bg-opacity-80 items-center justify-center ">
    //     <DialogPanel className="space-y-4">
    //       <div className="w-[925px] 2xl:w-[1200px] 2k:w-[1300px] max-w-[90vw] rounded-xl overflow-hidden">
    //         <DemoEmbed />
    //       </div>
    //     </DialogPanel>
    //   </div>
    // </Dialog>
    // )
  );
};

export default Platform;
