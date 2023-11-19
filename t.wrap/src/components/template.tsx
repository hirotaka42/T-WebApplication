import React, {useState, useEffect, useContext} from 'react';
import { TokenContext } from '@/contexts/TtokenContext';
import { SearchContext } from '@/contexts/SearchContext';

// #region style -----------------------
// #endregion

// #region type -----------------------
// #endregion


// #region Client Side -----------------------
export const SearchBar = ({}) => {
  // #region Variable -----------------------
  /* TokenContext */
  const tokenContext = useContext(TokenContext);
  if (!tokenContext) throw new Error('tokenContext not found.');
  const { platformToken ,setPlatformToken } = tokenContext;
  /* SearchContext */
  const searchContext = useContext(SearchContext);
  if (!searchContext) throw new Error('searchContext not found.');
  const { resultObject ,setResultObject, keyword, setKeyword } = searchContext;
  // #endregion
  
  // #region State -----------------------
  const [isComposing, setIsComposing] = useState(false);
  // #endregion

  // #region React Event -----------------------
  // #endregion


  // #region Screen Event -----------------------
  // #endregion

  // #region Logic -----------------------
  // #endregion

  // #region View -----------------------
  return (
    <h1>Hello</h1>
  );
  // #endregion

};
// #endregion