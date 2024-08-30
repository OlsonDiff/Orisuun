import { Radio, RadioGroup } from '@headlessui/react';

export const PlanType = ({ planType, selected, setSelected, profileType }) => {
  const plansToDisplay = profileType === 'Advocates' ? [planType[0]] : planType;

  return (
    <>
      <RadioGroup
        value={selected}
        onChange={setSelected}
        aria-label="Server size"
        className={`grid grid-cols-1 ${
          profileType !== 'Advocates' ? 'md:grid-cols-2' : ''
        } gap-2 md:gap-1`}
        // className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-1"
      >
        {plansToDisplay.map((plan, i) => (
          <Radio
            key={i}
            value={plan}
            className="group relative text-center md:text-start p-3 text-[14px] font-semibold border border-[#B2B3B3] text-[#6E6E6E] rounded-[8px] data-[checked]:bg-[#F2F7FC] data-[checked]:border-nav-blue data-[checked]:text-nav-blue cursor-pointer"
          >
            {plan}
          </Radio>
        ))}
      </RadioGroup>
    </>
  );
};
