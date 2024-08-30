'use server';

import axios from 'axios';

const apiEndpoint = process.env.NEXT_PUBLIC_APP_BASE_URL
  ? `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api`
  : 'https://api.orisuun.com/api';

export async function createBWFSubscription(data: any) {
  try {
    const requestData = {
      FirstName: data.firstName,
      LastName: data.lastName,
      City: data.city,
      Email: data.email,
      Amount: data.amount,
    };
    const response = await axios.post(
      `${apiEndpoint}/Marketing/CreateBwfSubscription`,
      requestData,
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
      message: ' BWF Data Fetched  !',
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

export async function CancelBWFSubscription(data: any) {
  try {
    const response = await axios.post(
      `${apiEndpoint}/Marketing/CancelBwfSubscription`,
      data,
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
      message: 'Your Monthly Donations are cancelled',
      data: response.data.Result,
    };
  } catch (error: any) {
    console.error(error.response.data.errors, 'error');
    return {
      success: false,
      message: 'An Error Occured',
      data: error,
    };
  }
}

export async function getAllContractsbyUser(data: any) {
  try {
    const response = await axios.post(
      `${apiEndpoint}/Escrow/GetAllContractByUser`,
      data,
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
      message: response.data.Message,
      data: response.data.Result,
    };
  } catch (error: any) {
    console.error(error.response.data.errors, 'error');
    return {
      success: false,
      message: 'An Error Occured',
      data: error,
    };
  }
}

export async function getCityandCountryListAction(regionId: number) {
  try {
    const response = await axios.get(
      `${apiEndpoint}/BusinessOpportunity/GetCountryListByRegionId/${regionId}`,
      {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
      }
    );

    console.log(regionId, response, 'City');

    return {
      success: true,
      message: ' City country List fetched!',
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

export async function getSearchLocations(term: string) {
  try {
    const response = await axios.get(
      `${apiEndpoint}/BusinessOpportunity/SearchLocations/${term}`,
      {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
      }
    );

    console.log(response, 'City');

    return {
      success: true,
      message: ' City country List fetched!',
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
