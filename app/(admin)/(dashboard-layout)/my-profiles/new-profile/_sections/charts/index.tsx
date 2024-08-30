import React, { Dispatch, SetStateAction } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormLayout from '@/components/form-layout';
import Input from '@/components/ui/input';
import Note from '@/components/ui/note';
import CustomSelect from '@/components/ui/select';
import Add from '@/icons/add';
import Bin from '@/icons/upload-icons/bin';
import {
  ProfileSkillsChartsInfoSchema,
  profileSkillsChartsInfoSchema,
} from '@/utils/schema';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/data/store';
import { addChartsDetailsAction } from '@/server-actions/createProfile';
import { updateCurrentUser } from '@/data/slices/user-slice';
import { toast } from 'react-toastify';
import { getProfileTypeCategory } from '@/utils/utils';

interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const Charts: React.FC<IProps> = ({ step, setStep }) => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    watch,
  } = useForm<ProfileSkillsChartsInfoSchema>({
    resolver: zodResolver(profileSkillsChartsInfoSchema),
    defaultValues: {
      services: [{ name: '' }],
      servicesPercentages: [''],
      industryServed: [{ name: '' }],
      industryServedPercentages: [''],
      locations: [{ name: '' }],
      businessChannelPercentages: {
        individuals: '',
        smallBusinesses: '',
        midmarketBusinesses: '',
        enterprise: '',
      },
    },
  });

  const {
    fields: serviceFields,
    append: appendService,
    remove: removeService,
  } = useFieldArray({
    control,
    name: 'services',
  });

  const {
    fields: industryFields,
    append: appendIndustry,
    remove: removeIndustry,
  } = useFieldArray({
    control,
    name: 'industryServed',
  });

  const {
    fields: locationFields,
    append: appendLocation,
    remove: removeLocation,
  } = useFieldArray({
    control,
    name: 'locations',
  });

  const servicesPercentages = watch('servicesPercentages');
  const industryServedPercentages = watch('industryServedPercentages');

  const onSubmit = async (data: ProfileSkillsChartsInfoSchema) => {
    try {
      if (currentUser) {
        const profileCategory = getProfileTypeCategory(
          currentUser.UserProfileTypeId
        );
        const businessChartData = {
          UserId: currentUser.UserId,
          UserBasicProfileDetailsId:
            currentUser?.ProfileId ||
            currentUser.BusinessBasicProfileData?.Id ||
            currentUser.IndividualBasicProfileData.Id,
          UserProfileType: currentUser.UserProfileType,
          SkillsSpecializations: data.services.map((service, index) => ({
            ServiceName: service.name,
            percentage: data.servicesPercentages[index],
          })),
          IndustriesServed: data.industryServed.map((industry, index) => ({
            IndustryName: industry.name,
            percentage: data.industryServedPercentages[index],
          })),
          RegionsServed: data.locations.map((loc) => ({
            RegionName: loc.name,
          })),
          ClientsBySize: {
            IndividualsPercentage: data.businessChannelPercentages.individuals,
            SmallBusinessPercentage:
              data.businessChannelPercentages.smallBusinesses,
            MidMarketPercentage:
              data.businessChannelPercentages.midmarketBusinesses,
            EnterprisePercentage: data.businessChannelPercentages.enterprise,
          },
        };
        const result: any = await addChartsDetailsAction(businessChartData);

        if (result.success) {
          dispatch(updateCurrentUser(result.data));
          toast.success(result.message);
          setTimeout(() => {
            setStep(step + 1);
          }, 200);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const businessChannelFields = [
    { key: 'individuals' as const, label: 'Individuals' },
    {
      key: 'smallBusinesses' as const,
      label: 'Small Businesses (less than $8 million in annual revenue)',
    },
    {
      key: 'midmarketBusinesses' as const,
      label: 'Midmarket Businesses ($8M to $1B annual revenue)',
    },
    {
      key: 'enterprise' as const,
      label: 'Enterprise (more than $1 billion in annual revenue)',
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormLayout
        title="Charts"
        description="Tell us about the makeup of your business"
        position="start"
        nextButtonType="submit"
        variant="larger-child"
      >
        <div className="flex flex-col w-full gap-6 mb-10 rounded-lg md:py-6 lg:px-6">
          {/* Services Section */}
          <div className="space-y-3">
            <label className="font-semibold text-h8 2xl:text-scaled-h8 text-black-500">
              Service or Product Splits{' '}
              <span className="text-danger-500">*</span>
            </label>
            <Note text="One service or product is mandatory for your profile" />
            <p className="py-2 font-medium text-h10 2xl:text-scaled-h10 text-grey-800">
              Total percentage for all services or products should be equal to
              100%
            </p>
            {serviceFields.map((field, index) => (
              <div key={field.id} className="space-y-3">
                <div className="flex items-start w-full gap-2">
                  <div className="flex items-start w-full gap-2">
                    <div className="flex-1">
                      <Input
                        {...register(`services.${index}.name`)}
                        placeholder="Service/Product Name"
                        error={errors.services?.[index]?.name?.message}
                      />
                    </div>
                    <Input
                      {...register(`servicesPercentages.${index}`)}
                      placeholder="100"
                      containerClass="max-w-[100px] 2xl:max-w-28"
                      maxLength={3}
                      isPercentage
                      onChange={(e) => {
                        setValue(
                          `servicesPercentages.${index}`,
                          e.target.value
                        );
                        trigger('servicesPercentages');
                      }}
                      error={
                        errors.servicesPercentages?.message ??
                        errors.servicesPercentages?.root?.message
                      }
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      removeService(index);
                      setValue(
                        'servicesPercentages',
                        servicesPercentages.filter((_, i) => i !== index)
                      );
                    }}
                    disabled={serviceFields.length < 2}
                    className="p-2 rounded-md text-danger-500 bg-danger-100 disabled:text-danger-200"
                  >
                    <Bin className="w-8 h-8" />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                appendService({ name: '' });
                setValue('servicesPercentages', [...servicesPercentages, '']);
              }}
              className="flex items-center gap-2 px-4 py-3 font-semibold text-white rounded-md btn-secondary text-h9 2xl:text-scaled-h9 ms-1 bg-omblue-500 disabled:bg-omblue-50 disabled:text-omblue-200"
            >
              <Add />
              Add Service/Product
            </button>
          </div>

          {/* Business Channel Categories Section */}
          <div className="space-y-3">
            <label className="font-semibold text-h8 2xl:text-scaled-h8 text-black-500">
              Industry Services <span className="text-danger-500">*</span>
            </label>
            <Note text="One Industry Services Is Mandatory For The Business." />
            <p className="py-2 font-medium text-h10 2xl:text-scaled-h10 text-grey-800">
              Total percentage for all industry services should be equal to 100%
            </p>
            {industryFields.map((field, index) => (
              <div key={field.id} className="space-y-3">
                <div className="flex items-start w-full gap-2">
                  <div className="flex items-start w-full gap-2">
                    <div className="flex-1">
                      <CustomSelect
                        placeholder={'Industry Services'}
                        options={[
                          {
                            label: 'Industry 1',
                            value: 'Industry 1',
                          },
                        ]}
                        onChange={(selectedOption: any) => {
                          setValue(
                            `industryServed.${index}.name`,
                            selectedOption.value
                          );
                          trigger('industryServed');
                        }}
                        error={errors.industryServed?.[index]?.name?.message}
                        value={undefined}
                      />
                    </div>
                    <Input
                      {...register(`industryServedPercentages.${index}`)}
                      placeholder="100"
                      containerClass="max-w-[100px] 2xl:max-w-28"
                      maxLength={3}
                      isPercentage
                      error={
                        errors.industryServedPercentages?.message ??
                        errors.industryServedPercentages?.root?.message
                      }
                      onChange={(e) => {
                        setValue(
                          `industryServedPercentages.${index}`,
                          e.target.value
                        );
                        trigger('industryServedPercentages');
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      removeIndustry(index);
                      setValue(
                        'industryServedPercentages',
                        industryServedPercentages.filter((_, i) => i !== index)
                      );
                    }}
                    disabled={industryFields.length < 2}
                    className="p-2 rounded-md text-danger-500 bg-danger-100 disabled:text-danger-200"
                  >
                    <Bin className="w-8 h-8" />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                appendIndustry({ name: '' });
                setValue('industryServedPercentages', [
                  ...industryServedPercentages,
                  '',
                ]);
              }}
              className="flex items-center gap-2 px-4 py-3 font-semibold text-white rounded-md btn-secondary text-h9 2xl:text-scaled-h9 ms-1 bg-omblue-500 disabled:bg-omblue-50 disabled:text-omblue-200"
            >
              <Add />
              Add Business Categories
            </button>
          </div>

          {/* Locations Section */}
          <div className="space-y-3">
            <label className="font-semibold text-h8 2xl:text-scaled-h8 text-black-500">
              List of Locations <span className="text-danger-500">*</span>
            </label>
            <Note text="One location is mandatory for a profile." />
            {locationFields.map((field, index) => (
              <div key={field.id} className="space-y-3">
                <div className="flex items-start w-full gap-2">
                  <Input
                    {...register(`locations.${index}.name`)}
                    placeholder={'Location'}
                    containerClass="flex-1"
                    error={errors.locations?.[index]?.name?.message}
                  />
                  <button
                    type="button"
                    onClick={() => removeLocation(index)}
                    disabled={locationFields.length < 2}
                    className="p-2 rounded-md text-danger-500 bg-danger-100 disabled:text-danger-200"
                  >
                    <Bin className="w-8 h-8" />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendLocation({ name: '' })}
              className="flex items-center gap-2 px-4 py-3 font-semibold text-white rounded-md btn-secondary text-h9 2xl:text-scaled-h9 ms-1 bg-omblue-500 disabled:bg-omblue-50 disabled:text-omblue-200"
            >
              <Add />
              Add Location
            </button>
          </div>

          {/* Business Channel Percentages Section */}
          <div className="space-y-3">
            <label className="font-semibold text-h8 2xl:text-scaled-h8 text-black-500">
              Business Channel Percentages{' '}
              <span className="text-danger-500">*</span>
            </label>
            <p className="py-2 font-medium text-h10 2xl:text-scaled-h10 text-grey-800">
              Total percentage for all business channels should be equal to 100%
            </p>
            <div className="space-y-2">
              {businessChannelFields.map((field) => (
                <div
                  key={field.key}
                  className="flex items-start justify-between w-full gap-4"
                >
                  <p className="py-3 font-medium text-h9 2xl:text-scaled-h9 text-black-500">
                    {field.label}
                  </p>
                  <Input
                    {...register(`businessChannelPercentages.${field.key}`)}
                    placeholder="100"
                    containerClass="max-w-[100px] 2xl:max-w-28"
                    maxLength={3}
                    isPercentage
                    error={
                      errors.businessChannelPercentages?.message ??
                      errors.businessChannelPercentages?.root?.message
                    }
                    onChange={(e) => {
                      setValue(
                        `businessChannelPercentages.${field.key}`,
                        e.target.value
                      );
                      trigger('businessChannelPercentages');
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </FormLayout>
    </form>
  );
};

export default Charts;
