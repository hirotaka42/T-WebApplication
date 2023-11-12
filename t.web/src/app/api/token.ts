import axios, { AxiosResponse } from 'axios';
import qs from 'qs';

export const getToken = async () => {
  const tverTokenURL = process.env.NEXT_PUBLIC_TVER_TOKEN_API;
  if (!tverTokenURL) {
    throw new Error("TVER_TOKEN_URL is not defined");
  }
  const requestBody = qs.stringify({device_type: 'pc'});  // URLエンコード

  try {
    const tokenResponse: AxiosResponse = await axios.post(tverTokenURL, requestBody, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      timeout: 5000,
    });
    console.log(tokenResponse.data)
    const platformUID = tokenResponse.data.result.platform_uid;
    const platformToken = tokenResponse.data.result.platform_token;

    return { platformUID, platformToken };
  } catch (error) {
    console.warn('Failed to get token, exiting');
    console.error(error);
    
    throw error;
  }
};