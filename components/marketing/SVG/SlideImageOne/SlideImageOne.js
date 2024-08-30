import Image from "next/image";
import SlideOne from "../../../../public/home/images/slide-image-1.svg";

export const SlideImageOne = () => {
  return <Image src={SlideOne} alt="slide-one" width={1280} height={580} />;
};
