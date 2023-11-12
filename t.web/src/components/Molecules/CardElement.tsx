import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { Button_OpenIina } from '@/components/Atoms/Button/OpenIina'
import { Button_CopyLink } from '@/components/Atoms/Button/CopyLink'

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
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {object.content.seriesTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {object.content.title}
          </Typography>
          <Button_OpenIina videoLink={object.content.id} />
          <Button_CopyLink videoLink={object.content.id} />
        </CardContent>
      </Card>

    );
  };