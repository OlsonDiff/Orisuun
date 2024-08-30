import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import CryptoJS from 'crypto-js';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  if (process.env.NODE_ENV === 'development') {
    return `${process.env.NEXT_PUBLIC_APP_BASE_URL}${path}`;
  } else {
    return `${process.env.APP_BASE_URL}${path}`;
  }
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

// This should be a long, random string. Store it securely and never expose it.
const SECRET_KEY =
  process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'default-secret-key';

export const encryptData = (data: string): string => {
  const encrypted = CryptoJS.AES.encrypt(data, SECRET_KEY);
  return encrypted.toString();
};

export const decryptData = (encryptedData: string): string => {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return decrypted.toString(CryptoJS.enc.Utf8);
};

export const encryptObjectToQueryParams = (
  obj: Record<string, string>
): string => {
  const jsonString = JSON.stringify(obj);
  const encrypted = encryptData(jsonString);
  return encodeURIComponent(encrypted);
};

export const decryptQueryParamsToObject = (
  queryString: string
): Record<string, string> => {
  const decrypted = decryptData(decodeURIComponent(queryString));
  return JSON.parse(decrypted);
};

export const capitalizeWords = (str: string): string => {
  return str
    ?.split(' ')
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    ?.join(' ');
};

export const getProfileTypeCategory = (
  profileType:
    | 'Experts'
    | 'Management Consultants'
    | 'Advocates'
    | 'Professionals'
    | 'Mentors'
    | 'Black-owned Businesses'
    | 'Partners'
    | 'Investors'
) => {
  const businessTypes = new Set([
    'Black-owned Businesses',
    'Partners',
    'Investors',
  ]);

  return businessTypes.has(profileType) ? 'Business' : 'Individual';
};

export const apiEndpoint = process.env.NEXT_PUBLIC_APP_BASE_URL
  ? `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api`
  : 'https://api.orisuun.com/api';