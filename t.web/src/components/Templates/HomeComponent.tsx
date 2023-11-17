"use client"

import React, { useState, useEffect, useRef } from 'react';
import { getToken } from '@/app/api/token';
import { MyToken } from '@/types/token';
import { getObjectFromFreeKeyword } from '@/app/api/searchTver';
import { Box, Button, TextField, Fab } from '@mui/material';
import { CardElement } from '@/components/Molecules/CardElement';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ScrollPosition } from 'react-lazy-load-image-component';

interface ContentObject {
  type: string
  content: {
    id: string;
    version: number;
    title: string;
    seriesID: string;
    endAt: number;
    broadcastDateLabel: string;
    isNHKContent: boolean;
    isSubtitle: boolean;
    ribbonID: number;
    seriesTitle: string;
    isAvailable: boolean;
    broadcasterName: string;
    productionProviderName: string;
  },
  isLater: boolean,
  score: number  
}
interface HomeProps {
  scrollPosition: ScrollPosition;
}

export default function HomeComponent({ scrollPosition}: HomeProps) {
  const [platformToken, setPlatformToken] = useState<MyToken>();
  const [keyword, setKeywor] = useState("");
  const [searchResult, setSearchResult] = useState<ContentObject[]>();
  const searchFormRef = useRef<HTMLInputElement>(null);
  const tverLogoURLx1 = process.env.NEXT_PUBLIC_TVER_IMAG_LOGO;

  const handleGetObject = async () => {
    if (platformToken && platformToken.platformUID && platformToken.platformToken && keyword) {
      const resultObject:ContentObject[] = await getObjectFromFreeKeyword(keyword, platformToken.platformUID, platformToken.platformToken);
      console.log(resultObject);
      searchFormRef.current?.blur();
      setSearchResult(resultObject);
    }
  }

  const focusSearchForm = () => {
    setKeywor("");
    searchFormRef.current?.focus();
    scrollToElementById('search-Result-Card-From');
  }

  const scrollToElementById = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const start = element.scrollTop;
      const end = 0;
      const distance = end - start;
      const duration = 400;
      let startTime: number | null = null;
  
      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        element.scrollTo(0, start + distance * progress);
        if (elapsed < duration) window.requestAnimationFrame(animation);
      };
  
      window.requestAnimationFrame(animation);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getToken();
      setPlatformToken(result);
    };
    fetchData();
  }, []);

  return (
    <>
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3, paddingTop: 0, paddingBottom: 0, "z-index": 1 ,height: '100vh'}}
      >

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
        noValidate
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault(); 
          handleGetObject();
        }}
      >
        <img
            onClick={() => window.location.href="/"}
            src={tverLogoURLx1}
            srcSet={`${tverLogoURLx1} 1x, ${tverLogoURLx1} 2x`}
            alt="TVer" 
            style={{ 
                width: '81px', 
                height: '59px',
                marginRight: '20px'
            }}
        />
        <TextField 
          id="search-form" 
          label="番組タイトル・出演者で検索" 
          variant="standard" 
          value={keyword}
          onChange={e => setKeywor(e.target.value)}
          inputRef={searchFormRef}
          sx={{ 
            width: '80%'
          }}
        />
        
        <Button variant="contained"
        sx={{
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
        }}>ログイン</Button>
      </Box>
        
      <Box
        sx={{ p: 2, overflow: 'auto', maxHeight: '80vh',display: 'flex',flexWrap: 'wrap' }}
        id="search-Result-Card-From"
        >
        {platformToken && searchResult && searchResult.length > 0 && 
          <>
            {searchResult.map((object, index) => (
              <Box mb={2} key={index} >
                <CardElement object={object} scrollPosition={scrollPosition}/>
              </Box>
            ))}
          </>
        }
      </Box>

      <Fab color="primary" aria-label="focus-search-form" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={focusSearchForm}>
        <KeyboardArrowUpIcon />
      </Fab>
    </Box>
    </>
  );
}