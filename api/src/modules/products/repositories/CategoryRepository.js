import Category from '../models/Category.js';

export default class CategoryRepository {
  static async getAllCategories() {
    return await Category.query();
  }

  static async getCategoryById(id) {
    try {
      const category = await Category.query().findById(id);
      return category;
    } catch (error) {
      console.error('Error fetching category:', error);
      throw new Error('Category not found');
    }
  }

  static async createCategory(categoryData) {
    return await Category.query().insert(categoryData);
  }

  static async updateCategoryById(id, categoryData) {
    return await Category.query().findById(id).patch(categoryData);
  }

  static async deleteCategoryById(id) {
    return await Category.query().deleteById(id);
  }
}
