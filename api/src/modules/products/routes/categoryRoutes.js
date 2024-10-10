import express from 'express';
import CategoryController from '../controllers/CategoryController.js';

const categoryRoutes = (knex) => {
  const app = express.Router();

  // Маршрути для кожного методу CRUD
  app.get('/', CategoryController.getAllCategories);
  app.post('/', CategoryController.createCategory);
  app.get('/:id', CategoryController.getCategoryById);
  app.put('/:id', CategoryController.updateCategoryById);
  app.delete('/:id', CategoryController.deleteCategoryById);

  return app;
};

export default categoryRoutes;
