import React from 'react';
import { Box, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import { Button_OpenIina } from '@/components/Atoms/Button/OpenIina'
import { Button_OpenVlc } from '../Atoms/Button/OpenVlc';
import { LazyLoadImage, LazyLoadComponent ,ScrollPosition } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ContentObject } from '@/types/ContentObject'
  
interface CardElementProps {
    object: ContentObject;
    isMobile: boolean
}

export const CardElement: React.FC<CardElementProps> = ({ object, isMobile }) => {
  const thumbnailUrl = process.env.NEXT_PUBLIC_TVER_THUMBNAIL;

  return (
    <LazyLoadComponent>
      <Box sx={{  padding:'4px', maxWidth: 260, flex: '0 0 auto'}}>
      <Card>
        <CardActionArea
          onClick={() => {
            window.open(`https://tver.jp/episodes/${object.content.id}`, '_blank');
          }}>
          <Box sx={{ boxShadow: 4 , display: 'flex'}}>
          <LazyLoadImage
            effect="blur"
            src={`${thumbnailUrl}/episode/small/${object.content.id}.jpg`}
            alt={object.content.seriesTitle}
            style={{ 
              maxWidth: '100%', 
              maxHeight: '100%', 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' 
            }}
          />
          </Box>
        </CardActionArea>
      </Card>
        <CardContent 
          sx={{ 
            marginTop: 1,
            padding: 0,
            width: '100%',
            '&.MuiCardContent-root:last-child': {
              paddingBottom: 0,
            },
            }}
        >
          <Typography variant="h6" component="div" 
            sx={{
              fontSize: '15px',
              lineHeight: '18px',
              paddingBottom: '2px',
              fontWeight: '700',
              textOverflow: 'ellipsis', 
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              color: '#1f2b3e',

            }}>
            {object.content.seriesTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary"
            sx={{
              fontSize: '13px',
              lineHeight: '17px',
              textOverflow: 'ellipsis', 
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              color: '#1f2b3e',
            }}>
            {object.content.title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >

            <Button_OpenVlc videoLink={object.content.id} />
            <Button_OpenIina videoLink={object.content.id} />
            
            {/* {isMobile ? (
              <Typography >
                {`${object.content.broadcasterName} ${object.content.broadcastDateLabel}`}
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button_OpenVlc videoLink={object.content.id} />
                <Button_OpenIina videoLink={object.content.id} />
              </Box>
            )} */}
          </Box>
        </CardContent>
      </Box>
    </LazyLoadComponent>
  );
};