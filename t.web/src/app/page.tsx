"use client"

import React, { useState, useEffect, useRef } from 'react';
import { getToken } from './api/token';
import { MyToken } from '@/types/token';
import { getObjectFromFreeKeyword } from './api/searchTver';
import { Box, TextField, Fab } from '@mui/material';
import { CardElement } from '@/components/Molecules/CardElement';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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

export default function Home() {
  const [platformToken, setPlatformToken] = useState<MyToken>();
  const [keyword, setKeywor] = useState("");
  const [searchResult, setSearchResult] = useState<ContentObject[]>();
  const searchFormRef = useRef<HTMLInputElement>(null);

  const handleGetObject = async () => {
    if (platformToken && platformToken.platformUID && platformToken.platformToken && keyword) {
      const resultObject:ContentObject[] = await getObjectFromFreeKeyword(keyword, platformToken.platformUID, platformToken.platformToken);
      console.log(resultObject);
      setSearchResult(resultObject);
    }
  }

  const focusSearchForm = () => {
    searchFormRef.current?.focus();
  }

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
      <div>
        <Box
          component="form"
          sx={{ p: 2,display: 'flex', justifyContent: 'center'
          }}
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault(); 
            handleGetObject();
          }}
        >
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
        </Box>
        
        <Box
          sx={{ p: 2, overflow: 'auto', maxHeight: '80vh',display: 'flex',flexWrap: 'wrap' }}
          >
          {platformToken && searchResult && searchResult.length > 0 && 
            <>
              {searchResult.map((object, index) => (
                <Box mb={2} key={index} >
                  <CardElement object={object}/>
                </Box>
              ))}
            </>
          }
        </Box>
      </div>
      <Fab color="primary" aria-label="focus-search-form" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={focusSearchForm}>
        <KeyboardArrowUpIcon />
      </Fab>
    </Box>
    </>
  );
}