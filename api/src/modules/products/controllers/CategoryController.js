import CategoryRepository from "../repositories/CategoryRepository.js";

class CategoryController {
  static async getAllCategories(req, res, next) {
    try {
      const categories = await CategoryRepository.getAllCategories();
      console.log(categories, 'categories')
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryById(req, res, next) {
    const { id } = req.params;
    try {
      const category = await CategoryRepository.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json(category);
    } catch (error) {
      next(error);
    }
  }

  static async createCategory(req, res, next) {
    const categoryData = req.body;
    try {
      const createdCategory = await CategoryRepository.createCategory(categoryData);
      res.status(201).json(createdCategory);
    } catch (error) {
      next(error);
    }
  }

  static async updateCategoryById(req, res, next) {
    const { id } = req.params;
    const categoryData = req.body;
    try {
      const updatedCategory = await CategoryRepository.updateCategoryById(id, categoryData);
      res.json(updatedCategory);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategoryById(req, res, next) {
    const { id } = req.params;
    try {
      await CategoryRepository.deleteCategoryById(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default CategoryController;
