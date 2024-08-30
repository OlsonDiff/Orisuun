import { z } from "zod";

export const BussinessDetailsSchema = z.object({
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
    BusinessWebsite: z.string().min(1, 'Business website is required'),
    BusinessDescription: z.string().min(1, 'Business description is required'),
})

export const contactSchema = z.object({
    ContactName: z.string().min(1, 'Contact name is required'),
    ContactEmail: z
        .string()
        .email('Invalid email address')
        .min(1, 'Contact email is required'),
    ContactPhone: z.string().min(1, 'Contact phone is required'),
})

export const roleSchema = z.object({
    RoleSought: z.string().min(1, 'Role sought is required'),
    RoleDescription: z.string().optional().nullable(),
})
export const postSchema = z.object({
    PostDuration: z.string().min(1, 'Post duration is required'),
})

export const stepCoFounderSchemas = [
    BussinessDetailsSchema,
    contactSchema,
    roleSchema,
    postSchema,
];

