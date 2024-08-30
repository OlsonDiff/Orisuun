'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Close from '@/icons/close';
import NewProfileSteps from './_sections/new-profile-steps';
import { useSelector } from 'react-redux';
import { RootState } from '@/data/store';

const businessFormFlowSteps = [
  {
    name: 'Basic Information',
    componentName: 'BasicInformation',
    id: 0,
  },
  {
    name: 'Business Information',
    componentName: 'BusinessInformation',
    id: 1,
  },
  {
    name: 'Qualifications',
    componentName: 'Qualifications',
    id: 2,
  },
  {
    name: 'Charts',
    componentName: 'Charts',
    id: 3,
  },
  {
    name: 'Industry',
    componentName: 'IndustrySelection',
    id: 4,
  },
];

const individualFormFlowSteps = [
  {
    name: 'Basic Information',
    componentName: 'UserDetailsExperts',
    id: 0,
  },
  {
    name: 'Skills & Experience',
    componentName: 'SkillsAndExperiences',
    id: 1,
  },
  {
    name: 'Qualifications',
    componentName: 'Qualifications',
    id: 2,
  },
  {
    name: 'Charts',
    componentName: 'Charts',
    id: 3,
  },
  {
    name: 'Industry',
    componentName: 'IndustrySelection',
    id: 4,
  },
];

const advocateFormFlowsteps = [
  {
    name: 'Basic Information',
    componentName: 'UserDetailsExperts',
    id: 0,
  },
  {
    name: 'Photos',
    componentName: 'AdvocatePhotos',
    id: 1,
  },
];

const NewProfile = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [step, setStep] = useState(0);
  const [width, setWidth] = useState(0);
  const [steps, setSteps] = useState<any>([]);

  const businessFormFlowProfileTypes = useMemo(
    () => ['Black-owned Businesses', 'Partners', 'Investors'],
    []
  );
  const individualFormFlowProfileTypes = useMemo(
    () => ['Experts', 'Professionals', 'Management Consultants', 'Mentors'],
    []
  );

  useEffect(() => {
    setWidth(Math.round(((step / steps.length) * 100 * 100) / 100));
  }, [step, steps.length]);

  useEffect(() => {
    if (currentUser) {
      // Logic to setSteps based on CurrentUSer.UserProfileType
      // Set steps based on UserProfileType
      if (businessFormFlowProfileTypes.includes(currentUser.UserProfileType)) {
        setSteps(businessFormFlowSteps);
      } else if (
        individualFormFlowProfileTypes.includes(currentUser.UserProfileType)
      ) {
        setSteps(individualFormFlowSteps);
      } else if (currentUser.UserProfileType === 'Advocates') {
        setSteps(advocateFormFlowsteps);
      } else {
        setSteps([]);
      }
      setStep(currentUser.FilledStep);
    }
  }, [
    businessFormFlowProfileTypes,
    currentUser,
    individualFormFlowProfileTypes,
  ]);

  return (
    <>
      <div className="w-full md:hidden">
        <div className="relative flex items-center justify-between px-4 py-6 w-100 md:hidden">
          <p className="mx-auto font-semibold text-blue-600 text-h7 2xl:text-scaled-h7">
            {steps[step]?.name}
          </p>
          <Close className="absolute -translate-y-1/2 right-2 top-1/2" />
        </div>
        <div
          className={`relative z-10 h-1 overflow-hidden rounded-md bg-omblue-100 w-full`}
        >
          <div
            className={`absolute inset-0 z-10 h-1 bg-omblue-600 transition-all duration-300 ease-in-out`}
            style={{ width: `${width}%` }}
          ></div>
        </div>
      </div>

      <NewProfileSteps steps={steps} step={step} setStep={setStep} />
    </>
  );
};

export default NewProfile;
