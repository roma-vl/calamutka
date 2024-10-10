import express from 'express';
import  ProductController from '../controllers/ProductController.js';


const productRoutes = (knex) => {
  const app = express.Router();

  app.get('/category/:id', ProductController.getProductsByCategory);  // За однією категорією
  app.post('/categories', ProductController.getProductsByCategoryArray);     // За масивом категорій
  // Маршрути для кожного методу CRUD
  app.get('/', ProductController.getAllProducts);
  app.post('/', ProductController.createProduct);
  app.get('/:id', ProductController.getProductById);
  app.put('/:id', ProductController.updateProductById);
  app.delete('/:id', ProductController.deleteProductById);

  return app;
};

export default productRoutes;
