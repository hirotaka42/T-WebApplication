import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import { platformToken } from '@/types/token'

export const getToken = async () => {
  const getTokenURL = process.env.NEXT_PUBLIC_TVER_TOKEN_API;
  if (!getTokenURL) throw new Error("TOKEN_URL is not defined");
  const requestBody = qs.stringify({device_type: 'pc'});  // URLエンコード

  try {
    const tokenResponse: AxiosResponse = await axios.post(getTokenURL, requestBody, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      timeout: 3000,
    });
    console.log(tokenResponse.data)
    const UID = tokenResponse.data.result.platform_uid;
    const Token = tokenResponse.data.result.platform_token;
    const resultToken: platformToken = { UID,Token };
    return resultToken;
  } catch (error) {
    console.warn('Failed to get token, exiting');
    console.error(error);
    throw error;
  }
};