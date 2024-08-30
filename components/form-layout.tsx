import React from 'react';
import Button from './ui/button';
import { cn } from '@/utils/utils';

interface IProps {
  title?: string;
  subTitle?: string;
  description?: string;
  descriptionAlt?: React.ReactNode;
  handleNext?: () => void;
  handleBack?: () => void;
  children: React.ReactNode;
  position?: 'start' | 'center' | 'end';
  nextButtonType?: 'button' | 'submit';
  showBack?: boolean;
  variant?: 'normal' | 'equal' | 'larger-child';
  disableNext?: boolean;
  isSubmit?: boolean;
}

const FormLayout: React.FC<IProps> = ({
  handleBack,
  handleNext,
  children,
  title,
  subTitle,
  description,
  descriptionAlt,
  position = 'center',
  nextButtonType = 'button',
  showBack = true,
  variant = 'normal',
  disableNext = false,
  isSubmit
}) => {
  return (
    <div className="flex flex-col min-h-screen p-6">
      <div
        className={cn('grid grid-cols-12 gap-4 flex-grow', `items-${position}`)}
      >
        <div className={'space-y-6 col-span-12 md:col-span-4 md:col-start-2'}>
          {false ? (
            <h5 className="font-medium text-h5 2xl:font-scaled-h5 text-omblue-800">
              {subTitle}
            </h5>
          ) : (
            <></>
          )}
          <div className="font-medium text-blue-500 text-h1 2xl:text-scaled-h11">
            {title}
          </div>
          {!descriptionAlt ? (
            <p className="text-[#58595A] xl:text-scaled-h7 text-h7 2xlnt-medium">
              {description}
            </p>
          ) : (
            descriptionAlt
          )}
        </div>
        <div
          className={
            variant === 'normal'
              ? 'space-y-4 col-span-12 md:col-span-4 md:col-start-8'
              : variant === 'equal'
                ? 'space-y-4 col-span-12 md:col-span-5 md:col-start-7'
                : 'space-y-4 col-span-12 md:col-span-6'
          }
        >
          {children}
        </div>
      </div>

      <div className="flex flex-col items-center justify-end w-full gap-4 py-4 mt-40 md:mt-auto md:flex-row md:pe-10">
        {showBack && (
          <Button
            className="px-4 py-3 text-omblue-500 border border-omblue-100 bg-white md:w-[170px] rounded-md"
            onClick={handleBack}
            title="Back"
          >
            Back
          </Button>
        )}
        {isSubmit ? (
          <Button
            className="px-4 py-3 text-white md:w-[170px] rounded-md"
            onClick={handleNext}
            title="Submit"
            type="submit"
          >
            Submit
          </Button>
        ) : <Button
          className="px-4 py-3 bg-omblue-500 text-white md:w-[170px] rounded-md"
          onClick={handleNext}
          title="Next"
          type={nextButtonType}
          disabled={disableNext}
        >
          Next
        </Button>}

      </div>
    </div>
  );
};

export default FormLayout;
