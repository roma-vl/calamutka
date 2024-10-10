import ProductCard from './ProductCard';
import { Grid } from '@material-ui/core';

const ProductCardGrid = ({ products }) => {
  return (
    <Grid container spacing={3}>
      {products && products.map(product => (
        <Grid item xs={12} sm={6} md={3} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductCardGrid;
