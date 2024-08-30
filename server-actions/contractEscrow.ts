'use server';

import axios from 'axios';

const apiEndpoint = process.env.NEXT_PUBLIC_APP_BASE_URL 
? `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api`
: "https://api.orisuun.com/api";

export async function createConnectAccount(userId: string) {
  try {
    let userData = {
      UserId: userId,
    };
    const response = await axios.post(
      `${apiEndpoint}/Escrow/CreateConnectAccount`,
      userData,
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
      message: ' Data Fetched  !',
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

export async function createContract(data: any) {
  try {
    const response = await axios.post(
      `${apiEndpoint}/Escrow/CreateContractOffer`,
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
      message: ' Contract Created   !',
      data: response.data.Result,
    };
  } catch (error: any) {
    console.error(error.response.data.errors, "error");
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
    console.error(error.response.data.errors, "error");
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
