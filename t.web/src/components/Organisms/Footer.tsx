import React, { useContext } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { AppBar, Tabs, Tab, Box } from '@mui/material';
import { CardElement } from '@/components/Molecules/CardElement';
import { TokenContext } from '@/contexts/TtokenContext';
import { SearchContext } from '@/contexts/SearchContext';
import { PageContext } from '@/contexts/PageContext';
import { SearchType } from '@/types/Search';
import { getResultObject } from '@/app/api/getResultResponse';

const Footer = () => {
  // #region Valiable -----------------------
  const theme = useTheme();
  const tokenContext = useContext(TokenContext);
  if (!tokenContext) throw new Error('tokenContext not found.');
  const { platformToken, setPlatformToken } = tokenContext;

  const searchContext = useContext(SearchContext);
  if (!searchContext) throw new Error('searchContext not found.');
  const { resultObject, setResultObject } = searchContext;

  const pageContext = useContext(PageContext);
  if (!pageContext) throw new Error('pageContext not found.');
  const { footerSelectValue, setFooterSelectValue } = pageContext;
  // #endregion
  
  // #region State -----------------------
  // #endregion

  // #region React Event -----------------------
  // #endregion


  // #region Screen Event -----------------------
  // #endregion

  // #region Logic -----------------------
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setFooterSelectValue(newValue);
    handleTabChange(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setFooterSelectValue(index);
    handleTabChange(index);
  };

  const handleTabChange = async (value: number) => {
    const fetchSearchResults = async (keyword: string) => {
      if (!platformToken) return;
      const searchParams: SearchType = {
        keyword: keyword,
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

    let newKeyword = '';
    if (value === 1) {
      newKeyword = 'アニメ';
    } else if (value === 2) {
      newKeyword = 'ドラマ';
    }
    
    if (!newKeyword) {
      console.log('keyword is Not');
      return;
    }
    await fetchSearchResults(newKeyword);
  };


  // #endregion

  // #region View -----------------------
  return (
    <>
      <Box sx={{ bgcolor: 'background.paper', width: '100%', position: 'fixed', bottom: 0, height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={footerSelectValue}
          onChangeIndex={handleChangeIndex}
          style={{ marginTop: '0', height: '90%' }}
        >
          {[0, 1, 2].map(tabIndex => (
            <Box
              key={tabIndex}
              sx={{ p: 2, overflow: 'auto', maxHeight: '100%', display: 'flex', flexWrap: 'wrap' }}
            >
              {resultObject ? resultObject.map((object, index) => (
                <Box mb={2} key={index} >
                  <CardElement object={object} />
                </Box>
              )) : []}
            </Box>
          ))}
        </SwipeableViews>
        <AppBar position="static" color="default">
          <Tabs
            value={footerSelectValue}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="footer tabs"
          >
            <Tab label="All Results" />
            <Tab label="Anime" />
            <Tab label="Drama" />
          </Tabs>
        </AppBar>
      </Box>
    </>
  );
}

export default Footer;
