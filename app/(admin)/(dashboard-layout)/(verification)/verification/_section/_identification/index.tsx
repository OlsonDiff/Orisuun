import React, { Dispatch, SetStateAction, useState } from 'react';
import Personal from './personal';
import Resume from './resume';
import PersonalURLs from './personal-urls';

interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const Identification: React.FC<IProps> = ({ step, setStep }) => {
  const [identificationStep, setIdentificationStep] = useState(0);

  return (
    <>
      {identificationStep === 0 ? (
        <Personal
          identificationStep={identificationStep}
          setIdentificationStep={setIdentificationStep}
          step={step}
          setStep={setStep}
        />
      ) : null}
      {identificationStep === 1 ? (
        <Resume
          identificationStep={identificationStep}
          setIdentificationStep={setIdentificationStep}
        />
      ) : null}
      {identificationStep === 2 ? (
        <PersonalURLs
          identificationStep={identificationStep}
          setIdentificationStep={setIdentificationStep}
          step={step}
          setStep={setStep}
        />
      ) : null}
    </>
  );
};

export default Identification;
