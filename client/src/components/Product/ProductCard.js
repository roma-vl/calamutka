import { Card, CardContent, CardMedia, Typography, makeStyles, IconButton } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import React, { useState } from 'react';
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addToCart, removeFromCart} from "../../redux/actions/cartActions";
import store from "../../redux/store";
import Button from "@mui/material/Button";

const useStyles = makeStyles({
  root: {
    position: 'relative',
    maxWidth: '100%',
    height: 300,
    transition: 'transform 0.5s',
    '&:hover': {
      zIndex: 2,
      width: 270,
      position: 'absolute',
      transform: 'translateY(-20px)',
      height: 450,
    },
  },
  media: {
    height: 140,
  },
  content: {
    flex: '1 0 auto',
    height: '120px',
    transition: 'height 0.5s',
    margin: '10px', // Додали маржі для контенту
    '&$root:hover &': {
      height: '290px',
    },
  },
  actions: {
    position: 'relative',
    bottom: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '8px',
    boxSizing: 'border-box',
    transition: 'transform 0.5s',
    '& $root:hover &': {
      transform: 'translateY(0)',
    },
  },
});

const ProductCard = ({ product }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const dispatch = useDispatch();


  const addProductItem = (productItem) => {
    dispatch(addToCart(productItem));
    console.log(store.getState());
  }

  const handleDeleteCard = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <Card className={classes.root}>
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          className={classes.media}
          image={product.main_image}
          title={product.name}
        />
      </Link>
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h5" component="h2">
          <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {product.name}
          </Link>
        </Typography>

        <div className={classes.actions}>
          <IconButton aria-label="save">
            <BookmarksIcon/>
          </IconButton>
          <IconButton aria-label="add to cart" onClick={() => { addProductItem(product) }}>
            <AddShoppingCartIcon />
          </IconButton>
        </div>
        <Typography variant="body2" color="textSecondary" component="p">
          {product.description}
        </Typography>
        <Typography variant="h5" color="textSecondary" component="p">
          Категорія
        </Typography>
        <Typography variant="h5" color="textSecondary" component="p">
          Тег
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
