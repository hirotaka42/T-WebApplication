"use client"

import React, { useState, useEffect, useRef } from 'react';
import { getToken } from './api/token';
import { MyToken } from '@/types/token';
import { getObjectFromFreeKeyword } from './api/searchTver';
import { Box, Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { CardElement } from '@/components/Molecules/CardElement';

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
  const [videoTitle, setVideoTitle] = useState("");

  const handleGetObject = async () => {
    if (platformToken && platformToken.platformUID && platformToken.platformToken && keyword) {
      const resultObject:ContentObject[] = await getObjectFromFreeKeyword(keyword, platformToken.platformUID, platformToken.platformToken);
      console.log(resultObject);
      setSearchResult(resultObject);
    }
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
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3, "z-index": 1 ,height: '100vh'}}
      >
      <div>
        <Box
          component="form"
          sx={{ p: 2
          }}
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault(); 
            handleGetObject();
          }}
        >

        {platformToken && <h1>{platformToken.platformToken}</h1>}
        <TextField 
          id="search-form" 
          label="Search" 
          variant="standard" 
          value={keyword}
          onChange={e => setKeywor(e.target.value)}
          />
          
        </Box>
        
        <Box
          sx={{ p: 2, overflow: 'auto', maxHeight: '80vh' }}
          >
          {platformToken && searchResult && searchResult.length > 0 && 
            <>
            <div>
              {searchResult.map((object, index) => (
                <Box mb={2} key={index} >
                  <CardElement object={object}/>
                </Box>
              ))}
            </div>
            </>
          }
        </Box>
      </div>
    </Box>
    </>
  );
}