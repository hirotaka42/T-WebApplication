import React from 'react';
import { Box, Button, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import { Button_OpenIina } from '@/components/Atoms/Button/OpenIina'
import { Button_CopyLink } from '@/components/Atoms/Button/CopyLink'
import { Button_OpenVlc } from '../Atoms/Button/OpenVlc';

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
  
interface CardElementProps {
    object: ContentObject;
}

export const CardElement: React.FC<CardElementProps> = ({ object }) => {
  return (
    <Box sx={{  padding:'4px', maxWidth: 260, flex: '0 0 auto'}}>
    <Card>
      <CardActionArea
        onClick={() => {
          // await navigator.clipboard.writeText(`https://tver.jp/episodes/${object.content.id}`);
          window.open(`https://tver.jp/episodes/${object.content.id}`, '_blank');
        }}>
        <Box sx={{ boxShadow: 4 }}>
          <CardMedia
            component="img"
            sx={{
              maxWidth: '100%',
              maxHeight: '100%',
            }}
            image={`https://statics.tver.jp/images/content/thumbnail/episode/small/${object.content.id}.jpg`}
            alt={object.content.seriesTitle}
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
        </Box>
      </CardContent>
    </Box>
  );
};