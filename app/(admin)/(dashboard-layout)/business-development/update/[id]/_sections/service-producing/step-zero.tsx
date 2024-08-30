'use client';

import FormLayout from '@/components/form-layout';
import Handshake from '@/icons/business-development/handshake';
import Zoom from '@/icons/business-development/zoom';
import { BusinessOpportunitiesData } from '@/utils/schema';
import { apiEndpoint } from '@/utils/utils';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
interface IProps {
  setServiceStep: Dispatch<SetStateAction<number>>;
  setStep: Dispatch<SetStateAction<number>>;
  setBdId?: any
  BdId?: any
}

const StepZero: React.FC<IProps> = ({ setServiceStep, setStep, setBdId, BdId }) => {
  const {
    register,
    formState: { errors },
    trigger,
    setValue,
    watch,
  } = useFormContext<BusinessOpportunitiesData>();
  const { id } = useParams()
  const [loading, setLoading] = useState(false)


  const handleContinue = async () => {
    try {
      setLoading(true)
      const userData = JSON.parse(localStorage.getItem('userData'));
      const selectedBDOpportunityType = watch('BDOpportunityType');


      const BDOpportunityTypeValid = await trigger('BDOpportunityType');

      console.log("selectedBDOpportunityType ", selectedBDOpportunityType);

      if (BDOpportunityTypeValid) {
        const resSaveUserBdId = await axios.post(`${apiEndpoint}/BusinessOpportunity/SaveUserBdType`, {
          BDType: selectedBDOpportunityType,
          BDId: id,
          userId: userData?.Id
        },
          {
            headers: {
              XApiKey:
                'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
            },
          })
        if (resSaveUserBdId.status == 200) {
          toast.success(resSaveUserBdId?.data?.Message || 'Saved data successfully')
          setBdId(resSaveUserBdId?.data?.Result?.Id)
          setServiceStep((prev) => prev + 1);
          setLoading(false)
        }
      } else {
        console.log(Object.keys(errors).length, errors);
        setLoading(false)
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.Message || 'Something went wrong')
      setLoading(false)
    }
  };
  return (
    <FormLayout
      title="How can we help you get started?"
      subTitle="Creating a new business development opportunity post?"
      descriptionAlt={
        <div className="text-blue-300 text-h7 2xl:text-scaled-h7">
          <p className="mb-4">
            Business development is about improving the viability and potential
            longevity of a business (i.e. the value) by finding new ways for
            that business to grow. This is done by developing new sales channels
            and revenue streams.
          </p>
          <p>
            On Orisuun, members can let the community know of any business
            development opportunities that they are seeking or that they can
            facilitate.
          </p>
        </div>
      }
      handleNext={() => handleContinue()}
      handleBack={() => { }}
      showBack={false}
      disableNext={loading}
    >
      <button
        className={`w-full border rounded-lg p-6 space-y-4 ${watch('BDOpportunityType') === 'Seeking'
          ? 'shadow-[0px_0px_0px_4px_#2357C61A] border-omblue-600 bg-olblue-50'
          : 'border-[#D2D4DA]'
          }`}
        onClick={() => setValue('BDOpportunityType', 'Seeking')}
        type="button"
      >
        <Zoom className="text-omblue-500 w-8 h-8" />
        <h5 className="text-h5 2xl:text-scaled-h5 text-left font-semibold text-black-400">
          A Business Development Opportunity We Are Seeking
        </h5>
      </button>
      <button
        className={`w-full border rounded-lg p-6 space-y-4 ${watch('BDOpportunityType') === 'Facilitate'
          ? 'shadow-[0px_0px_0px_4px_#2357C61A] border-omblue-600 bg-olblue-50'
          : 'border-[#D2D4DA]'
          }`}
        onClick={() => setValue('BDOpportunityType', 'Facilitate')}
        type="button"
      >
        <Handshake className="text-omblue-500 w-8 h-8" />
        <h5 className="text-h5 2xl:text-scaled-h5 text-left font-semibold text-black-400">
          A Business Development Opportunity We Can Facilitate
        </h5>
      </button>
      {errors?.BDOpportunityType && (
        <p className="text-red-500">{errors?.BDOpportunityType?.message}</p>
      )}
    </FormLayout>

  );
};

export default StepZero;
