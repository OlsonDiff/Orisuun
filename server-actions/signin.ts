import { SigninFormData, signinSchema } from '@/utils/schema';
import axios from 'axios';

const apiEndpoint = process.env.NEXT_PUBLIC_APP_BASE_URL
  ? `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api`
  : 'https://api.orisuun.com/api';

export const signinAction = async (formData: SigninFormData) => {
  try {
    const result = signinSchema.safeParse(formData);

    if (!result.success) {
      return { success: false, errors: result.error.flatten().fieldErrors };
    }
    let signindata = {
      Username: result.data.email,
      Password: result.data.password,
      RememberPassword: true,
    };
    const response = await axios.post(`${apiEndpoint}/User/Login`, signindata, {
      headers: {
        XApiKey:
          'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
      },
    });

    localStorage.setItem('accessToken', response.data.Result.Token);
    localStorage.setItem('RefereshToken', response.data.Result.RefereshToken);
    return {
      success: true,
      message: 'Signup successful!',
      data: response.data,
    };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, errors: error };
  }
};
