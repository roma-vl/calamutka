import React from 'react';
import { Typography, Grid, Card, CardContent, CardMedia, Button, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
const Product = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  return (
 <Container>
   <Grid container spacing={3}>
     {/* Ліва частина - основне зображення товару та карусель мініатюрних зображень */}
     <Grid item xs={6}>
       <Card>
         <CardMedia
           component="img"
           height="100%"
           image="https://picsum.photos/600/400"
           alt="Product"
         />
       </Card>
       {/* Карусель мініатюрних зображень */}
       <div style={{ marginTop: '20px' }}>

         <Slider {...settings}>
           <div>
             <img src="https://picsum.photos/80" alt="Product Thumbnail" />
           </div>
           <div>
             <img src="https://picsum.photos/80" alt="Product Thumbnail" />
           </div>
           <div>
             <img src="https://picsum.photos/80" alt="Product Thumbnail" />
           </div>
           <div>
             <img src="https://picsum.photos/80" alt="Product Thumbnail" />
           </div>
           <div>
             <img src="https://picsum.photos/80" alt="Product Thumbnail" />
           </div>
           <div>
             <img src="https://picsum.photos/80" alt="Product Thumbnail" />
           </div>
         </Slider>
       </div>

     </Grid>
     {/* Права частина - опис товару */}
     <Grid item xs={6}>
       <Card>
         <CardContent>
           <Typography gutterBottom variant="h5" component="div">
             Назва товару
           </Typography>
           <Typography variant="body2" color="text.secondary">
             Опис товару тут. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
           </Typography>
           <Typography variant="h6" color="text.secondary" sx={{ marginTop: 2 }}>
             Ціна: $XX.XX
           </Typography>
           {/* Кнопки для додавання в корзину та в закладки */}
           <Grid container spacing={1} sx={{ marginTop: 2 }}>
             <Grid item>
               <Button
                 variant="contained"
                 color="primary"
                 startIcon={<AddShoppingCartIcon />}
               >
                 Додати в корзину
               </Button>
             </Grid>
             <Grid item>
               <IconButton color="primary" aria-label="add to favorites">
                 <BookmarkIcon />
               </IconButton>
             </Grid>
           </Grid>
         </CardContent>
       </Card>
       <Box
         sx={{
           bgcolor: 'primary.main',
           color: 'primary.contrastText',
           p: 2,
           borderRadius: 1,
           boxShadow: 1,
         }}
       >
         <Typography variant="h6" component="div" gutterBottom>
           Заголовок
         </Typography>
         <Typography variant="body1">
           Це приклад використання Box компонента з Material-UI. Box компонент
           надає можливість легко стилізувати контейнери за допомогою системи
           проперті sx.
         </Typography>
         <Button variant="contained" sx={{ mt: 2 }}>
           Натисніть мене
         </Button>
       </Box>
     </Grid>
   </Grid>
 </Container>
  );
};

export default Product;
