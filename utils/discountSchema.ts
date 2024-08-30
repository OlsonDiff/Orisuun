import { z } from 'zod';

export const companyInformationSchema = z.object({
    CompanyLogo: z.string().min(1, 'Company Logo is required'),
    logo: z.any(),
    CompanyName: z.string().min(1, 'Company Name is required'),
    CompanyWebsite: z.string().url('Enter a valid website URL'),
    CompanySlogan: z.string().min(1, 'Company Slogan is required'),
    CompanyIndustry: z.string().min(1, 'Industry is required'),
    CompanyType: z.string().min(1, 'Company Type is required'),
    CompanyDescription: z.string().min(10, 'Description must be at least 10 characters long'),
});

const discountInformationSchema = z.object({
    DiscountDescription: z.string().min(1, 'Discount Description is required'),
    DiscountActivation: z.string().min(1, 'Discount Activation is required'),
    DiscountType: z.string().min(1, 'Discount type is required'),
    ActiveDiscount: z.string().min(1, 'Active Discount is required'),
    ProposalDuration: z.string().min(1, 'Proposal Duration is required'),
    IsStartUps: z.boolean()
});

const expirySchema = z.object({
    ExpiryDate: z.string().min(1, 'Expiry Date is required'),
});

const noOfDiscountsSchema = z.object({
    NumberOfDiscount: z.union([
        z.string().refine(val => !isNaN(Number(val)), {
            message: 'Enter a valid number',
        }),
        z.literal('Custom'),
    ]).refine(val => val !== '', {
        message: 'Number of Discounts is required',
    }),
    DiscountCode: z.any().refine(value => value instanceof File, {
        message: 'Discount code file is required',
    }),
});


// Combine schemas for each step
export const stepSchemas = [
    companyInformationSchema,
    discountInformationSchema,
    expirySchema,
    noOfDiscountsSchema,
];
