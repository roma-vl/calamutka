// HomePage.jsx
import React from 'react';
import { Typography } from '@material-ui/core';
import RecommendedProductsSlider from "../../components/Product/RecommendedProductsSlider";
import PopularProductsGrid from "../../components/Product/PopularProductsGrid";
import Container from "@mui/material/Container";
import ProductCardGrid from "../../components/Product/ProductCardGrid";


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

  const products = [
    { id: 1, name: 'Product 1', description: 'Description 1 повар олав ілопа івпар івлопр івлоапа  dsfg dfg fdg dg dsg sdfg dsg dsg dsg fdsg dsf gdsfg dsfg dsfg fdsg dsfg sdfg dsgівлопр ілва рпліво ', image: 'https://picsum.photos/300' },
    { id: 2, name: 'Product 2', description: 'Description 2', image: 'https://picsum.photos/300' },
    { id: 3, name: 'Product 3', description: 'Description 3', image: 'https://picsum.photos/300' },
    { id: 4, name: 'Product 4', description: 'Description 4', image: 'https://picsum.photos/300' },
    { id: 5, name: 'Product 5', description: 'Description 5', image: 'https://picsum.photos/300' },
    { id: 6, name: 'Product 6', description: 'Description 6', image: 'https://picsum.photos/300' },
    { id: 7, name: 'Product 7', description: 'Description 7', image: 'https://picsum.photos/300' },
    { id: 8, name: 'Product 8', description: 'Description 8', image: 'https://picsum.photos/300' },
    { id: 9, name: 'Product 9', description: 'Description 9', image: 'https://picsum.photos/300' },
    { id: 10, name: 'Product 10', description: 'Description 10', image: 'https://picsum.photos/300' },
    { id: 11, name: 'Product 11', description: 'Description 11', image: 'https://picsum.photos/300' },
    { id: 12, name: 'Product 12', description: 'Description 12', image: 'https://picsum.photos/300' },
  ];


  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Популярні товари
      </Typography>
      <PopularProductsGrid products={popularProducts}/>

      <Typography variant="h4" gutterBottom>
        Товари
      </Typography>
      <ProductCardGrid products={products} />

      <Typography variant="h4" gutterBottom>
        Рекомендовані товари
      </Typography>
      <RecommendedProductsSlider products={recommendedProducts}/>


    </Container>
  );
};

export default HomePage;
