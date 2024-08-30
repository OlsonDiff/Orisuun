import * as yup from 'yup';
import { z } from 'zod';

export const profileSchema = yup.object({
  firstName: yup.string().required('Enter your First Name'),
  lastName: yup.string().required('Enter your Last Name'),
  email: yup.string().required('Enter your Email').email('Email is Invalid'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(50, 'Password must not exceed 50 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Password does not match'),
});

// export const profileSchema = yup.object().shape({
//   firstName: yup.string().required('First Name is required'),
//   lastName: yup.string().required('Last Name is required'),
//   email: yup.string().email('Invalid email').required('Email is required'),
//   password: yup.string().required('Password is required'),
//   profileType: yup.string().required('Profile type is required'),
// });


export const detailsSchema = yup.object({
  firstName: yup.string().required('Enter your First Name'),
  lastName: yup.string().required('Enter your Last Name'),
  email: yup.string().required('Enter your Email').email('Email is Invalid'),
  city: yup.string().required('Enter your City'),
  // amount: yup
  //   .number()
  //   .typeError('Amount must be a valid number')
  //   .positive('Amount must be positive')
});

export const methodSchema = yup.object({
  email: yup.string().required('Enter your Email').email('Email is Invalid'),
  subscriptionKey: yup.string().required('Enter your Subscription Key'),
});

export const cardSchema = yup.object().shape({
  nameOnCard: yup.string().required('Name on Card is required'),
  cardNumber: yup
    .string()
    .required('Card Number is required')
    .matches(/^\d{16}$/, 'Card Number must be 16 digits'),
  expiry: yup
    .string()
    .required('Expiry is required')
    .matches(
      /^(0[1-9]|1[0-2])\/?([0-9]{2}|[0-9]{4})$/,
      'Expiry date is not valid (MM/YY or MM/YYYY)'
    ),
  cvc: yup
    .string()
    .required('CVC is required')
    .matches(/^\d{3,4}$/, 'CVC must be 3 or 4 digits'),
});

export const bankSchema = yup.object().shape({
  nameOnAccount: yup.string().required('Name on Account is required'),
  routingNumber: yup
    .string()
    .required('ACH Routing Number is required')
    .matches(/^\d{9}$/, 'Routing Number must be 9 digits'),
  accountNumber: yup
    .string()
    .required('Account Number is required')
    .matches(/^\d{8,12}$/, 'Account Number must be between 8 and 12 digits'),
  confirmAccountNumber: yup
    .string()
    .required('Confirm Account Number is required')
    .oneOf([yup.ref('accountNumber')], 'Account numbers must match'),
});
