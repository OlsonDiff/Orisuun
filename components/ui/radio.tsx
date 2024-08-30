import React, { forwardRef } from 'react';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  value?: string;
}

const Radio: React.ForwardRefRenderFunction<HTMLInputElement, IProps> = (
  { id, label, value, ...rest },
  ref
) => {
  return (
    <div className="flex items-center">
      <input
        ref={ref}
        type="radio"
        id={id}
        className="hidden"
        value={value}
        {...rest}
      />
      <label htmlFor={id} className="flex items-center cursor-pointer">
        <div className="relative flex-shrink-0 w-6 h-6 mr-2 border border-gray-300 rounded-full">
          {rest.checked && (
            <div className="absolute inset-0 w-6 h-6 m-auto rounded-full bg-omblue-500">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-white"></div>
            </div>
          )}
        </div>
        <span className="text-gray-700 text-h8 2xl:text-scaled-h8">
          {label}
        </span>
      </label>
    </div>
  );
};

export default forwardRef(Radio);
