// ProductCard.jsx
import React from 'react';
import { Card, CardContent, CardMedia, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: 240,
  },
});

const PopularProductCard = ({ product }) => {
  const classes = useStyles();

  return (

     <Card className={classes.root} >
       <CardMedia
         className={classes.media}
         image={product.image}
         title={product.name}
       />
       {/*<CardContent>*/}
       {/*  <Typography gutterBottom variant="h5" component="h2">*/}
       {/*    {product.name}*/}
       {/*  </Typography>*/}
       {/*  <Typography variant="body2" color="textSecondary" component="p">*/}
       {/*    {product.description}*/}
       {/*  </Typography>*/}
       {/*</CardContent>*/}
     </Card>
  );
};

export default PopularProductCard;
