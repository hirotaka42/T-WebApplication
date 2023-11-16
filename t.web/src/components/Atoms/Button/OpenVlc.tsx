import React, { useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

interface OpenVlcProps {
  button_title?: string,
  videoLink: string
}

export const Button_OpenVlc: React.FC<OpenVlcProps> = ({ button_title="open-vlc", videoLink }) => {
  const [m3u8Url, setM3u8Url] = useState<string>("");
  const [loading, setLoading] = useState(false);


  const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true); 
    const { data } = await axios.get(`/api/getM3U8Url?videoLink=${videoLink}`);
    const m3u8Url = data.m3u8Url;
    window.location.href = `vlc-x-callback://x-callback-url/stream?url=${encodeURIComponent(m3u8Url)}`;
    setLoading(false); 
  };

  return (
    <Button sx={{ flexGrow: 1, position: 'relative' }} variant="outlined" onClick={handleClick} disabled={loading}>
      <Box sx={{ visibility: loading ? 'hidden' : 'visible' }}>{button_title}</Box> {/* ローディング中はテキストを非表示 */}
      {loading && <CircularProgress size={24} sx={{ position: 'absolute' }} />} {/* ローディング中は CircularProgress を表示 */}
    </Button>
  );
};