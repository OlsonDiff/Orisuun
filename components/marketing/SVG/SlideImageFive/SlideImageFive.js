import Image from "next/image";
import SlideFive from "../../../../public/home/images/slide-image-1.svg";

export const SlideImageFive = () => {
  return <Image src={SlideFive} alt="slide-five" width={1280} height={580} />;
};
