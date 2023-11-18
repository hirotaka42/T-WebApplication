import React, { useEffect, useContext } from 'react';
import { SearchBar } from '@/components/Molecules/SearchBar';
import { TokenContext } from '@/contexts/TtokenContext';
import { SearchContext } from '@/contexts/SearchContext';


export const Header = () => {
  /* TokenContext */
  const tokenContext = useContext(TokenContext);
  if (!tokenContext) throw new Error('tokenContext not found.');
  const { platformToken ,setPlatformToken } = tokenContext;
  /* SearchContext */
  const searchContext = useContext(SearchContext);
  if (!searchContext) throw new Error('searchContext not found.');
  const { resultObject ,setResultObject, keyword, setKeyword } = searchContext;
  
  return(
  <>
    <SearchBar />
  </>
)};