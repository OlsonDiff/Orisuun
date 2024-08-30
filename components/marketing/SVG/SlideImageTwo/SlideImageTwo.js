import Image from "next/image";
import SlideTwo from "../../../../public/home/images/slide-image-2.svg";

export const SlideImageTwo = () => {
  return <Image src={SlideTwo} alt="slide-two" width={1280} height={580} />;
};
