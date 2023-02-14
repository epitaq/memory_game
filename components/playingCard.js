import * as React from 'react';
import Card from '@mui/material/Card'
import { CardMedia } from '@mui/material';

export const PlayingCard = ({active, activeImg, inactiveImg}) => {
  return (
    <>
      {active
        ? cardOneSide(activeImg)
        : cardOneSide(inactiveImg)}
    </>
  )

}

const cardOneSide = (img) => {
  let color
  if (img){
    color = 'white'
  } 
  
  return (
    <Card sx={{height: 176, width: 126, backgroundColor: color, m: 1}} >
      <CardMedia
        component='img'
        image={img}
        />
    </Card>
  )
}