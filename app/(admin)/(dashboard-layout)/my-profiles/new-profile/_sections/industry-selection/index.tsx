import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import FormLayout from '@/components/form-layout';
import Note from '@/components/ui/note';
import CustomSelect from '@/components/ui/select';
import ArrowDown from '@/icons/arrow-down';
import { getAllIndustries } from '@/server-actions/profile';
import { createBusinessIndividualIndustriesAssociated } from '@/server-actions/createProfile';
import { cn } from '@/utils/utils';
import { RootState } from '@/data/store';
import { updateCurrentUser } from '@/data/slices/user-slice';
import Loader from '@/components/loader';
import Add from '@/icons/add';

interface Props {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const schema = z.object({
  selectedIndustries: z
    .array(z.string())
    .min(1, 'At least one industry must be selected'),
});

type FormData = z.infer<typeof schema>;

const IndustrySelection: React.FC<Props> = ({ step, setStep }) => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [industryData, setIndustryData] = useState<any>(null);
  const [selectedLevelOne, setSelectedLevelOne] = useState<string | null>(null);
  const [openLevelTwo, setOpenLevelTwo] = useState<number | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      selectedIndustries: [],
    },
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const selectedIndustries = watch('selectedIndustries');

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await getAllIndustries();
        if (response.success) {
          setIndustryData(response.data);
        } else {
          throw new Error('Failed to fetch industry data');
        }
      } catch (error) {
        console.error('Error fetching industries:', error);
        toast.error('Failed to load industry data. Please try again.');
      }
    };

    if (currentUser) {
      fetchIndustries();
    }
  }, [currentUser]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedIndustryData = {
        UserId: currentUser.UserId,
        UserBasicProfileDetailsId:
          currentUser?.ProfileId ||
          currentUser.BusinessBasicProfileData?.Id ||
          currentUser.IndividualBasicProfileData.Id,
        IndustriesAssociatedIds: data.selectedIndustries,
      };
      const response = await createBusinessIndividualIndustriesAssociated(
        selectedIndustryData
      );
      if (response.success) {
        dispatch(updateCurrentUser(response.data));
        toast.success(response.message);
        setTimeout(() => {
          router.push('/my-profiles');
        }, 200);
      } else {
        throw new Error(response.message || 'Failed to update industries');
      }
    } catch (error) {
      console.error('Error updating industries:', error);
      toast.error('Failed to update industries. Please try again.');
    }
  };

  if (!industryData) return <Loader />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormLayout
        title="Industry Selection"
        position="start"
        handleBack={() => setStep(step - 1)}
        showBack={true}
        nextButtonType="submit"
        descriptionAlt={
          <Note text="Select at least one industry." status="info" />
        }
        variant="equal"
      >
        <div className="flex flex-col w-full gap-6 mb-8 rounded-lg md:py-6 lg:px-6">
          <div className={cn('flex items-center border-b border-omblue-100')}>
            {industryData.LevelOneIndustries?.map((levelOne: any) => (
              <button
                key={levelOne.Id}
                type="button"
                onClick={() => setSelectedLevelOne(levelOne.Id)}
                className={cn(
                  'text-h9 2xl:text-scaled-h9 w-full text-center p-3 border-b',
                  levelOne.Id !== selectedLevelOne
                    ? 'text-black-200 font-medium border-transparent'
                    : 'text-omblue-500 font-semibold border-omblue-400'
                )}
              >
                {levelOne.Name}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {industryData.LevelTwoIndustries?.filter(
              (item: any) => item.ParentIndustryId === selectedLevelOne
            ).map((levelTwo: any, levelTwoIndex: number) => (
              <div key={levelTwoIndex} className="px-4 py-4 bg-olblue-50">
                <div
                  className="flex items-center justify-between gap-4 cursor-pointer"
                  onClick={() =>
                    setOpenLevelTwo(
                      openLevelTwo === levelTwoIndex ? null : levelTwoIndex
                    )
                  }
                >
                  <p className="text-h9 2xl:text-scaled-h9">{levelTwo.Name}</p>
                  <ArrowDown className="w-5 h-5" />
                </div>
                <div
                  className={cn(
                    'transition-all',
                    openLevelTwo === levelTwoIndex
                      ? 'max-h-[500rem] opacity-100 mb-4'
                      : 'hidden max-h-0 opacity-0'
                  )}
                >
                  {industryData.LevelThreeIndustries.filter(
                    (item: any) => item.ParentIndustryId === levelTwo?.Id
                  ).map((levelThree: any) => (
                    <div
                      className={cn(
                        'space-y-2',
                        openLevelTwo !== levelTwoIndex ? 'pt-0' : 'pt-4'
                      )}
                      key={levelThree.Id}
                    >
                      <label className="font-semibold text-h8 2xl:text-scaled-h8 text-black-500">
                        {levelThree.Name}
                      </label>
                      <Controller
                        name="selectedIndustries"
                        control={control}
                        render={({ field }) => (
                          <CustomSelect
                            options={industryData.LevelFourIndustries.filter(
                              (item: any) =>
                                item.ParentIndustryId === levelThree.Id
                            ).map((levelFour: any) => ({
                              label: levelFour.Name,
                              value: levelFour.Id,
                            }))}
                            error={errors.selectedIndustries?.message}
                            placeholder="Select Industries"
                            onChange={async (val) => {
                              console.log(levelThree);

                              setValue('selectedIndustries', [
                                ...selectedIndustries,
                                val.value,
                              ]);
                              await trigger('selectedIndustries');
                            }}
                            value={industryData.LevelFourIndustries.find(
                              (item) => {
                                selectedIndustries.some(
                                  (selected) => selected === item?.Id
                                );
                              }
                            )}
                          />
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {selectedIndustries && industryData.LevelFourIndustries && (
            <div className="flex gap-4 flex-wrap">
              {industryData?.LevelFourIndustries?.filter((item: any) =>
                selectedIndustries.includes(item?.Id)
              ).map((item: any) => (
                <p
                  key={item?.Id}
                  className="text-h9 text-omblue-400 bg-olblue-100 px-2 py-2 rounded-md flex gap-2 justify-between items-center"
                >
                  {item.Name}
                  <Add
                    className="w-5 h-5 rotate-45 cursor-pointer"
                    onClick={() =>
                      setValue(
                        'selectedIndustries',
                        selectedIndustries.filter(
                          (selected) => selected !== item?.Id
                        )
                      )
                    }
                  />
                </p>
              ))}
            </div>
          )}

          {errors.selectedIndustries && (
            <span className="text-xs text-red-400">
              {errors.selectedIndustries.message}
            </span>
          )}
        </div>
      </FormLayout>
    </form>
  );
};

export default IndustrySelection;
