'use server';

import axios from 'axios';

const apiEndpoint = process.env.NEXT_PUBLIC_APP_BASE_URL
  ? `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api`
  : 'https://api.orisuun.com/api';


console.log("url  ", process.env.NEXT_PUBLIC_APP_BASE_URL, apiEndpoint);


export async function createBusinessMemberOpportunityAction(data: any) {
  try {
    console.log("innnn kkk");

    const response = await axios.post(
      `${apiEndpoint}/BusinessMember/CreateBusinessMemberOpportunity`,
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
      message: 'Business Member Saved!',
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
