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
      <Box sx={{ maxWidth: 260 }}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={`https://statics.tver.jp/images/content/thumbnail/episode/large/${object.content.id}.jpg`}
            alt={object.content.seriesTitle}
          />
        </CardActionArea>
      </Card>
        <CardContent 
          sx={{ 
            marginTop: 0.8,
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
            <Button_CopyLink videoLink={object.content.id} />
          </Box>
        </CardContent>
      </Box>
    );
  };