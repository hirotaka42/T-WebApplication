"use client"

import React from 'react';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import HomeComponent from '@/components/Templates/Main';

const HomeConponentWithScroll = trackWindowScroll(HomeComponent);

export default function Home() {
  return (
    <>
      <HomeConponentWithScroll />
    </>
  );
}