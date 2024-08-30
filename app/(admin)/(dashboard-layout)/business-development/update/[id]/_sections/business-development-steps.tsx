import { apiEndpoint, cn } from '@/utils/utils';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ServiceProducing from './service-producing';
import Region from './region';
import OpportunityDetails from './opportunity';
import { FormProvider, useForm } from 'react-hook-form';
import {
  BusinessOpportunitiesData,
  businessOpportunitySchema,
} from '@/utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';
import { RootState } from '@/data/store';
import { toast } from 'react-toastify';
import { createNewBusinessOpportunity } from '@/server-actions/businessDevelopment';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  steps: Array<any>;
}

const BusinessDevelopmentSteps: React.FC<IProps> = ({
  steps,
  step,
  setStep,
}) => {
  const methods = useForm<BusinessOpportunitiesData>({
    resolver: zodResolver(businessOpportunitySchema),
    mode: "onChange",
  });
  const { id } = useParams()
  const [BdId, setBdId] = useState()
  const [tagsList, setTagsList] = useState([])
  const [loading, setLoading] = useState(false)


  const router = useRouter();

  const onSubmit = async (data: BusinessOpportunitiesData) => {
    try {
      setLoading(true)
      console.log(data, 'Business Info data)');
      // if (currentUser.UserId !== null) {
      const userData = JSON.parse(localStorage.getItem("userData"))
      const payload = {
        StrategyName: data?.strategy,
        Name: data?.jobTitle,
        RepresentativeName: data?.representativeName,
        PhoneNumber: data?.phone,
        Email: data?.email,
        OpportunityStructure: data?.structure,
        timeLine: data?.timeline,
        Description: data?.description,
        TagsInput: (data?.tags)?.join(", "),
        BDId: id,
        TacticsNames: data?.tactics?.map((t) => ({ TacticsName: t })),
        IsFilled: true
      }

      const res = await axios.post(`${apiEndpoint}/BusinessOpportunity/SaveBdDescriptionData`, payload, {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
      })
      if (res.status == 200) {
        toast.success(res.data?.Message || 'Saved Successfully')
        router.push('/business-development')
        setLoading(false)

      }
    } catch (error) {
      console.error('An error occurred during signup:', error);
      toast.error(error?.response?.data?.Message || 'Something went wrong')
      setLoading(false)
    }
  };

  useEffect(() => {
    (async () => {
      const res = await axios.post(`${apiEndpoint}/BusinessOpportunity/GetBDEditDetails`, {
        BDId: id
      },
        {
          headers: {
            XApiKey:
              'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
          },
        }
      )
      if (res.status == 200) {
        const data = res.data?.Result?.bdDetails
        console.log("data ", data, res?.data?.Result?.TacticsNameList, res?.data?.Result?.TagsName);
        setTagsList(res?.data?.Result?.TagsName)
        methods.reset({
          BDOpportunityType: data?.BDType,
          LevelOneIndustry: data?.IndustryType,
          IndustryList: data?.IndustryList || [],
          RegionId: data?.RegionId || 0,
          strategy: data?.StrategyName,
          tactics: res?.data?.Result?.TacticsNameList || [],
          representativeName: data?.RepresentativeName,
          jobTitle: data?.Name,
          phone: data?.Phone,
          email: data?.Email,
          structure: data?.OpportunityStructure,
          timeline: data?.Timeline,
          tags: res?.data?.Result?.TagsName || [],
          description: data?.OpportunityDescription,
        });
      }
    })()
  }, [id, methods])

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <ul className="hidden p-6 grid-cols-3 gap-4 md:grid">
            {steps.slice(0, 5).map((item, index) => (
              <li
                className={cn(
                  'flex items-center gap-2 border-b-2 py-2',
                  item.id === step
                    ? 'border-b-omblue-700'
                    : 'border-b-omblue-100'
                )}
                key={index}
              >
                <p
                  className={cn(
                    'w-6 h-6 p-2 rounded-full text-xs border  font-medium flex items-center justify-center',
                    item.id === step
                      ? 'border-omblue-500 bg-olblue-50 text-omblue-500'
                      : 'border-omblue-100 bg-transparent text-omblue-300'
                  )}
                >
                  {++index}
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

          <div>
            {step === 1 && <ServiceProducing setBdId={setBdId} BdId={BdId} step={step} setStep={setStep} />}
            {step === 2 && <Region setBdId={setBdId} BdId={BdId} step={step} setStep={setStep} />}
            {step === 3 && <OpportunityDetails loading={loading} methods={methods} tagsList={tagsList} setBdId={setBdId} BdId={BdId} step={step} setStep={setStep} />}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default BusinessDevelopmentSteps;
