'use client';
import '@/styles/global.css';
import { Footer, Navbar } from '../../components/marketing';
import AOSWrapper from '../../components/marketing/AOS Wrapper/Aos';
import 'react-toastify/dist/ReactToastify.css';
import { usePathname } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import Image from 'next/image';
import { GoogleTagManager } from '@next/third-parties/google';

const isDynamicUserPage = (pathname) => {
  const dynamicUserPages = [
    '/professional',
    '/partners',
    '/investors',
    '/black-owned-businesses',
    '/experts',
    '/mentors',
    '/management-consultants',
    '/advocates',
  ];

  return dynamicUserPages.some((page) => pathname.startsWith(page));
};

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isSignUpPage = pathname === '/signup';
  const dynamicUserPage = isDynamicUserPage(pathname);

  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-5NDJVLPQ" />
      <body className="flex flex-col min-h-screen bg-white">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5NDJVLPQ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <AOSWrapper>
          <main
            className={`${dynamicUserPage
              ? ''
              : 'max-w-[1440px] 3xl:max-w-[1600px] 2k:max-w-[1800px]'
              } w-full mx-auto`}
          >
            <div className="bg-white">
              {!isSignUpPage && <Navbar />}
              <ToastContainer containerId="containerA" />
              <div className="">{children}</div>
            </div>
            {!isSignUpPage && (
              <>
                <div className="sticky bottom-0 flex items-center justify-center mx-auto -z-10">
                  <div className="w-full lg:max-w-[95%] xl:max-w-[1200px] h-[300px] md:h-[372px] 3xl:h-[410px] 2k:h-[496px] 3xl:max-w-[1400px] 2k:max-w-[1700px] sm:max-w-[739px] sm:h-[370px] md:max-w-[95%] small-500:h-[250px]  relative small-500:w-[95%]">
                    <Image
                      className=""
                      src="/images/orisuunFooter.svg"
                      priority
                      fill
                      alt="Orisuun official black logo"
                    />
                  </div>
                </div>
                <Footer />
              </>
            )}
          </main>
        </AOSWrapper>
      </body>
    </html>
  );
}
