import { cn } from '@/utils/utils';
import React, { forwardRef, useId } from 'react';
import ReactSelect, {
  components,
  MultiValueGenericProps,
  Props,
} from 'react-select';

interface CustomSelectProps extends Props {
  options: { value: string; label: string; icon?: any }[];
  onChange: (selectedOption: any) => void;
  error: any;
  value: any;
  placeholder?: string;
  isMulti?: boolean;
  controlClasses?: string;
}

const MultiValueContainer = (props: MultiValueGenericProps) => {
  return (
    <components.MultiValueContainer {...props}>
      <span className="flex items-center gap-1 p-2 m-1 text-xs font-medium rounded bg-olblue-50 text-omblue-500">
        {props.children}
      </span>
    </components.MultiValueContainer>
  );
};
const { Option } = components;
const IconOption = (props) => {
  const Icon = props.data.icon;

  return (
    <Option {...props} className="custom-select-box items-center gap-2 px-0">
      {Icon && <Icon />}
      {props.data.label}
    </Option>
  );
};
const customSingleValue = ({ data }) => {
  const Icon = data.icon;
  return (
    <div className="input-select absolute">
      <div className={cn("flex items-center gap-2", Icon ? "text-[#204FB4]" : "text-inherit")}>
        {Icon && <Icon className="input-select__icon" />}
        <span>{data.label}</span>
      </div>
    </div>
  );
};

const CustomSelect = forwardRef<any, CustomSelectProps>(
  (
    {
      options,
      onChange,
      error,
      value,
      placeholder,
      isMulti = false,
      controlClasses,
      className,
      ...rest
    },
    ref
  ) => {

    const id = useId();
    return (
      <div className={className}>
        <ReactSelect
          inputId={id}
          instanceId={id}
          ref={ref}
          value={value}
          options={options}
          isSearchable={false}
          // menuIsOpen
          unstyled
          classNames={{
            placeholder: () =>
              'overflow-hidden line-clamp-1 text-blue-200 text-ellipsis',
            option: () => 'bg-white p-2 cursor-pointer hover:bg-blue-50',
            menu: () =>
              'bg-white mt-1 px-3 py-3 border border-opacity-20 rounded-[10px] shadow-lg',
            control: (state) =>
              `border bg-white text-h9 2xl:text-scaled-h9 font-medium py-3 px-3 rounded-md w-full focus:outline-none focus:border-omblue-500 focus:bg-[#f3f7f9] transition-colors duration-200 ${controlClasses} ${error ? 'border-red-500' : 'border-black-200'
              }`,
            multiValue: () => 'bg-transparent',
            multiValueLabel: () =>
              'text-omblue-500 font-semibold text-h8 2xl:text-scaled-h8',
            multiValueRemove: () =>
              'text-omblue-600 hover:text-omblue-400 hover:bg-omblue-200 w-5 h-5 2xl:w-scaled-5 2xl:w-scaled-5 flex items-center justify-center rounded-full clear-indo-class',
            valueContainer: () => 'flex text-ellipsis',
            clearIndicator: () =>
              'w-6 h-6 clearIndicator flex items-center justify-center',
            dropdownIndicator: () =>
              'w-6 h-6 clearIndicator flex items-center justify-center',
          }}
          placeholder={placeholder}
          onChange={onChange}
          isMulti={isMulti}
          components={{
            MultiValueContainer,
            Option: IconOption,
            SingleValue: customSingleValue,
          }}
          {...rest}
        />
        {error && (
          <span className="m-1 mt-2 text-xs text-red-400 ">{error}</span>
        )}
      </div>
    );
  }
);

CustomSelect.displayName = 'CustomSelect';

export default CustomSelect;

