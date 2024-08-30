import Image from "next/image";
import SlideThree from "../../../../public/home/images/slide-image-3.svg";

export const SlideImageThree = () => {
  return <Image src={SlideThree} alt="slide-three" width={1280} height={580} />;
};
