import {Fragment, useEffect} from 'react';
import {Typography, Grid, Card, CardContent, CardMedia, Button, IconButton, CircularProgress} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {get} from "../../api/axios.api";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {fetchOneProductFailure, fetchOneProductRequest, fetchOneProductSuccess} from "../../redux/actions/oneProductActions";
import {addToCart, saveCartToLocalStorage} from "../../redux/actions/cartActions";

const Product = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 2,
    slidesToScroll: 5,
  };
  const {slug} = useParams();
  const dispatch = useDispatch();
  const product = useSelector(state => state.oneProduct.product);
  const loading = useSelector(state => state.oneProduct.loading);
  const error = useSelector(state => state.oneProduct.error);

  const addProductItem = (productItem) => {
    dispatch(addToCart(productItem));
    dispatch(saveCartToLocalStorage());
  }
  useEffect(() => {
    const fetchProduct = async () => {
      dispatch(fetchOneProductRequest());
      try {
        const response = await get('/products/' + slug);
        dispatch(fetchOneProductSuccess(response.data));
      } catch (error) {
        dispatch(fetchOneProductFailure(error.message));
      }
    };
    fetchProduct();
  }, [dispatch]);

  const images = [
    {
      original: product.main_image,
      thumbnail: product.main_image,
      // originalHeight: 450,
      // originalWidth: 450
    },
    ...(product.images && product.images.length > 0
      ? product.images.map(item => ({
        original: item.url,
        thumbnail: item.url,
      }))
      : [])
  ];
  if (!product) {
    return null;
  }
  return (
    <Container>
      <Grid container spacing={3}>

        {loading && <CircularProgress/>}
        {error && <p>Error: {error}</p>}

        {product && (
          <Fragment>
            <Grid item xs={6}>
              <div style={{marginTop: '20px'}}>
                <ImageGallery items={images} originalHeight={300} />
              </div>

            </Grid>

            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="h4" color="text.secondary" sx={{marginTop: 2}}>
                    Ціна: ₴ {product.price}
                  </Typography>
                  <Grid container spacing={1} sx={{marginTop: 2}}>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddShoppingCartIcon/>}
                        onClick={() => { addProductItem(product) }}
                      >
                        Додати в корзину
                      </Button>
                    </Grid>
                    <Grid item>
                      <IconButton color="primary" aria-label="add to favorites">
                        <BookmarkIcon/>
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
                <Button variant="contained" sx={{mt: 2}}>
                  Натисніть мене
                </Button>
              </Box>
            </Grid>
          </Fragment>
        )}
      </Grid>
    </Container>
  );
};

export default Product;
