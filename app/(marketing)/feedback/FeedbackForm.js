'use client';

import {
  Field,
  Label,
  Radio,
  RadioGroup,
  Dialog,
  Transition,
} from '@headlessui/react';
import { useState, Fragment, useEffect } from 'react';

import { Button } from '../../../components/marketing';

import {
  interestingFeatures,
  joinReason,
  notJoinedReasons,
  mightJoinReasons,
  statementApply,
  upcomingFeatures,
} from '../../../data/marketing';

const Radios = ({ name, value, onChange }) => {
  const labels = ['-3', '-2', '-1', '0', '1', '2', '3'];
  return (
    <>
      {labels.map((label, i) => (
        <div key={i} className="grid place-items-center">
          <input
            type="radio"
            name={name}
            id={name + label}
            value={label}
            checked={value === label}
            onChange={onChange}
            className="md:size-7 size-6"
          />
          <label
            className="text-[#808181] md:text-sm text-[12px] font-medium"
            htmlFor={name + label}
          >
            {label}
          </label>
        </div>
      ))}
    </>
  );
};
const CustomCheckbox = ({ label, checked, order, onChange }) => {
  return (
    <div className="flex items-start gap-[10px] ">
      <div className="size-[24px] border rounded">
        <div
          className={`relative size-[24px]  ${
            checked ? 'bg-[#2357C6] text-white  ' : 'border-gray-400'
          }`}
          onClick={onChange}
        >
          {checked && (
            <span className="absolute inset-0 flex items-center justify-center font-bold  p-1 text-[14px]">
              {order}
            </span>
          )}
        </div>
      </div>

      <label className="text-[#6E6E6E] font-medium text-[16px] md:text-xl">
        {label}
      </label>
    </div>
  );
};

const MightJoinCheckbox = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-start gap-[10px] cursor-pointer">
      <div className="relative w-[24px] h-[24px] border rounded">
        <input
          type="checkbox"
          className="appearance-none w-full h-full checked:bg-[#2357C6] checked:border-transparent focus:outline-none"
          checked={checked}
          onChange={onChange}
        />
        {checked && (
          <svg
            className="absolute inset-0 w-full h-full flex items-center justify-center text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        )}
      </div>
      <span className="text-[#6E6E6E] font-medium text-[16px] md:text-xl">
        {label}
      </span>
    </label>
  );
};

const FeedbackForm = () => {
  const joinedOptions = ['Yes', 'No'];
  const [selected, setSelected] = useState('');
  const [formData, setFormData] = useState({
    joinReason: [],
    notJoinedReasons: [],
    mightJoinReasons: [],
    interestingFeatures: [],
    upcomingFeatures: [],
    statementApply: {},
  });
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    joinReason: '',
    notJoinedReasons: '',
    interestingFeatures: '',
    upcomingFeatures: '',
    statementApply: '',
  });
  const handleCheckboxChange = (name, value) => {
    setFormData((prevState) => {
      const currentValues = prevState[name];
      const isChecked = currentValues.includes(value);
      if (!isChecked && currentValues.length >= 3) {
        return prevState; // Prevent more than 3 selections
      }
      const updatedArray = isChecked
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
      return { ...prevState, [name]: updatedArray };
    });
  };
  const getSelectionOrder = (name, value) => {
    const index = formData[name].indexOf(value);
    return index !== -1 ? index + 1 : null;
  };
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      statementApply: { ...prevState.statementApply, [name]: value },
    }));
  };

  const validateRequiredCheckboxes = () => {
    const newErrorMessages = {
      joinReason: '',
      notJoinedReasons: '',
      interestingFeatures: '',
      upcomingFeatures: '',
      statementApply: '',
    };
    if (selected === 'Yes' && formData.joinReason.length === 0) {
      newErrorMessages.joinReason =
        'Please select at least one reason for joining.';
    }

    if (selected === 'No' && formData.notJoinedReasons.length === 0) {
      newErrorMessages.notJoinedReasons =
        'Please select at least one reason for not joining.';
    }

    if (formData.interestingFeatures.length === 0) {
      newErrorMessages.interestingFeatures =
        'Please select at least one feature that is interesting to you.';
    }

    if (formData.upcomingFeatures.length === 0) {
      newErrorMessages.upcomingFeatures =
        'Please select at least one upcoming feature that is interesting to you.';
    }

    const allStatementsAnswered = statementApply.every(
      (statement) => formData.statementApply[statement.label]
    );

    if (!allStatementsAnswered) {
      newErrorMessages.statementApply =
        'Please select an answer for all statements.';
    }

    setErrorMessages(newErrorMessages);

    return !Object.values(newErrorMessages).some((message) => message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateRequiredCheckboxes()) {
      return;
    }
    // Here you can send formData to your backend or save it locally
    console.log(formData);
    // Example: send data to backend
    // fetch('/api/feedback', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // })
    // .then(response => response.json())
    // .then(data => console.log('Success:', data))
    // .catch(error => console.error('Error:', error));

    // Show notification dialog
    setIsOpen(true);

    // Reset form data
    setSelected('');
    setFormData({
      joinReason: [],
      notJoinedReasons: [],
      mightJoinReasons: [],
      interestingFeatures: [],
      upcomingFeatures: [],
      statementApply: {},
    });
    e.target.reset();
  };
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsOpen(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <>
      <form
        className="md:border border-[#F1F2F2]  md:shadow-md small-500:shadow-none w-[90%] small-500:w-full md:w-[70%] mx-auto md:mt-12 mt-20 md:p-10  md:mb-[100px] mb-[120px] space-y-8"
        data-aos="fade-up"
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <h5 className="text-blue-strong text-3xl font-semibold w-full">
            Have you joined Orisuun?
          </h5>
          <RadioGroup
            value={selected}
            onChange={setSelected}
            aria-label="Server size"
            className="flex gap-2 !mt-5"
          >
            {joinedOptions.map((join, i) => (
              <Field key={i}>
                <Radio
                  value={join}
                  className="group font-medium py-1.5 px-5 border border-[#B2B3B3] text-[#6E6E6E] rounded-[54px] data-[checked]:bg-[#F2F7FC] data-[checked]:border-nav-blue data-[checked]:text-nav-blue data-[checked]:font-semibold cursor-pointer"
                >
                  <Label>{join}</Label>
                </Radio>
              </Field>
            ))}
          </RadioGroup>
        </div>

        {selected === 'Yes' && (
          <div className="space-y-2">
            <h5 className="text-blue-strong text-xl font-semibold  w-full">
              Why did you join?
            </h5>
            <p className="text-[#6E6E6E] font-medium text-[16px] md:text-xl">
              Select three options in order of importance
            </p>
            {joinReason.map((data, i) => (
              <CustomCheckbox
                key={i}
                label={data?.label}
                checked={formData.joinReason.includes(data?.label)}
                order={getSelectionOrder('joinReason', data?.label)}
                onChange={() => handleCheckboxChange('joinReason', data?.label)}
              />
            ))}
            {errorMessages.joinReason && (
              <div className="text-red-500 font-medium text-[18px]">
                {errorMessages.joinReason}
              </div>
            )}
          </div>
        )}

        {selected === 'No' && (
          <>
            <div className="space-y-2">
              <h5 className="text-blue-strong text-xl font-semibold  w-full">
                Why didn&apos;t you join?
              </h5>
              <p className="text-[#6E6E6E] font-medium text-[16px] md:text-xl">
                Select three options in order of importance
              </p>
              {notJoinedReasons.map((data, i) => (
                <CustomCheckbox
                  key={i}
                  label={data?.label}
                  checked={formData.notJoinedReasons.includes(data?.label)}
                  order={getSelectionOrder('notJoinedReasons', data?.label)}
                  onChange={() =>
                    handleCheckboxChange('notJoinedReasons', data?.label)
                  }
                />
              ))}
              {errorMessages.notJoinedReasons && (
                <div className="text-red-500 font-medium text-[18px]">
                  {errorMessages.notJoinedReasons}
                </div>
              )}
            </div>

            <div className="space-y-2 mt-4">
              <h5 className="text-blue-strong text-xl font-semibold  w-full">
                Do you think you might join later?
              </h5>
              {mightJoinReasons.map((data, i) => (
                <MightJoinCheckbox
                  key={i}
                  label={data?.label}
                  checked={formData.mightJoinReasons.includes(data?.label)}
                  onChange={() =>
                    handleCheckboxChange('mightJoinReasons', data?.label)
                  }
                />
              ))}
              {errorMessages.mightJoinReasons && (
                <div className="text-red-500 font-medium text-[18px]">
                  {errorMessages.mightJoinReasons}
                </div>
              )}
            </div>
          </>
        )}

        <div className="space-y-2">
          <h5 className="text-blue-strong text-xl md:mt-0 mt-10 font-semibold  w-full">
            Which of our features are most interesting to you?
          </h5>
          <p className="text-[#6E6E6E] font-medium text-[16px] md:text-xl">
            Select three options in order of importance
          </p>
          <div className="flex flex-col gap-4">
            {interestingFeatures.map((data, i) => (
              <CustomCheckbox
                key={i}
                label={data?.label}
                checked={formData.interestingFeatures.includes(data?.label)}
                order={getSelectionOrder('interestingFeatures', data?.label)}
                onChange={() =>
                  handleCheckboxChange('interestingFeatures', data?.label)
                }
              />
            ))}
          </div>

          {errorMessages.interestingFeatures && (
            <div className="text-red-500 font-medium text-[18px]">
              {errorMessages.interestingFeatures}
            </div>
          )}
        </div>
        <div className="space-y-2">
          <h5 className="text-blue-strong text-xl font-semibold  w-full">
            Which of our announced upcoming features is most interesting to you?
          </h5>
          <p className="text-[#6E6E6E] font-medium text-[16px] md:text-xl">
            Select three options in order of importance
          </p>
          {upcomingFeatures.map((data, i) => (
            <CustomCheckbox
              key={i}
              label={data?.label}
              checked={formData.upcomingFeatures.includes(data?.label)}
              order={getSelectionOrder('upcomingFeatures', data?.label)}
              onChange={() =>
                handleCheckboxChange('upcomingFeatures', data?.label)
              }
            />
          ))}
          {errorMessages.upcomingFeatures && (
            <div className="text-red-500 font-medium text-[18px]">
              {errorMessages.upcomingFeatures}
            </div>
          )}
        </div>
        <div className="space-y-4 flex flex-col gap-[12px] md:gap-[24px]">
          <h5 className="text-blue-strong text-xl text-[20px]  w-full font-semibold">
            Please tell us how these statements apply to you
          </h5>
          <div className="md:grid md:grid-cols-10 hidden md:place-items-center ">
            <div className="col-span-1 md:col-span-3 md:block hidden" />
            <p className="text-[#6E6E6E] font-medium text-[18px] text-left">
              Strongly <br /> disagree
            </p>
            <div className="col-span-3 md:col-span-2 md:block hidden " />
            <p className="text-[#6E6E6E] font-medium text-[18px] md:block hidden text-center">
              Neutral
            </p>
            <div className="col-span-3 md:col-span-2 md:block hidden" />
            <p className="text-[#6E6E6E] font-medium text-[18px] md:text-left text-right">
              Strongly <br /> agree
            </p>
          </div>
          <div className="flex flex-col gap-[32px] md:gap-[20px]">
            {statementApply.map((data, i) => (
              <div key={i}>
                <div className="grid grid-cols-10 md:gap-y-2 gap-4 mb-4 items-center">
                  <p className="col-span-10 md:col-span-3 text-[#6E6E6E] font-medium text-[16px] md:text-xl">
                    {data?.label}
                  </p>
                  <div className="col-span-10 md:col-span-7 md:grid grid-cols-7 flex justify-between items-center">
                    <Radios
                      name={data?.label}
                      value={formData.statementApply[data?.label]}
                      onChange={handleRadioChange}
                    />
                  </div>
                </div>
                <div className="md:hidden flex justify-between items-center  ">
                  <div className="col-span-1 md:col-span-3 md:block hidden" />
                  <p className="text-[#6E6E6E] font-medium text-[12px] text-left">
                    Strongly <br /> disagree
                  </p>
                  <div className="col-span-3 md:col-span-2 md:block hidden " />
                  <p className="text-[#6E6E6E] font-medium text-[18px] md:block hidden text-center">
                    Neutral
                  </p>
                  <div className="col-span-3 md:col-span-2 md:block hidden" />
                  <p className="text-[#6E6E6E] font-medium text-[12px] md:text-left text-right">
                    Strongly <br /> agree
                  </p>
                </div>
              </div>
            ))}
          </div>

          {errorMessages.statementApply && (
            <div className="text-red-500 font-medium text-[18px]">
              {errorMessages.statementApply}
            </div>
          )}
        </div>
        <div className="grid justify-end">
          <Button type="submit">Submit feedback</Button>
        </div>
      </form>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[500]"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-start justify-end p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all mt-4 mr-4">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Feedback Submitted
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Thank you for your feedback! Your responses have been
                      recorded.
                    </p>
                  </div>

                  <div className="mt-4">
                    <Button type="button" onClick={() => setIsOpen(false)}>
                      Close
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default FeedbackForm;
