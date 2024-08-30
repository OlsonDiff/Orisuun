import Image from "next/image";

export const SearchList = ({ name, address, icon }) => {
  return (
    <div className=" text-[#4A4A4A] flex items-center justify-between ">
      <p className="w-[50px] h-[15px] whitespace-nowrap text-[11px] font-medium leading-150 ">
        {name}
      </p>
      <div className="flex items-center gap-[6.11px] ml-[10px] ">
        <p className="w-[58px] h-[15px] text-[11px] font-medium leading-150">
          {address}
        </p>
        {/* <div>
          <Image
            alt="icon"
            src={icon}
            className="rounded-full w-[12.2px] h-[12.2px]"
          />
        </div> */}
      </div>
    </div>
  );
};
