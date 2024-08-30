'use server';

import axios from 'axios';

const apiEndpoint = process.env.NEXT_PUBLIC_APP_BASE_URL
  ? `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api`
  : 'https://api.orisuun.com/api';

export async function addBasicDetailsAction(data: any) {
  try {
    const response = await axios.post(
      `${apiEndpoint}/MyProfile/CreateBusinessBasicProfileDetails`,
      data,
      {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
      }
    );

    return {
      success: true,
      message: 'Basic Details Saved!',
      data: response.data.Result,
    };
  } catch (error) {
    console.error('Axios error:', error);
    return {
      success: false,
      message: 'An Error Occured',
    };
  }
}

export async function addIndividualBasicDetailsAction(data: any) {
  try {
    const response = await axios.post(
      `${apiEndpoint}/MyProfile/CreateIndividualProfileDetails`,
      data,
      {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
      }
    );

    return {
      success: true,
      message: 'Basic Details Saved!',
      data: response.data.Result,
    };
  } catch (error) {
    console.error('Axios error:', error);
    return {
      success: false,
      message: 'An Error Occured',
    };
  }
}

export async function addBusinessDetailsAction(data: any) {
  try {
    const response = await axios.post(
      `${apiEndpoint}/MyProfile/CreateBusinessAddtionalProfileDetails`,
      data,
      {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
      }
    );

    console.log(response);
    return {
      success: true,
      message: 'Business Details Saved!',
      data: response.data.Result,
    };
  } catch (error) {
    console.error('Axios error:', error);
    return {
      success: false,
      message: 'An Error Occured',
    };
  }
}

export async function addQualificationsDetailsAction(data: any) {
  try {
    const response = await axios.post(
      `${apiEndpoint}/MyProfile/CreateUserBusinessIndividualQualification`,
      data,
      {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
      }
    );

    console.log(response);
    return {
      success: true,
      message: 'Business Details Saved!',
      data: response.data.Result,
    };
  } catch (error) {
    console.error('Axios error:', error);
    return {
      success: false,
      message: 'An Error Occured',
    };
  }
}

export async function addChartsDetailsAction(data: any) {
  try {
    const response = await axios.post(
      `${apiEndpoint}/MyProfile/CreateUserBusinessIndividualCharts`, // add charts api
      data,
      {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
      }
    );

    console.log(response);
    return {
      success: true,
      message: response.data.Message,
      data: response.data.Result,
    };
  } catch (error) {
    console.error('Axios error:', error);
    return {
      success: false,
      message: 'An Error Occured',
    };
  }
}

export async function addSkillsDetailsAction(data: any) {
  try {
    const response = await axios.post(
      `${apiEndpoint}/MyProfile/CreateIndividualSkillsAndCapabilities`,
      data,
      {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
      }
    );

    console.log(response);
    return {
      success: true,
      message: response.data.Message,
      data: response.data.Result,
    };
  } catch (error) {
    console.error('Axios error:', error);
    return {
      success: false,
      message: 'An Error Occured',
    };
  }
}

export async function createBusinessIndividualIndustriesAssociated(data: any) {
  try {
    const response = await axios.post(
      `${apiEndpoint}/MyProfile/CreateBusinessIndividualIndustriesAssociated`,
      data,
      {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
      }
    );

    console.log(response);
    return {
      success: true,
      message: response.data.Message,
      data: response.data.Result,
    };
  } catch (error) {
    console.error('Axios error:', error);
    return {
      success: false,
      message: 'An Error Occured',
    };
  }
}

export async function addIndustryDetailsAction(data: any) {
  try {
    const response = await axios.post(
      `${apiEndpoint}/MyProfile/CreateQualificationsInformationProfile`, // add industry
      data,
      {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
      }
    );

    console.log(response);
    return {
      success: true,
      message: response.data.Message,
      data: response.data.Result,
    };
  } catch (error) {
    console.error('Axios error:', error);
    return {
      success: false,
      message: 'An Error Occured',
    };
  }
}

export async function getLoggedInUserDataAction(accessToken: any) {
  try {
    const response = await axios.get(
      `${apiEndpoint}/User/GetLoggedInUserDetails`,
      {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // console.log(response, 'responsre');

    return {
      success: true,
      message: response.data.Message,
      data: response.data.Result,
    };
  } catch (error) {
    console.error('Axios error:', error);
    return {
      success: false,
      message: 'An Error Occured',
    };
  }
}

export async function getAllProfilesListOfUser(userId: string) {
  try {
    const response = await axios.get(
      `${apiEndpoint}/MyProfile/GetAllProfilesListOfUser/${userId}`,
      {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
      }
    );
    console.log(response, 'response');
    return {
      success: true,
      message: 'Profiles Fetched!',
      data: response.data.Result,
    };
  } catch (error) {
    console.error('Axios error:', error);
    return {
      success: false,
      message: 'An Error Occured',
    };
  }
}
