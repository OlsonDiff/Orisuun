import { z } from 'zod';

export const signupSchema = z
  .object({
    profileType: z
      .union([z.string(), z.number()])
      .transform((val) => (typeof val === 'string' ? parseInt(val, 10) : val))
      .refine((val) => !isNaN(val), {
        message: 'Profile type must be valid',
      }),
    planType: z
      .union([z.string(), z.number()])
      .transform((val) => (typeof val === 'string' ? parseInt(val, 10) : val))
      .refine((val) => !isNaN(val), {
        message: 'Plan type must be valid',
      }),
    billingFrequency: z
      .union([z.string(), z.number()])
      .transform((val) => (typeof val === 'string' ? parseInt(val, 10) : val))
      .refine((val) => !isNaN(val), {
        message: 'Billing Frequency must be valid',
      }),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .refine((value) => /[A-Z]/.test(value), {
        message: 'Password must contain at least one uppercase letter',
      })
      .refine((value) => /[a-zA-Z]/.test(value), {
        message: 'Password must contain at least one letter',
      }),
    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .refine((value) => /[A-Z]/.test(value), {
        message: 'Password must contain at least one uppercase letter',
      })
      .refine((value) => /[a-zA-Z]/.test(value), {
        message: 'Password must contain at least one letter',
      }),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const paymentSchema = z
  .object({
    payment_option: z.enum(['card', 'bank_account']),
    card_name: z.string().optional(),
    card_number: z.string().optional(),
    card_expiry: z.string().optional(),
    card_cvc: z.string().optional(),
    bank_name: z.string().optional(),
    routing_number: z.string().optional(),
    account_number: z.string().optional(),
    confirm_account_number: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.payment_option === 'card') {
      if (!data.card_name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Card name is required',
          path: ['card_name'],
        });
      }
    } else if (data.payment_option === 'bank_account') {
      if (!data.bank_name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Bank name is required',
          path: ['bank_name'],
        });
      }
      if (!data.routing_number) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Routing number is required',
          path: ['routing_number'],
        });
      }
      if (!data.account_number) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Account number is required',
          path: ['account_number'],
        });
      }
      if (!data.confirm_account_number) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Confirm account number is required',
          path: ['confirm_account_number'],
        });
      }
      if (data.account_number !== data.confirm_account_number) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Account numbers don't match",
          path: ['confirm_account_number'],
        });
      }
    }
  });

export const signinSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Please enter a valid email'),
  password: z.string({ required_error: 'Password is required' }),
});

export const profileBasicInfoSchema = z.object({
  profilePic: z.string({ required_error: 'Profile Pic is required' }),
  CompanyName: z
    .string({ required_error: 'Company Name is required' })
    .min(2, 'Company Name should be atleast 2 characters'),
  Tagline: z
    .string({ required_error: 'Tagline is required' })
    .min(6, 'Tagline should be atleast 6 characters'),
  Youtubeurl: z
    .string()
    .url('Invalid Youtube URL')
    .optional()
    .or(z.literal('')),
  Facebookurl: z
    .string()
    .url('Invalid Facebook URL')
    .optional()
    .or(z.literal('')),
  Linkedinurl: z
    .string()
    .url('Invalid LinkedIn URL')
    .optional()
    .or(z.literal('')),
  Twitterurl: z
    .string()
    .url('Invalid Twitter URL')
    .optional()
    .or(z.literal('')),
  Instagramurl: z
    .string()
    .url('Invalid Instagram URL')
    .optional()
    .or(z.literal('')),
  AboutCompany: z
    .string({ required_error: 'This field is required' })
    .max(200, 'About Company must be 200 words or less'),
  CompanyDetails: z.array(z.string()),
  Tags: z.array(z.string()).max(5).optional(),
  CountryOfOrigin: z
    .string({ required_error: 'Country of origin is required' })
    .min(1, 'Country of origin is required'),
  CustomProfileUrl: z
    .string({ required_error: 'Custom URL is required' })
    .min(2, 'Custom URL is required'),
});

export const profileSkillFormSchema = z.object({
  Skills: z
    .array(
      z.object({
        SkillName: z.string().min(1, { message: 'Skill name is required' }),
        Year: z
          .string()
          .min(1, { message: 'Year is required' })
          .max(4, { message: 'Enter a valid year' })
          .regex(/^\d{4}$/, 'Year must be a 4-digit number'),
      })
    )
    .nonempty({ message: 'At least one skill is required' }),
  Experiences: z
    .array(
      z.object({
        SkillName: z
          .string()
          .min(1, { message: 'Experience name is required' }),
        Year: z
          .string()
          .min(1, { message: 'Year is required' })
          .max(4, { message: 'Enter a valid year' })
          .regex(/^\d{4}$/, 'Year must be a 4-digit number'),
        ExperienceDescription: z
          .string()
          .min(1, { message: 'Description is required' }),
      })
    )
    .nonempty({ message: 'At least one experience is required' }),
  Educations: z
    .array(
      z.object({
        DegreeName: z.string().min(1, { message: 'Degree name is required' }),
        InstituteName: z
          .string()
          .min(1, { message: 'Institution name is required' }),
        FromYear: z
          .string()
          .min(1, { message: 'From year is required' })
          .max(4, { message: 'Enter a valid year' })
          .regex(/^\d{4}$/, 'Year must be a 4-digit number'),
        ToYear: z
          .string()
          .min(1, { message: 'To year is required' })
          .max(4, { message: 'Enter a valid year' })
          .regex(/^\d{4}$/, 'Year must be a 4-digit number'),
      })
    )
    .nonempty({ message: 'At least one education is required' }),
});

export const profileBusinessInfoSchema = z
  .object({
    AddressLine1: z
      .string({ required_error: 'Address line 1 is required' })
      .min(1),
    AddressLine2: z
      .string({ required_error: 'Address line 2 is required' })
      .min(1),
    Country: z.string({ required_error: 'Country is required' }).min(1),
    StateId: z
      .number({ required_error: 'State ID is required' })
      .int()
      .positive(),
    State: z.string({ required_error: 'State is required' }).min(1),
    CityId: z
      .number({ required_error: 'City ID is required' })
      .int()
      .positive(),
    City: z.string({ required_error: 'City is required' }).min(1),
    Code: z.string().optional().or(z.literal('')),
    Website: z
      .string({ required_error: 'Website is required' })
      .url('Invalid URL')
      .optional()
      .or(z.literal('')),
    noOfEmployees: z
      .string({ required_error: 'No of employees is required' })
      .min(1, 'No of employees is required'),
    emailQueries: z
      .string({ required_error: 'This field is required' })
      .email()
      .min(1, 'This field is required'),
    emailBusinessDevelopment: z.string().email().optional(),
    blackOwnershipPercentage: z
      .string({ required_error: 'This field is required' })
      .min(1, 'This field is required'),
    ethinicityBlackOwnership: z.string().optional(),
    languages: z
      .string({ required_error: 'This field is required' })
      .min(1, 'This field is required'),
    phoneNo: z.string().optional(),
    inBusinessSince: z.string().min(1, 'This field is required'),
    businessType: z.string().optional(),
    hours: z.string().optional(),
    videoLink: z.string().url('Invalid URL').optional().or(z.literal('')),
    isPrivate: z.boolean().default(false),
    images: z
      .array(z.string())
      .max(12, 'No more than 12 images are allowed')
      .optional()
      .nullable(),
  })
  .refine(
    (data) =>
      parseInt(data.blackOwnershipPercentage) === 0 ||
      (parseInt(data.blackOwnershipPercentage) > 0 &&
        data.ethinicityBlackOwnership),
    {
      message: 'Ethnicity Black Ownership is required',
      path: ['ethinicityBlackOwnership'],
    }
  );

export const profileExpertBasicInfoSchema = z.object({
  Name: z
    .string({ required_error: 'Name is required' })
    .min(1, 'Name is required'),
  WorkTitle: z
    .string({ required_error: 'Work Title is required' })
    .min(1, 'Work Title is required'),
  Race: z
    .string({ required_error: 'Race is required' })
    .min(1, 'Race is required'),
  Nationality: z
    .string({ required_error: 'Nationality is required' })
    .min(1, 'Nationality is required'),
  Ethinicity: z
    .string({ required_error: 'Ethinicity is required' })
    .min(1, 'Ethinicity is required'),
  VideoLink: z.string().url('Invalid URL').optional().or(z.literal('')),
  AboutYou: z
    .string({ required_error: 'This field is required' })
    .max(200, 'About Company must be 200 words or less'),
  AdditionalAboutYouDetails: z.array(z.string()).optional(),
  Tags: z.array(z.string()).max(5, 'Enter up to 5 tags').optional(),
  profilePic: z.string(),
});

export const profileIndustrySelectionInfoSchema = z.object({
  CompanyName: z.string().min(2, 'Company Name is required'),
  Tagline: z.string().min(6, 'Tagline is required'),
  Youtubeurl: z
    .string()
    .url('Invalid Youtube URL')
    .optional()
    .or(z.literal('')),
  Facebookurl: z
    .string()
    .url('Invalid Facebook URL')
    .optional()
    .or(z.literal('')),
  Linkedinurl: z
    .string()
    .url('Invalid LinkedIn URL')
    .optional()
    .or(z.literal('')),
  Twitterurl: z
    .string()
    .url('Invalid Twitter URL')
    .optional()
    .or(z.literal('')),
  Instagramurl: z
    .string()
    .url('Invalid Instagram URL')
    .optional()
    .or(z.literal('')),
  AboutCompany: z.string().max(200, 'About Company must be 200 words or less'),
  Tags: z.array(z.string()).max(5, 'Enter up to 5 tags').optional(),
});

const AffiliationSchema = z.object({
  name: z.string().optional().nullable(),
});

const CertificationSchema = z.object({
  name: z.string().optional().nullable(),
  year: z
    .string()
    .optional()
    .nullable()
    .refine(
      (value) => {
        if (value === null || value === undefined || value.length < 1)
          return true;

        return /^\d{4}$/.test(value);
      },
      {
        message: 'Year must be a 4-digit number',
      }
    ),
});

const RecognitionSchema = z.object({
  name: z.string().optional().nullable(),
});

export const profileQualificationsInfoSchema = z.object({
  affiliations: z.array(AffiliationSchema).optional().nullable(),
  certifications: z.array(CertificationSchema).optional().nullable(),
  recognitions: z.array(RecognitionSchema).optional().nullable(),
});

const PercentageSchema = z.string().refine((val) => {
  const num = Number(val);
  return !isNaN(num) && num >= 0 && num <= 100;
}, 'Percentage must be a valid number between 0 and 100');

const ServiceSchema = z.object({
  name: z.string().min(1, 'Service/Product name is required'),
});

const IndustryServedSchema = z.object({
  name: z.string().min(1, 'Industry served is required'),
});

const LocationSchema = z.object({
  name: z.string().min(1, 'Location is required'),
});

const BusinessChannelPercentagesSchema = z
  .object({
    individuals: z.string().optional().nullable(),
    smallBusinesses: z.string().optional().nullable(),
    midmarketBusinesses: z.string().optional().nullable(),
    enterprise: z.string().optional().nullable(),
  })
  .refine(
    (data) => {
      const total = Object.values(data)
        .filter((val): val is string => val !== null && val !== undefined)
        .reduce((sum, val) => sum + Number(val), 0);
      return (
        total === 100 ||
        Object.values(data).every((val) => val === null || val === undefined)
      );
    },
    {
      message: 'Total percentage should be 100%',
    }
  );

export const profileSkillsChartsInfoSchema = z
  .object({
    services: z
      .array(ServiceSchema)
      .min(1, 'At least one service/product is required'),
    servicesPercentages: z.array(PercentageSchema),
    industryServed: z
      .array(IndustryServedSchema)
      .min(1, 'At least one industry served is required'),
    industryServedPercentages: z.array(PercentageSchema),
    locations: z
      .array(LocationSchema)
      .min(1, 'At least one location is required'),
    businessChannelPercentages: BusinessChannelPercentagesSchema,
  })
  .refine(
    (data) => {
      return (
        data.services.length === data.servicesPercentages.length &&
        data.servicesPercentages.reduce(
          (sum, percentage) => sum + Number(percentage),
          0
        ) === 100
      );
    },
    {
      message: 'Total percentage should be 100%',
      path: ['servicesPercentages'],
    }
  )
  .refine(
    (data) => {
      return (
        data.industryServed.length === data.industryServedPercentages.length &&
        data.industryServedPercentages.reduce(
          (sum, percentage) => sum + Number(percentage),
          0
        ) === 100
      );
    },
    {
      message: 'Total percentage should be 100%',
      path: ['industryServedPercentages'],
    }
  );

export const verificationOnlinePresenceSchema = z.object({
  WebsiteUrl: z.string().url('Website Url Is Required'),
  YoutubeUrl: z
    .string()
    .url('Invalid Youtube URL')
    .optional()
    .or(z.literal('')),
  FacebookUrl: z
    .string()
    .url('Invalid Facebook URL')
    .optional()
    .or(z.literal('')),
  LinkedinUrl: z
    .string()
    .url('Invalid LinkedIn URL')
    .optional()
    .or(z.literal('')),
  TwitterUrl: z
    .string()
    .url('Invalid Twitter URL')
    .optional()
    .or(z.literal('')),
  InstagramUrl: z
    .string()
    .url('Invalid Instagram URL')
    .optional()
    .or(z.literal('')),
});

export const personalIdentificationPresenceSchema = z.object({
  PersionalIdentificationURL: z
    .string()
    .url('Persional Identification Url Is Required'),
});

export const businessOpportunityModelSchema = z.object({
  BDId: z.number(),
  UserId: z.string(),
  BdType: z.string(),
  IndustryType: z.string(),
  IndustryList: z.array(z.string()),
  RegionId: z.number(),
  CityIds: z.array(
    z.object({
      CityId: z.number(),
    })
  ),
  CountryIds: z.array(z.number()),
  StrategyName: z.string(),
  RepresentativeName: z.string(),
  Name: z.string(),
  PhoneNumber: z.string(),
  Email: z.string(),
  OpportunityStructure: z.string(),
  timeLine: z.string(),
  Description: z.string(),
  TagsInput: z.string(),
  TacticsNames: z.array(
    z.object({
      TacticsName: z.string(),
    })
  ),
  IsFilled: z.boolean(),
});

export const bDFacilateModelSchema = z.object({
  UserId: z.string(),
  BDId: z.number(),
  MatchedId: z.number(),
  UserProfileId: z.number(),
});

export const bDOpportinutyMatchedModelSchema = z.object({
  BDOpportinutyId: z.number(),
  MatchedUserProfileId: z.number(),
  UserId: z.string(),
});

export const verficationStatementsSchema = z.object({
  Statements: z.string().max(250, 'Statements must be 200 words or less'),
});

export const businessOpportunitySchema = z.object({
  BDOpportunityType: z
    .string({ required_error: 'BDOpportunityType is required' })
    .min(1, 'BDOpportunityType is required'),
  LevelOneIndustry: z.string().min(1, 'Representative name is required'),
  IndustryList: z.array(z.string()),
  RegionId: z.number(),
  countryList: z
    .array(
      z.object({
        id: z.number(),
        value: z.string(),
      })
    )
    .optional(),
  stateList: z
    .array(
      z.object({
        id: z.number(),
        value: z.string(),
      })
    )
    .optional(),
  cityList: z
    .array(
      z.object({
        id: z.number(),
        value: z.string(),
      })
    )
    .optional(),

  strategy: z.string().min(1, 'Strategy name is required').default('MarketPenetration'),
  tactics: z
    .array(z.string({ required_error: 'Tactics are required' }), {
      required_error: 'Tactics are required',
    })
    .min(1, 'Tactics are required').default(["Merger"]),
  representativeName: z.string().min(1, 'Representative name is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  phone: z.string().optional(),
  email: z.string().email('Invalid email address'),
  structure: z
    .string({ required_error: 'Structure is required' })
    .min(1, 'Structure is required'),
  timeline: z.string({ required_error: 'Timeline is required' }).default('1-3 months'),
  tags: z
    .array(z.string({ required_error: 'Tags are required' }), {
      required_error: 'Tags are required',
    })
    .max(5, 'Maximum 5 tags allowed'),
  description: z.string().max(250, 'Maximum 250 words allowed'),
});

export const contractCreateSchema = z.object({
  Title: z.string().min(1, 'Contract Title is required'),
  Description: z.string().min(10, 'A Detailed Description is required'),
  Budget: z
    .number()
    .min(0)
    .max(25000, 'Budget of the Project should be between $0 to $25000'),
  ExpiryDate: z.string().date(),
  CounterPartyName: z.string().optional(),
});

export const createBusinessMemberOpportunitySchema = z
  .object({
    BusinessName: z.string().min(1, 'Business name is required'),
    YearsInBusiness: z
      .string()
      .min(1, 'Years in business is required')
      .transform((val) => parseInt(val, 10)) // Transform the input to a number
      .refine((val) => !isNaN(val) && val > 0, {
        message: 'Years in business must be a positive number',
      }),
    BusinessType: z.string().min(1, 'Business type is required'),
    BusinessLocation: z
      .array(
        z.object({
          id: z.string(),
          value: z.string(),
        })
      )
      .min(1, 'Select at least one location'),
    BusinessIndustry: z.string().min(1, 'Business industry is required'),
    BusinessWebsite: z.string().min(1, 'Business website is required').url('Invalid URL'),
    BusinessDescription: z.string().min(1, 'Business description is required'),
    ContactName: z.string().min(1, 'Contact name is required'),
    ContactEmail: z
      .string()
      .email('Invalid email address')
      .min(1, 'Contact email is required'),
    ContactPhone: z
      .string()
      .min(1, 'Contact phone is required')
      .regex(
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        'Invalid phone number'
      ),
    RoleSought: z.string().optional(),
    RoleDescription: z.string().optional().nullable(),
    PostDuration: z.string().min(1, 'Post duration is required'),
    InvestmentRequired: z.boolean().optional(),
    PreferredExperience: z.string().optional(),
    MatchType: z
      .number()
      .int()
      .min(0, 'Match type must be a non-negative integer'),
    PostTitle: z.string().optional(),
    DurationDescription: z.string().optional().nullable(),
    PreferredExperienceDescription: z.string().optional(),
    Tags: z.array(z.string()).max(5).optional().nullable(),
  })
// .superRefine((data, ctx) => {
//   if (data.MatchType === 1) {
//     if (data.InvestmentRequired === undefined) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message:
//           'Investment Required field is mandatory when Match Type is 1',
//         path: ['InvestmentRequired'],
//       });
//     }
//     if (!data.PostTitle) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: 'Post Title is required when Match Type is 1',
//         path: ['PostTitle'],
//       });
//     }
//     if (!data.PreferredExperience) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: 'Preferred Experience is required when Match Type is 1',
//         path: ['PreferredExperience'],
//       });
//     }
//     if (!data.PreferredExperienceDescription) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message:
//           'Preferred Experience Description is required when Match Type is 1',
//         path: ['PreferredExperienceDescription'],
//       });
//     }
//   }
// });

export const companyInformationSchema = z
  .object({
    CompanyLogo: z.string().min(1, 'Company logo is required'), // Required file input
    logo: z.any(),
    CompanyName: z.string().min(1, 'Company name is required'),
    CompanyWebsite: z.string().min(1, 'Company website is required'),
    CompanySlogan: z.string().min(1, 'Company slogan is required'),
    CompanyIndustry: z.string().min(1, 'Company industry is required'),
    CompanyType: z.string().min(1, 'Company type is required'),
    CompanyDescription: z.string().min(1, 'Company description is required'),
    IsStartUps: z.boolean(),
    DiscountDescription: z.string().min(1, 'Discount description is required'),
    DiscountActivation: z.string().min(1, 'Discount activation is required'),
    DiscountType: z.string().min(1, 'Discount type is required'),
    ActiveDiscount: z.string().min(1, 'Active discount is required'),
    ActivationEligibility: z.string().min(1, 'Activation eligiblity required'),
    ProposalDuration: z.number().min(1, 'Proposal duration is required'),
    NumberOfDiscount: z.number().min(1, 'Number of discount is required'),
    DiscountCode: z.any().refine(value => value instanceof File, {
      message: 'Discount code file is required',
    }),
    DiscountOff: z.number().min(1, 'Discount off is required')
  });

export const profileSchema = z.object({
  firstName: z.string().min(1, 'Enter your First Name'),
  lastName: z.string().min(1, 'Enter your Last Name'),
  email: z.string().min(1, 'Enter your Email').email('Email is Invalid'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(50, 'Password must not exceed 50 characters')
    .min(1, 'Password is required'),
  confirmPassword: z
    .string()
    .min(1, 'Confirm password is required')
  // .refine((val: string, ctx: z.ZodContext) => val === ctx.parent.password, {
  //   message: 'Passwords do not match',
  // })
});

export type SignupUserData = z.infer<typeof profileSchema>;



export type CreateBusinessMemberOpportunityData = z.infer<
  typeof createBusinessMemberOpportunitySchema
>;

export type CreateCompnayInformationData = z.infer<
  typeof companyInformationSchema
>;

export type SignupFormData = z.infer<typeof signupSchema>;

export type SigninFormData = z.infer<typeof signinSchema>;

export type ProfileBasicFormData = z.infer<typeof profileBasicInfoSchema>;
export type ProfileSkillFormData = z.infer<typeof profileSkillFormSchema>;

export type ProfileExpertBasicFormData = z.infer<
  typeof profileExpertBasicInfoSchema
>;

export type ProfileQualificationsInfoSchema = z.infer<
  typeof profileQualificationsInfoSchema
>;

export type ProfileSkillsChartsInfoSchema = z.infer<
  typeof profileSkillsChartsInfoSchema
>;

export type VerificationOnlinePresenceData = z.infer<
  typeof verificationOnlinePresenceSchema
>;

export type PersonalIdentificationData = z.infer<
  typeof personalIdentificationPresenceSchema
>;

export type VerficationStatementsData = z.infer<
  typeof verficationStatementsSchema
>;

export type BusinessOpportunitiesData = z.infer<
  typeof businessOpportunitySchema
>;

export type BDFacilateData = z.infer<typeof bDFacilateModelSchema>;

export type BDOpportinutyMatchedData = z.infer<
  typeof bDOpportinutyMatchedModelSchema
>;

export type ContractCreateData = z.infer<typeof contractCreateSchema>;

export type ProfileBusinessFormData = z.infer<typeof profileBusinessInfoSchema>;

export type PaymentSchemaFormData = z.infer<typeof paymentSchema>;
