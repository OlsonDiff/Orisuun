import Image from 'next/image';
import CEOLetter from '@/public/beta/images/letter_v2.png';
import CEOPhoto from '@/public/beta/images/bek_sunuu.png';
import CEOLetterMobile from '@/public/beta/images/letter-mobile.png';

export const Letter = () => {
  return (
    <section className="w-full my-[120px] lg:my-[200px] ">
      <div className="h-full hidden lg:block">
        <Image
          alt="You&apos;re in the right place! Regardless of what brought you here, to Orisuun, the most comprehensive and effective hub for promoting and growing Black-owned businesses, the fact that you are here shows that you have some connection to what we do. And that&apos;s all you need. There&apos;s a place for you here!

          We&apos;re giving everyone the opportunity to be a part of a real solution. Black ownership has been an effective, and in many cases, literal crime all around the world in just the last century. We all know it will take a massive and global effort to right the wrongs and begin to level the playing field. Orisuun is a piece of that puzzle. It can be, at least. A place where you can do your part and get paid too. Orisuun is a place to build something.

          We&apos;re just getting started, but already we see the budding of a vibrant ecosystem. Join us now but give us a little time and grace to get everyone on the site. Know that the site is getting better each day as new people join. We&apos;re excited about what we&apos;ve seen from our members so far, and downright giddy about what&apos;s to come. You should be too.

          Genuinely,

          Bek Sunuu
          CEO - Orisuu"
          src={CEOLetter}
          className="w-full h-full object-contain"
        />
      </div>
      <div className=" lg:hidden  ">
        <h2 className="text-blue-strong text-center md:hidden pt-[140px] font-semibold text-[24px] leading-[28.8px]">
          A letter from the CEO
        </h2>
        <Image
          alt="You&apos;re in the right place! Regardless of what brought you here, to Orisuun, the most comprehensive and effective hub for promoting and growing Black-owned businesses, the fact that you are here shows that you have some connection to what we do. And that&apos;s all you need. There&apos;s a place for you here!

          We&apos;re giving everyone the opportunity to be a part of a real solution. Black ownership has been an effective, and in many cases, literal crime all around the world in just the last century. We all know it will take a massive and global effort to right the wrongs and begin to level the playing field. Orisuun is a piece of that puzzle. It can be, at least. A place where you can do your part and get paid too. Orisuun is a place to build something.

          We&apos;re just getting started, but already we see the budding of a vibrant ecosystem. Join us now but give us a little time and grace to get everyone on the site. Know that the site is getting better each day as new people join. We&apos;re excited about what we&apos;ve seen from our members so far, and downright giddy about what&apos;s to come. You should be too.

          Genuinely,

          Bek Sunuu
          CEO - Orisuu"
          src={CEOPhoto}
          className="w-full h-full object-contain"
        />
        <Image
          alt="You&apos;re in the right place! Regardless of what brought you here, to Orisuun, the most comprehensive and effective hub for promoting and growing Black-owned businesses, the fact that you are here shows that you have some connection to what we do. And that&apos;s all you need. There&apos;s a place for you here!

          We&apos;re giving everyone the opportunity to be a part of a real solution. Black ownership has been an effective, and in many cases, literal crime all around the world in just the last century. We all know it will take a massive and global effort to right the wrongs and begin to level the playing field. Orisuun is a piece of that puzzle. It can be, at least. A place where you can do your part and get paid too. Orisuun is a place to build something.

          We&apos;re just getting started, but already we see the budding of a vibrant ecosystem. Join us now but give us a little time and grace to get everyone on the site. Know that the site is getting better each day as new people join. We&apos;re excited about what we&apos;ve seen from our members so far, and downright giddy about what&apos;s to come. You should be too.

          Genuinely,

          Bek Sunuu
          CEO - Orisuu"
          src={CEOLetterMobile}
          className="w-full h-full object-contain"
        />
        <h1 className="invisible"> You&apos;re in the right place! Regardless of what brought you here, to Orisuun, the most comprehensive and effective hub for promoting and growing Black-owned businesses, the fact that you are here shows that you have some connection to what we do. And that&apos;s all you need. There&apos;s a place for you here!

          We&apos;re giving everyone the opportunity to be a part of a real solution. Black ownership has been an effective, and in many cases, literal crime all around the world in just the last century. We all know it will take a massive and global effort to right the wrongs and begin to level the playing field. Orisuun is a piece of that puzzle. It can be, at least. A place where you can do your part and get paid too. Orisuun is a place to build something.

          We&apos;re just getting started, but already we see the budding of a vibrant ecosystem. Join us now but give us a little time and grace to get everyone on the site. Know that the site is getting better each day as new people join. We&apos;re excited about what we&apos;ve seen from our members so far, and downright giddy about what&apos;s to come. You should be too.

          Genuinely,

          Bek Sunuu

          CEO - Orisuu</h1>
      </div>
    </section>
  );
};
