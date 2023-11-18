import React, {useState, useEffect, useContext} from 'react';
import { Box, TextField  } from '@mui/material';
import { Logo } from '../Atoms/Logo';
import { LoginButton } from '../Atoms/Button/LoginButton'; 
import { SearchType } from '@/types/Search';
import { TokenContext } from '@/contexts/TtokenContext';
import { SearchContext } from '@/contexts/SearchContext';
import { getResultObject } from '@/app/api/getResultResponse';

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
  const [searchInput, setSearchInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  // #endregion

  // #region React Event -----------------------
  
  // #endregion


  // #region Screen Event -----------------------
  // #endregion

  // #region Logic -----------------------
  const fetchSearchResults = async () => {
    if (!platformToken) return;
    const searchParams: SearchType = {
      keyword: searchInput,
      platformUID: platformToken.UID,
      platformToken: platformToken.Token
    };

    try {
      const results = await getResultObject(searchParams);
      console.log(results);
      setResultObject(results)
    } catch (error) {
      console.error('検索中にエラーが発生しました', error);
    }
  };
  // #endregion

  // #region View -----------------------
  return (
    <Box 
      component="form"
      sx={{ 
        p: 2, 
        paddingLeft: '0px', 
        paddingRight: '0px', 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center'
      }}
      autoComplete="off"
      id="header"
    >
      <Logo />
      <TextField 
        id="search-form" 
        label="番組タイトル・出演者で検索" 
        variant="standard" 
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !isComposing) {
            e.preventDefault();
            fetchSearchResults();
          }
        }}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        style={{ 
          width: '80%'
        }}
      />
      
      <LoginButton style={{
        width: '104px',
        height: '44px',
        lineHeight: '44px',
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight: '700',
        background: '#21abe6',
        color: '#fff',
        whiteSpace: 'nowrap',
        marginLeft: '5px',
      }} />
    </Box>
  );
  // #endregion

};
// #endregion