'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import backgroundSrc from '@/public/images/Orisuun.webp';
import LogoFullBlack from '@/icons/logo-full-black';
import dynamic from 'next/dynamic';
import Loader from '@/components/loader';
import { useRouter } from 'next/navigation';

const Signin = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const SigninForm = dynamic(() => import('@/components/signin-form'), {
    ssr: false,
  });

  useEffect(() => {
    if (localStorage?.getItem("userData")) {
      router.push('/dashboard')
    }
  }, [])

  if (isLoading) return <Loader />;

  return (
    <div className="relative w-full h-screen">
      <Image
        src={backgroundSrc}
        alt="Background"
        quality={100}
        priority
        width={1000}
        height={600}
        className="object-cover w-full h-screen"
      />

      <div className="max-w-[30rem] 2xl:max-w-[45rem] w-full px-2 mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-10">
        <div className="p-10 bg-white rounded-lg shadow-xl">
          <div className="absolute transform -translate-x-1/2 -top-20 left-1/2">
            <LogoFullBlack className="h-10 w-32" />
          </div>

          <div className="">
            <div className="mb-10">
              <h5 className="font-semibold text-h5 2xl:text-scaled-h5">
                Sign in to your account
              </h5>
              <p className="text-h9 2xl:text-scaled-h9">
                Enter your email & password to log in
              </p>
            </div>

            <SigninForm setIsLoading={setIsLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
