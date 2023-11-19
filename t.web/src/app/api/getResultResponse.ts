import axios, { AxiosResponse } from 'axios';
import { SearchType } from '@/types/Search'

// 検索結果のobjectを返却
export const getResultObject = async ( Search: SearchType ) => {
  const tverSearchBaseURL = process.env.NEXT_PUBLIC_TVER_SEARCH_API;
  if (!tverSearchBaseURL) {
    throw new Error("SEARCH_API is not defined");
  }
  const tverSearchURL = `${tverSearchBaseURL}?platform_uid=${Search.platformUID}&platform_token=${Search.platformToken}&keyword=${Search.keyword}`;

  try {
    const searchResultsRaw: AxiosResponse = await axios.get(tverSearchURL, {
      headers: {
        'x-tver-platform-type': 'web',
      },
      timeout: 3000,
    });
    console.log(searchResultsRaw.data);
    const searchResults = searchResultsRaw.data.result.contents;
    return searchResults;  
  } catch (error) {
    console.error(`Failed to get links from free keyword: ${error}`);
    throw error;  
  }
};