import { SignupFormData, signupSchema } from '@/utils/schema';
import axios from 'axios';

const apiEndpoint = process.env.NEXT_PUBLIC_APP_BASE_URL
  ? `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api`
  : 'https://api.orisuun.com/api';

export async function signupAction(formData: SignupFormData) {
  const result = signupSchema.safeParse(formData);

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  let signupdata = {
    FirstName: result.data.firstName,
    LastName: result.data.lastName,
    Email: result.data.email,
    Password: result.data.password,
    PrivacyCheck: result.data.agreeTerms,
    UserSubscriptionPlanId: result.data.billingFrequency,
  };

  try {
    const response: any = await axios.post(
      `${apiEndpoint}/User/RegisterUser`,
      signupdata,
      {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
      }
    );

    return {
      success: response.data.Message === 'User created successfully',
      message: response.data.Message,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: 'An unexpected error occurred',
      errors: error,
    };
  }
}

export async function getUserProfileType() {
  try {
    const response = await axios.get(
      `${apiEndpoint}/Profile/UserProfileTypes`,
      {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
      }
    );
    return response.data.Result;
  } catch (error) {
    console.error('Axios error:', error);
    return [];
  }
}

export async function getSubscriptionPlanBasedOnProfileType(
  profileType: number
) {
  try {
    const response = await axios.get(
      `${apiEndpoint}/User/SubscriptionPlanBasedOnProfileType`,
      {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
        params: {
          profileType: profileType, // Add your query parameter here
        },
      }
    );
    return response.data.Result;
  } catch (error) {
    console.error('Axios error:', error);
    return [];
  }
}
