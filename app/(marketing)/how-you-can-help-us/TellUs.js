import Image from 'next/image';

const TellUs = () => {
  // const socialMediaLinks = {
  //   facebook:
  //     'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Forisuun.com',
  //   twitter:
  //     'https://twitter.com/intent/tweet?url=https%3A%2F%2Forisuun.com&text=Check%20out%20Orisuun!',
  //   linkedin:
  //     'https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Forisuun.com',
  //   pinterest:
  //     'https://pinterest.com/pin/create/button/?url=https%3A%2F%2Forisuun.com&media=&description=',
  //   reddit:
  //     'https://reddit.com/submit?url=https%3A%2F%2Forisuun.com&title=Check%20out%20Orisuun!',
  //   tiktok: 'https://www.tiktok.com/realorisuun/',
  //   youtube: 'https://www.youtube.com/@orisuun',
  //   instagram: 'https://www.instagram.com/realorisuun/',
  // };

  // const handleSocialClick = (platform) => {
  //   window.open(socialMediaLinks[platform], '_blank', 'noopener,noreferrer');
  // };

  return (
    <section className="my-[120px] lg:mt-[150px] lg:px-[80px] px-4 mx-auto gap-2 pb-[200px] small-500:py-10">
      <div
        className="bg-[#F2F7FC]
 relative small-500:px-4 bg-cover bg-center md:min-h-[410px] md:max-h-[410px] rounded-[12px] md:rounded-[20px] sm:py-[80px] py-[72px] overflow-clip px-4 md:px-0"
      >
        <div>
          <Image
            src="/how-svgs/left-clip.svg"
            alt="bottom"
            width={300}
            height={300}
            className="absolute top-[-4px] left-[0px] md:left-[1px] md:top-[2px] max-w-[87px] md:max-w-[210px] "
          />
        </div>
        <div>
          <Image
            src="/how-svgs/right-clip.svg"
            alt="top"
            width={300}
            height={300}
            className="absolute right-[-1px] bottom-[0px] md:right-[1px] md:bottom-[2px] max-w-[65px] md:max-w-[210px] "
          />
        </div>

        <h2
          className="text-blue-strong sm:text-[40px] text-[24px] small-500:max-w-[256px] font-semibold md:leading-[110%] leading-[31.2px] text-center mx-auto mb-6  md:mt-0 "
          data-aos="fade-up"
        >
          Tell the world about Orisuun
        </h2>
        <p
          className="sm:text-xl text-[16px] font-medium leading-[150%] text-[#5B657B]  mx-auto  sm:mb-[90px] mb-8 max-w-[453px] text-center"
          data-aos="fade-up"
        >
          Word of mouth is the best promotion. Tell everyone you know about
          Orisuun and what we’re doing.
        </p>

        <MediaLinks />
        {/* <div
          className="flex mx-auto gap-5 flex-wrap md:gap-10 justify-center"
          data-aos="fade-up"
        >
          <button
            onClick={() => handleSocialClick('instagram')}
            aria-label="Share on Instagram"
          >
            <Image
              src="socials/instagram-social.svg"
              alt="instagram-social"
              width={32}
              height={32}
            />
          </button>
          <button
            onClick={() => handleSocialClick('facebook')}
            aria-label="Share on Facebook"
          >
            <Image
              src="socials/facebook-social.svg"
              alt="facebook-social"
              width={32}
              height={32}
            />
          </button>
          <button
            onClick={() => handleSocialClick('twitter')}
            aria-label="Share on Twitter"
          >
            <Image
              src="socials/twitter-social.svg"
              alt="twitter-social"
              width={32}
              height={32}
            />
          </button>
          <button
            onClick={() => handleSocialClick('linkedin')}
            aria-label="Share on LinkedIn"
          >
            <Image
              src="socials/linkedin-social.svg"
              alt="linkedin-social"
              width={32}
              height={32}
            />
          </button>
          <button
            onClick={() => handleSocialClick('pinterest')}
            aria-label="Share on Pinterest"
          >
            <Image
              src="socials/pinterest.svg"
              alt="pinterest"
              width={32}
              height={32}
            />
          </button>
          <button
            onClick={() => handleSocialClick('reddit')}
            aria-label="Share on Reddit"
          >
            <Image
              src="socials/reddit.svg"
              alt="reddit"
              width={32}
              height={32}
            />
          </button>
          <button
            onClick={() => handleSocialClick('tiktok')}
            aria-label="Share on TikTok"
          >
            <Image
              src="socials/tiktok-circle.svg"
              alt="tiktok-circle"
              width={32}
              height={32}
            />
          </button>
          <button
            onClick={() => handleSocialClick('youtube')}
            aria-label="Share on YouTube"
          >
            <Image
              src="socials/youtube-social.svg"
              alt="youtube-social"
              width={32}
              height={32}
            />
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default TellUs;

export const MediaLinks = () => {
  const socialMediaLinks = {
    facebook:
      'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Forisuun.com',
    twitter:
      'https://twitter.com/intent/tweet?url=https%3A%2F%2Forisuun.com&text=Check%20out%20Orisuun!',
    linkedin:
      'https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Forisuun.com',
    pinterest:
      'https://pinterest.com/pin/create/button/?url=https%3A%2F%2Forisuun.com&media=&description=',
    reddit:
      'https://reddit.com/submit?url=https%3A%2F%2Forisuun.com&title=Check%20out%20Orisuun!',
    tiktok: 'https://www.tiktok.com/realorisuun/',
    youtube: 'https://www.youtube.com/@orisuun',
    instagram: 'https://www.instagram.com/realorisuun/',
  };
  const handleSocialClick = (platform) => {
    window.open(socialMediaLinks[platform], '_blank', 'noopener,noreferrer');
  };
  return (
    <div
      className="flex mx-auto gap-5 flex-wrap md:gap-10 justify-center "
      data-aos="fade-up"
    >
      <button
        onClick={() => handleSocialClick('instagram')}
        aria-label="Share on Instagram"
      >
        <Image
          src="socials/instagram-social.svg"
          alt="instagram-social"
          width={32}
          height={32}
        />
      </button>
      <button
        onClick={() => handleSocialClick('facebook')}
        aria-label="Share on Facebook"
      >
        <Image
          src="socials/facebook-social.svg"
          alt="facebook-social"
          width={32}
          height={32}
        />
      </button>
      <button
        onClick={() => handleSocialClick('twitter')}
        aria-label="Share on Twitter"
      >
        <Image
          src="socials/twitter-social.svg"
          alt="twitter-social"
          width={32}
          height={32}
        />
      </button>
      <button
        onClick={() => handleSocialClick('linkedin')}
        aria-label="Share on LinkedIn"
      >
        <Image
          src="socials/linkedin-social.svg"
          alt="linkedin-social"
          width={32}
          height={32}
        />
      </button>
      <button
        onClick={() => handleSocialClick('pinterest')}
        aria-label="Share on Pinterest"
      >
        <Image
          src="socials/pinterest.svg"
          alt="pinterest"
          width={32}
          height={32}
        />
      </button>
      <button
        onClick={() => handleSocialClick('reddit')}
        aria-label="Share on Reddit"
      >
        <Image src="socials/reddit.svg" alt="reddit" width={32} height={32} />
      </button>
      <button
        onClick={() => handleSocialClick('tiktok')}
        aria-label="Share on TikTok"
      >
        <Image
          src="socials/tiktok-circle.svg"
          alt="tiktok-circle"
          width={32}
          height={32}
        />
      </button>
      <button
        onClick={() => handleSocialClick('youtube')}
        aria-label="Share on YouTube"
      >
        <Image
          src="socials/youtube-social.svg"
          alt="youtube-social"
          width={32}
          height={32}
        />
      </button>
    </div>
  );
};
