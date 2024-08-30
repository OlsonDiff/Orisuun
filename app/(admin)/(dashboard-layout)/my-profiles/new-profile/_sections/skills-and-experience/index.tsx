import FormLayout from '@/components/form-layout';
import Input from '@/components/ui/input';
import { updateCurrentUser } from '@/data/slices/user-slice';
import { RootState } from '@/data/store';
import Add from '@/icons/add';
import Bin from '@/icons/upload-icons/bin';
import { addSkillsDetailsAction } from '@/server-actions/createProfile';
import { ProfileSkillFormData, profileSkillFormSchema } from '@/utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { Dispatch, SetStateAction } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const SkillsAndExperiences: React.FC<IProps> = ({ step, setStep }) => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ProfileSkillFormData>({
    resolver: zodResolver(profileSkillFormSchema),
    defaultValues: {
      Skills: [{ SkillName: '', Year: '' }],
      Experiences: [{ SkillName: '', Year: '', ExperienceDescription: '' }],
      Educations: [
        {
          DegreeName: '',
          InstituteName: '',
          FromYear: '',
          ToYear: '',
        },
      ],
    },
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: 'Skills',
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: 'Experiences',
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: 'Educations',
  });

  const onSubmit = async (data: ProfileSkillFormData) => {
    try {
      if (currentUser) {
        const skillData = {
          UserId: currentUser.UserId,
          UserIndividualProfileId:
            currentUser?.ProfileId || currentUser.IndividualBasicProfileData.Id,
          Experiences: data.Experiences,
          Educations: data.Educations,
          Skills: data.Skills,
        };
        const result: any = await addSkillsDetailsAction(skillData);

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormLayout
        title="Skills & Experience"
        description="Please enter all of your skills, experience, and education"
        position="start"
        nextButtonType="submit"
      >
        <div className="flex-grow">
          <div className="flex flex-col w-full mb-10 rounded-lg gap-6 md:py-6 lg:px-6">
            <div className="space-y-3">
              <label className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500">
                Capabilities and Skills
              </label>
              {skillFields.map((field, index) => (
                <div key={field.id} className="space-y-3">
                  <div className="flex items-start gap-2 w-full">
                    <div className="w-full flex items-start gap-2">
                      <div className="flex-1">
                        <Input
                          placeholder="Skill Name"
                          error={
                            errors.Skills?.[index]?.SkillName &&
                            errors.Skills[index].SkillName.message
                          }
                          {...register(`Skills.${index}.SkillName`)}
                        />
                      </div>
                      <Input
                        placeholder="Year"
                        {...register(`Skills.${index}.Year`)}
                        containerClass="max-w-[100px] 2xl:max-w-24"
                        maxLength={4}
                        error={
                          errors.Skills?.[index]?.Year &&
                          errors.Skills[index].Year.message
                        }
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      disabled={removeSkill.length < 2}
                      className="text-danger-500 bg-danger-100 rounded-md p-2 disabled:text-danger-200"
                    >
                      <Bin className="w-8 h-8" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  appendSkill({
                    SkillName: '',
                    Year: '',
                  })
                }
                className="flex gap-2 items-center btn-secondary text-h9 2xl:text-scaled-h9 ms-1 px-4 py-3 rounded-md bg-omblue-500 text-white font-semibold disabled:bg-omblue-50 disabled:text-omblue-200"
              >
                <Add />
                Add Skills
              </button>
            </div>
            <div className="space-y-3">
              <label className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500">
                Experience
              </label>
              {experienceFields.map((field, index) => (
                <div key={field.id} className="space-y-3">
                  <div className="flex items-start gap-2 w-full">
                    <div className="w-full flex items-start gap-2">
                      <div className="flex-1">
                        <Input
                          error={
                            errors.Experiences?.[index]?.SkillName &&
                            errors.Experiences[index]?.SkillName.message
                          }
                          placeholder="Experience Name"
                          {...register(`Experiences.${index}.SkillName`)}
                        />
                      </div>
                      <Input
                        placeholder="Year"
                        {...register(`Experiences.${index}.Year`)}
                        containerClass="max-w-[100px] 2xl:max-w-24"
                        maxLength={4}
                        error={
                          errors.Experiences?.[index]?.Year &&
                          errors.Experiences[index].Year.message
                        }
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      disabled={experienceFields.length < 2}
                      className="text-danger-500 bg-danger-100 rounded-md p-2 disabled:text-danger-200"
                    >
                      <Bin className="w-8 h-8" />
                    </button>
                  </div>
                  {/* <div className="relative w-full"> */}
                  <textarea
                    id={`Experiences.${index}.ExperienceDescription`}
                    rows={4}
                    placeholder="Write a brief, introductory statement about your experience....."
                    {...register(`Experiences.${index}.ExperienceDescription`)}
                    className="w-full resize-none border-[0.8px] border-black-200 rounded-md px-4 py-3 text-h9 2xl:text-scaled-h9 text-black-400 font-medium"
                  />
                  {errors.Experiences?.[index]?.ExperienceDescription && (
                    <span className="text-red-400 text-xs mt-2 m-1">
                      {errors.Experiences[index].ExperienceDescription.message}
                    </span>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  appendExperience({
                    SkillName: '',
                    Year: '',
                    ExperienceDescription: '',
                  })
                }
                className="flex gap-2 items-center btn-secondary text-h9 2xl:text-scaled-h9 ms-1 px-4 py-3 rounded-md bg-omblue-500 text-white font-semibold disabled:bg-omblue-50 disabled:text-omblue-200"
              >
                <Add />
                Add Experience
              </button>
            </div>
            <div className="space-y-3">
              <label className="text-h8 2xl:text-scaled-h8 font-semibold text-black-500">
                Education
              </label>
              {educationFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-col items-center gap-2 w-full flex-1"
                >
                  <Input
                    placeholder="Enter Degree Name"
                    {...register(`Educations.${index}.DegreeName`)}
                    containerClass="md:w-full flex-1"
                    error={
                      errors.Educations?.[index]?.DegreeName &&
                      errors.Educations[index].DegreeName.message
                    }
                  />
                  <Input
                    placeholder="Enter Institution Name"
                    {...register(`Educations.${index}.InstituteName`)}
                    containerClass="md:w-full flex-1"
                    error={
                      errors.Educations?.[index]?.InstituteName &&
                      errors.Educations[index].InstituteName.message
                    }
                  />
                  <div className="flex items-start gap-3 w-full">
                    <Input
                      placeholder="From Year"
                      {...register(`Educations.${index}.FromYear`)}
                      containerClass="flex-1"
                      error={
                        errors.Educations?.[index]?.FromYear &&
                        errors.Educations[index].FromYear.message
                      }
                    />
                    <Input
                      placeholder="To Year"
                      {...register(`Educations.${index}.ToYear`)}
                      containerClass="flex-1"
                      error={
                        errors.Educations?.[index]?.ToYear &&
                        errors.Educations[index].ToYear.message
                      }
                    />
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      disabled={educationFields.length < 2}
                      className="text-danger-500 bg-danger-100 rounded-md p-2 disabled:text-danger-200"
                    >
                      <Bin className="w-8 h-8" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  appendEducation({
                    DegreeName: '',
                    InstituteName: '',
                    FromYear: '',
                    ToYear: '',
                  })
                }
                className="flex gap-2 items-center btn-secondary text-h9 2xl:text-scaled-h9 ms-1 px-4 py-3 rounded-md bg-omblue-500 text-white font-semibold disabled:bg-omblue-50 disabled:text-omblue-200"
              >
                <Add />
                Add Education
              </button>
            </div>
          </div>
        </div>
      </FormLayout>
    </form>
  );
};

export default SkillsAndExperiences;
