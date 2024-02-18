// HomePage.jsx
import React, {useEffect, useState} from 'react';
import { Typography } from '@material-ui/core';
import RecommendedProductsSlider from "../../components/Product/RecommendedProductsSlider";
import PopularProductsGrid from "../../components/Product/PopularProductsGrid";
import Container from "@mui/material/Container";
import ProductCardGrid from "../../components/Product/ProductCardGrid";
// import {get} from "./axios.api";
import {SERVER_URI} from "../../constants";
import {get} from "../../api/axios.api";
import {addToCart} from "../../cartActions";
import store from "../../store";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductsFailure, fetchProductsRequest, fetchProductsSuccess} from "../../productActions";
import {CircularProgress} from "@mui/material";


const HomePage = () => {
  // Ваші дані для рекомендованих та популярних товарів
// Дані для рекомендованих товарів
  const recommendedProducts = [
    {
      id: 1,
      name: 'Назва рекомендованого товару 1',
      description: 'Опис рекомендованого товару 1',
      image: 'https://picsum.photos/345',
    },
    {
      id: 2,
      name: 'Назва рекомендованого товару 2',
      description: 'Опис рекомендованого товару 2',
      image: 'https://picsum.photos/345',
    },
    {
      id: 3,
      name: 'Назва рекомендованого товару 3',
      description: 'Опис рекомендованого товару 3',
      image: 'https://picsum.photos/345',
    },

    {
      id: 4,
      name: 'Назва рекомендованого товару 4',
      description: 'Опис рекомендованого товару 4',
      image: 'https://picsum.photos/344',
    },

    {
      id: 5,
      name: 'Назва рекомендованого товару 5',
      description: 'Опис рекомендованого товару 5',
      image: 'https://picsum.photos/343',
    },
    // Додавайте інші продукти за потребою
  ];

// Дані для популярних товарів
  const popularProducts = [
    {
      id: 4,
      name: 'Назва популярного товару 1',
      description: 'Опис популярного товару 1',
      image: 'https://picsum.photos/944',
    },
    {
      id: 5,
      name: 'Назва популярного товару 2',
      description: 'Опис популярного товару 2',
      image: 'https://picsum.photos/943',
    },
    {
      id: 6,
      name: 'Назва популярного товару 3',
      description: 'Опис популярного товару 3',
      image: 'https://picsum.photos/945',
    },
    // Додавайте інші продукти за потребою
  ];

  const dispatch = useDispatch();
  const products = useSelector(state => state.product.products);
  const loading = useSelector(state => state.product.loading);
  const error = useSelector(state => state.product.error);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(fetchProductsRequest());
      try {
        const response = await get('/products'); // Припустимо, що маршрут /products є у вашому сервері
        dispatch(fetchProductsSuccess(response.data));
      } catch (error) {
        dispatch(fetchProductsFailure(error.message));
      }
    };
      fetchProducts();
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Популярні товари
      </Typography>
      <PopularProductsGrid products={popularProducts}/>

      <Typography variant="h4" gutterBottom>
        Товари
      </Typography>

      {loading && <CircularProgress />}
      {error && <p>Error: {error}</p>}

      {products && < ProductCardGrid products={products} />}

      <Typography variant="h4" gutterBottom>
        Рекомендовані товари
      </Typography>
      <RecommendedProductsSlider products={recommendedProducts}/>


    </Container>
  );
};

export default HomePage;
