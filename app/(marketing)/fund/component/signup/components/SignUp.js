'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useState } from 'react';

import { Profile } from './Profile';
import { PaymentMethod } from './PaymentMethod';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

export default function SignUp() {
  const [page, setPage] = useState(0);
  const stripePromise = loadStripe(
    (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) ||
    'pk_test_51OssK1BOyWHELjbjy7d77ajLCS43yxCfnvkVOzl62EZ36HiaBWBf1ljqTgfSzTtJlFOwrAY9JqpKo02omvRWpQ5z00kfqqqo1K'
  );
  // xl:pl-32 xl:bg-sign-up xl:bg-auto bg-no-repeat bg-right-top bg-white
  return (
    <Suspense>
      <main className="w-screen relative max-w-[1512px] mx-auto">
        <div className="w-full py-8 h-full overflow-y-scroll hide-scrollbar">
          <div className="w-full lg:w-[60%]">
            <header className="pb-16 w-[85%] md:min-w-[490px] md:max-w-[60%] mx-auto">
              <Link href="/">
                <Image
                  src="/logo.svg"
                  className=""
                  width={150}
                  height={55}
                  alt="logo"
                />
              </Link>
            </header>
            <section className="w-[85%] md:min-w-[490px] md:max-w-[60%] mx-auto ">
              {page === 0 && <Profile setPage={setPage} />}
              {page === 1 && <Elements stripe={stripePromise}> <PaymentMethod /></Elements>}
            </section>
          </div>
        </div>
        <div className="absolute hidden lg:block bg-sign-up bg-no-repeat bg-cover bg-center h-full z-[10] w-[40%] top-0 right-0 bg-transparent " />
      </main>
    </Suspense>
  );
}
