import React from 'react';
import {
  useController,
  Control,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import { format, parse } from 'date-fns';
import Input from './input';

interface CustomTimePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  control: Control<TFieldValues>;
  label: string;
}

const CustomTimePicker = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  label,
}: CustomTimePickerProps<TFieldValues, TName>) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: 'Time is required' },
    defaultValue: '' as any,
  });

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputTime = e.target.value;
    if (inputTime) {
      try {
        const parsedDate = parse(inputTime, 'HH:mm', new Date());
        onChange(format(parsedDate, 'HH:mm'));
      } catch (error) {
        console.error('Invalid time format');
      }
    } else {
      onChange('');
    }
  };

  return (
    <div className="mb-4">
      <Input
        type="time"
        name={name}
        ref={ref}
        value={value as string}
        onChange={handleTimeChange}
        onBlur={onBlur}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-omblue-600 focus:ring-0"
      />
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default CustomTimePicker;
