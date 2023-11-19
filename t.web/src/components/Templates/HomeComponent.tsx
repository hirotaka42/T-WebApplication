import React, { useState, useEffect, useRef } from 'react';
import { getToken } from '@/app/api/sessionResponse';
import { Box, Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ScrollPosition } from 'react-lazy-load-image-component';
import { Header } from '@/components/Organisms/Header';
import Footer from '@/components/Organisms/Footer';
import { TokenContext } from '@/contexts/TtokenContext'
import { SearchContext } from '@/contexts/SearchContext'
import { PageContext } from '@/contexts/PageContext'
import { ContentObject } from '@/types/ContentObject';
import { platformToken } from '@/types/token';

interface HomeProps {
  scrollPosition: ScrollPosition;
}

export default function HomeComponent({ scrollPosition}: HomeProps) {
  // #region Variable -----------------------
  // #endregion
  
  // #region State -----------------------
  const [footerSelectValue, setFooterSelectValue] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [platformToken, setPlatformToken] = useState<platformToken | null>(null);
  const [keyword, setKeyword] = useState("");
  const [resultObject, setResultObject] = useState<ContentObject[] | null>(null);
  
  // #endregion

  // #region React Event -----------------------
  useEffect(() => {
    const fetchData = async () => {
      setPlatformToken(await getToken());
    };
    fetchData();
  }, []);
  // #endregion


  // #region Screen Event -----------------------
  const focusSearchForm = () => {
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
      setSearchInput('')
      searchForm.focus();
    }
  };
  // #endregion

  // #region Logic -----------------------
  // #endregion

  return (
    <>
    <PageContext.Provider value={{footerSelectValue, setFooterSelectValue, searchInput, setSearchInput}}>
      <TokenContext.Provider value={{platformToken, setPlatformToken}}>
        <SearchContext.Provider value={{resultObject, setResultObject, keyword, setKeyword}}>
          <Box>
            <Box sx={{ position: 'fixed', top: 0, width: '100%', height: '10vh' }}> {/* Headerを上部に固定 */}
              <Header />
            </Box>
            <Box
              sx={{ 
                flexGrow: 1, 
                bgcolor: "background.default", 
                height: '90vh',
              }}>

              <Box component="main">
                <Fab color="primary" aria-label="focus-search-form" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={focusSearchForm}>
                  <KeyboardArrowUpIcon />
                </Fab>
              </Box>
              <Footer />
            </Box>
          </Box>
        </SearchContext.Provider>
      </TokenContext.Provider>
    </PageContext.Provider>
    
    </>
  );
}