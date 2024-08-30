'use client';

import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { FeedbackAccord } from '../../../components/marketing/Accordion';
import { feedbackInput } from '../../../data/marketing';

const FeedbackInput = () => {
  const [responses, setResponses] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const handleAnswerSubmit = (question, answer) => {
    setResponses((prevResponses) => {
      const updatedResponses = {
        ...prevResponses,
        [question]: answer,
      };
      console.log(updatedResponses);
      setIsOpen(true);
      return updatedResponses;
    });
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <>
      <div
        className="w-[90%] small-500:w-full md:w-[70%] mx-auto mt-12"
        data-aos="fade-up"
      >
        {feedbackInput.map((item, i) => (
          <FeedbackAccord
            key={i}
            question={item?.question}
            onSubmit={(answer) => handleAnswerSubmit(item.question, answer)}
          />
        ))}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed top-5 right-5 z-[500]"
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

          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Response Submitted
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your response has been recorded!
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default FeedbackInput;
