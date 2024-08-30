'use server';

import axios from 'axios';

const apiEndpoint = process.env.NEXT_PUBLIC_APP_BASE_URL
  ? `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api`
  : 'https://api.orisuun.com/api';

export async function getRegionListAction() {
  try {
    const response = await axios.get(
      `${apiEndpoint}/Explore/GetRegionList`,
      {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
      }
    );

    return {
      success: true,
      message: ' Region List Saved!',
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

export async function getAllSubIndustires() {
  try {
    const response = await axios.get(
      `${apiEndpoint}/Profile/GetAllSubIndustryList`,
      {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
      }
    );

    return {
      success: true,
      message: 'Industry List fetched!',
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

export async function createNewBusinessOpportunity(data: any) {
  try {
    const response = await axios.post(
      `${apiEndpoint}/BusinessOpportunity/CreateBusinessOpportunityV1`,
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
      message: ' Region List Saved!',
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

export async function getBusinessOppurtuniyDetailsById(data: any) {
  try {
    console.log('DSVLDFNLDFJNDLFJJNDFLJVNFLJDN');
    const response = await axios.post(
      `${apiEndpoint}/BusinessOpportunity/GetOverViewOfBdDetails`,
      data,
      {
        headers: {
          XApiKey:
            'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
        },
      }
    );

    console.log(response.data.Result, 'error');

    return {
      success: true,
      message: 'BusinessOpportunity Fetched',
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

export async function getBusinessOpportunitySeekingList(data: any) {
  try {
    const response = await axios.post(
      `${apiEndpoint}/BusinessOpportunity/GetBDSeekingList`,
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
      message: 'Data Fetched Successfully!',
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

export async function getBusinessOpportunityFacilitateList(data: any) {
  try {
    const response = await axios.post(
      `${apiEndpoint}/BusinessOpportunity/GetBDFacilateList`,
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
      message: 'Data Fetched Successfully!',

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
