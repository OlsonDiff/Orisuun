import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Button from '@/components/ui/button';
import MultiChips from '@/components/ui/multi-chips';
import FormLayout from '@/components/form-layout';
import { useFormContext } from 'react-hook-form';
import { BusinessOpportunitiesData } from '@/utils/schema';
import { getAllSubIndustires } from '@/server-actions/businessDevelopment';
import { servicesIndustriesData, GoodsIndustriesData } from '@/utils/constants';
import { toast } from 'react-toastify';
import axios from 'axios';
import { apiEndpoint } from '@/utils/utils';

interface RelevantIndustryProps {
  setServiceStep: Dispatch<SetStateAction<number>>;
  setStep: Dispatch<SetStateAction<number>>;
  BdId?: any
}

const RelevantIndustry: React.FC<RelevantIndustryProps> = ({
  setStep,
  setServiceStep,
  BdId
}) => {
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<BusinessOpportunitiesData>();

  const LevelOneIndustry = watch('LevelOneIndustry');
  const [industries, setIndustries] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSelectIndustry = (industryName: string) => {
    setSelectedIndustries((prev) => {
      if (prev.includes(industryName)) {
        return prev.filter((name) => name !== industryName);
      } else if (prev.length < 3) {
        return [...prev, industryName];
      }
      return prev;
    });
  };

  useEffect(() => {
    setValue('IndustryList', selectedIndustries);
  }, [selectedIndustries]);

  console.log("selectedIndustries ", selectedIndustries);

  const handleConfitnue = async () => {
    try {
      setLoading(true)
      const resSaveIndustry = await axios.post(`${apiEndpoint}/BusinessOpportunity/SaveBDIndustryList`,
        {
          BDId: BdId,
          IndustryList: getIdsForSelectedIndustries(industries, selectedIndustries),
          IndustryType: LevelOneIndustry
        },
        {
          headers: {
            XApiKey:
              'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
          },
        }
      )

      if (resSaveIndustry.status == 200) {
        toast.success(resSaveIndustry?.data?.Message || 'Saved data successfully')
        setStep((prev) => prev + 1)
        setLoading(false)
      }

    } catch (error) {
      console.log("Error ", error);
      toast.error(error?.response?.data?.Message || 'Something went wrong')
      setLoading(false)
    }
  }

  function getIdsForSelectedIndustries(data, selectedIndustries) {
    return selectedIndustries.map(industry => {
      const industryObject = data.find(item => item.IndustryName === industry);
      return industryObject?.Id && industryObject?.Id
    });
  }

  useEffect(() => {
    (async () => {
      const resIndustry = await axios.get(`${apiEndpoint}/Explore/GetIndustriesList`, {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
      })

      if (resIndustry.status === 200) {
        setIndustries(resIndustry?.data?.Result)
      }
    })()
  }, [])


  return (
    <FormLayout
      title="Please select the relevant industry"
      description="Select up to 3 industries for this business development opportunity."
      position="start"
      handleBack={() => setServiceStep((prev) => prev - 1)}
      handleNext={() => handleConfitnue()}
      disableNext={loading}
    // nextButtonType="submit"
    >
      {LevelOneIndustry === 'Goods-Producing Industries' &&
        GoodsIndustriesData.map((industry, index) => (
          <MultiChips
            key={index}
            industry={industry}
            onSelect={handleSelectIndustry}
            selectedIndustries={selectedIndustries}
            level={0}
            isFirst={index === 0}
          />
        ))}
      {LevelOneIndustry === 'Service-Producing Industries' &&
        servicesIndustriesData.map((industry, index) => (
          <MultiChips
            key={index}
            industry={industry}
            onSelect={handleSelectIndustry}
            selectedIndustries={selectedIndustries}
            level={0}
            isFirst={index === 0}
          />
        ))}
    </FormLayout>
  );
};

export default RelevantIndustry;
