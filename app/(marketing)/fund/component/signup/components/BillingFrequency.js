import { Radio, RadioGroup } from '@headlessui/react';
import Image from 'next/image';

export const BillingFrequency = ({ billings, selected, setSelected }) => {
  return (
    <>
      <RadioGroup
        value={selected}
        onChange={setSelected}
        aria-label="Server size"
        className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-1"
      >
        {billings.map((billing, i) => (
          <Radio
            key={i}
            value={billing?.Name}
            className="group relative space-y-2 py-4 px-3 text-sm border border-[#B2B3B3] text-[#6E6E6E] rounded-[8px] data-[checked]:bg-[#F2F7FC] data-[checked]:border-nav-blue data-[checked]:text-nav-blue cursor-pointer"
          >
            <h6 className="font-semibold">{billing?.Name}</h6>
            <p className="font-medium">{billing?.Price}</p>
            {billing?.Free !== '' && (
              <div className="flex items-center gap-1">
                <Image
                  src="/icons/gift.svg"
                  alt="gift"
                  width={14}
                  height={14}
                />{' '}
                <p className="font-medium text-nav-blue">{billing?.Free}</p>
              </div>
            )}
          </Radio>
        ))}
      </RadioGroup>
    </>
  );
};
