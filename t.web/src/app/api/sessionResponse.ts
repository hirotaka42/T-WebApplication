import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import { platformToken } from '@/types/token'

export const getToken = async () => {
  const getTokenURL = process.env.NEXT_PUBLIC_TVER_TOKEN_API;
  if (!getTokenURL) throw new Error("TOKEN_URL is not defined");
  const requestBody = qs.stringify({device_type: 'pc'});  // URLエンコード

  try {
    const sessionResponse: AxiosResponse = await axios.post(getTokenURL, requestBody, {
      headers: {
        'Origin': 'https://s.tver.jp',
        'Referer': 'https://s.tver.jp/',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      timeout: 500,
    });
    console.log(sessionResponse.data)
    const UID = sessionResponse.data.result.platform_uid;
    const Token = sessionResponse.data.result.platform_token;
    const resultToken: platformToken = { UID,Token };
    return resultToken;
  } catch (error) {
    console.warn('Failed to get token, exiting');
    console.error(error);
    throw error;
  }
};