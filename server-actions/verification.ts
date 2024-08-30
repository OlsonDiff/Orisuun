import axios from 'axios';

const apiEndpoint = process.env.NEXT_PUBLIC_APP_BASE_URL
  ? `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api`
  : "https://api.orisuun.com/api";
export const checkUserVerificationStatus = async (data: any) => {
  try {
    let userData = {
      UserId: data.Id,
    };

    const response = await axios.post(
      `${apiEndpoint}/UserVerification/CheckUserVerificationProcess`,
      userData,
      {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
      }
    );

    console.log(response, 'User Verification ');

    return {
      success: true,
      message: response.data.Message,
      data: response,
    };
  } catch (error: any) {
    console.error('Verification error:', error);
    return {
      success: false,
      message: error.response.data.Message,
      data: error.response.data.Result,
    };
  }
};

export const getVerificationPaymentIntent = async (data: any) => {
  try {
    let userData = {
      UserId: data.Id,
    };
    const response = await axios.post(
      `${apiEndpoint}/UserVerification/GetVerificationPaymentIntent`,
      userData,
      {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
      }
    );

    console.log(response, 'User Verification ');
    return {
      success: true,
      message: response.data.Message,
      data: response.data.Result,
    };
  } catch (error: any) {
    console.error('Verification error:', error);
    return {
      success: false,
      message: error.response.data.Message,
      data: error.response.data.Result,
    };
  }
};


export async function generateUploadFileSasTokenData() {
  try {
    const response = await axios.get(
      `https://api.orisuun.com/api/UserVerification/GenerateUploadFileSasToken`,
      {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
      }
    );

    console.log(response, "response")
    return response.data.Result;
  } catch (error) {
    console.error('Axios error:', error);
    return [];
  }
}


export const addVerificationDocuments = async (data: any) => {
  try {
    const response = await axios.post(
      `${apiEndpoint}/UserVerification/AddVerificationDocuments`,
      data,
      {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
      }
    );

    console.log(response, 'User Verification ');
    return {
      success: true,
      message: response.data.Message,
      data: response.data.Result,
    };
  } catch (error: any) {
    console.error('Verification error:', error);
    return {
      success: false,
      message: error.response.data.Message,
      data: error.response.data.Result,
    };
  }
};


export const addVerificationDetails = async (data: any) => {
  try {
    const response = await axios.post(
      `${apiEndpoint}/UserVerification/AddVerificationDetails`,
      data,
      {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
      }
    );

    console.log(response, 'User Verification ');
    return {
      success: true,
      message: response.data.Message,
      data: response.data.Result,
    };
  } catch (error: any) {
    console.error('Verification error:', error);
    return {
      success: false,
      message: error.response.data.Message,
      data: error.response.data.Result,
    };
  }
};
