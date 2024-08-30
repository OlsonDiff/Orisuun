import React, { Dispatch, SetStateAction } from 'react';
import { cn } from '@/utils/utils';
import BasicInformation from './basic-info';
import BusinessInformation from './business-info';
import Qualifications from './qualifications';
import Charts from './charts';
import IndustrySelection from './industry-selection';
import SkillsAndExperiences from './skills-and-experience';
import Tick from '@/icons/tick';
import AdvocatePhotos from './advocate-photos';
import UserDetailsExperts from './basic-info/experts';

type optionTypes = {
  name: string;
  componentName: string;
  id: number;
};
interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  steps: Array<optionTypes>;
}

const NewProfileSteps: React.FC<IProps> = ({ steps, step, setStep }) => {
  const componentMap: { [key: string]: React.ComponentType<any> } = {
    BasicInformation,
    UserDetailsExperts,
    BusinessInformation,
    SkillsAndExperiences,
    Qualifications,
    Charts,
    IndustrySelection,
    AdvocatePhotos,
  };

  const renderComponent = (componentName: string) => {
    const Component = componentMap[componentName];
    return Component ? <Component step={step} setStep={setStep} /> : null;
  };

  return (
    <div>
      <ul className={`hidden p-6 grid-cols-${steps.length} md:grid`}>
        {steps.slice(0, 5).map((item: any, index: any) => (
          <li
            className={cn(
              'flex items-center gap-2 border-b-2 py-2',
              item.id === step ? 'border-b-omblue-700' : 'border-b-omblue-100'
            )}
            key={index}
          >
            {step < index + 1 ? (
              <p
                className={cn(
                  'w-6 h-6 p-2 rounded-full text-xs border font-medium flex items-center justify-center',
                  item.id === step
                    ? 'border-omblue-500 bg-olblue-50 text-omblue-500'
                    : 'border-omblue-100 bg-transparent text-omblue-300'
                )}
              >
                {++index}
              </p>
            ) : (
              <button className="w-6 h-6 p-1.5 rounded-full bg-omblue-400 flex items-center justify-center">
                <Tick className="text-white" />
              </button>
            )}
            <p
              className={cn(
                'font-semibold text-h7',
                item.id === step ? 'text-omblue-700' : 'text-omblue-300'
              )}
            >
              {item.name}
            </p>
          </li>
        ))}
      </ul>

      <div>
        {steps.map(
          (item: optionTypes) =>
            item.id === step && renderComponent(item.componentName)
        )}
      </div>
    </div>
  );
};

export default NewProfileSteps;
