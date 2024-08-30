import React, { Dispatch, SetStateAction } from 'react';
import { cn } from '@/utils/utils';
import CompanyInformation from './company-info';
import DiscountInformation from './discount-info';
import Expiry from './expiry';
import NoOfDiscounts from './no-of-discounts';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { stepSchemas } from '@/utils/discountSchema';
import { companyInformationSchema, CreateCompnayInformationData } from '@/utils/schema';
import axios from 'axios';
import { toast } from 'react-toastify';
import { redirect, useRouter } from 'next/navigation';

interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  steps: Array<any>;
}

const apiEndpoint = process.env.NEXT_PUBLIC_APP_BASE_URL
  ? `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api`
  : 'https://api.orisuun.com/api';


const CreateDiscountSteps: React.FC<IProps> = ({ steps, step, setStep }) => {
  const router = useRouter()
  // const { trigger } = useFormContext<CreateCompnayInformationData>();

  // Determine the schema for the current step
  const currentSchema = stepSchemas[step] || companyInformationSchema;

  const methods = useForm({
    resolver: zodResolver(currentSchema), // Apply the schema for the current step
    defaultValues: {
      CompanyLogo: "",
      CompanyName: "",
      CompanyWebsite: "",
      CompanySlogan: "",
      CompanyIndustry: "",
      CompanyType: "",
      CompanyDescription: "",
      DiscountDescription: "",
      IsStartUps: true,
      DiscountActivation: "Online",
      DiscountType: "Partner discounts",
      ActiveDiscount: "New Customers",
      ProposalDuration: 3,
      NumberOfDiscount: 10,
      DiscountCode: "",
      DiscountOff: ""
    },
  });

  const onSubmit = async () => {

    try {
      // const CompanyName = await trigger('CompanyName');

      const allData = methods.getValues(); // Retrieve all form 
      console.log("allData ", allData);

      if (allData?.DiscountCode !== "" && allData?.DiscountOff !== "") {

        const formData = new FormData();

        // Fetch the userId from localStorage
        const userData = JSON.parse(localStorage.getItem('userData'));

        // Append the userId to formData
        formData.append('UserId', userData?.Id);

        Object.keys(allData).forEach((key) => {
          const value = allData[key];

          if (key === 'NumberOfDiscount' || key === 'DiscountOff') {
            // Convert to number first, then to string before appending
            formData.append(key, String(value));
          } else if (value instanceof File) {
            formData.append(key, value); // Append the file directly
          } else {
            formData.append(key, value as string); // Append the string directly
          }
        });

        // Append the userId from localStorage
        const userId = localStorage.getItem('userId');
        if (userId) {
          formData.append('userId', userId);
        }

        console.log("formData", formData);

        const res = await axios.post(`${apiEndpoint}/DiscountPortal/SaveDiscountDetails`, formData, {
          headers: {
            XApiKey:
              'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
            'Content-Type': 'multipart/form-data',
          },
        })

        console.log("res ", res);

        if (res.status === 200) {
          toast.success('Discount created successfully');
          router.push("/discount-portal")
        }

      }

    } catch (error) {
      console.log("error ", error?.response?.data?.Message, error);
      toast.error(error?.response?.data?.Message || 'Failed to create discount');
    }
  };

  console.log("step ", step);


  return (
    <div>
      <ul className="hidden p-6 grid-cols-4 md:grid">
        {steps.slice(0, 5).map((item, index) => (
          <li
            className={cn(
              'flex items-center gap-2 border-b-2 py-2',
              item.id === step ? 'border-b-omblue-700' : 'border-b-omblue-100'
            )}
            key={index}
          >
            <p
              className={cn(
                'w-6 h-6 p-2 rounded-full text-xs border font-medium flex items-center justify-center',
                item.id === step
                  ? 'border-omblue-500 bg-olblue-50 text-omblue-500'
                  : 'border-omblue-100 bg-transparent text-omblue-300'
              )}
            >
              {index + 1}
            </p>
            <p
              className={cn(
                'font-semibold text-h7 2xl:text-scaled-h7',
                item.id === step ? 'text-omblue-700' : 'text-omblue-300'
              )}
            >
              {item.name}
            </p>
          </li>
        ))}
      </ul>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div>
            {step === 0 && <CompanyInformation step={step} setStep={setStep} />}
            {step === 1 && <DiscountInformation step={step} setStep={setStep} />}
            {step === 2 && <Expiry step={step} setStep={setStep} />}
            {step === 3 && <NoOfDiscounts step={step} setStep={setStep} />}
          </div>
          {/* <div className="flex justify-between mt-4">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="btn-secondary"
              >
                Previous
              </button>
            )}
            {step === steps.length - 1 ? (
              <button
                type="submit"
                className="btn-primary"
              >
                Submit
              </button>
            ) : (
              <button
                type="submit"
                className="btn-primary"
              >
                Next
              </button>
            )}
          </div> */}
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateDiscountSteps;
