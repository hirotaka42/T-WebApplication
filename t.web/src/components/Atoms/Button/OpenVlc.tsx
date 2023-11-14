import React, { useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

interface OpenVlcProps {
  button_title?: string,
  videoLink: string
}

export const Button_OpenVlc: React.FC<OpenVlcProps> = ({ button_title="open-vlc", videoLink }) => {
  const [m3u8Url, setM3u8Url] = useState<string>("");

  const handleClick = async () => {
    const { data } = await axios.get(`/api/getM3U8Url?videoLink=${videoLink}`);
    setM3u8Url(data.m3u8Url);
  };

  return (
    <Button variant="outlined" onClick={handleClick} href={m3u8Url && `vlc-x-callback://x-callback-url/stream?url=${encodeURIComponent(m3u8Url)}`}>
      {button_title}
    </Button>
  );
};