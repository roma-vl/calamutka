import Category from '../models/Category.js';
import CategoryErrors from '../models/CategoryErrors.js'; // Додамо файл з помилками для категорій

export default class CategoryRepository {
  static async getAllCategories() {
    try {
      return await Category.query();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Categories not found');
    }
  }

  static async getCategoryById(id) {
    try {
      const category = await Category.query().findById(id);
      if (category) {
        return category;
      }
      return CategoryErrors.NO_CATEGORY_FOUND_WITH_THIS_ID;
    } catch (error) {
      console.error('Error fetching category:', error);
      throw new Error('Category not found');
    }
  }

  static async createCategory(categoryData) {
    try {
      const category = await Category.query().insert(categoryData);
      if (category) {
        return category;
      }
      return CategoryErrors.CATEGORY_NOT_SAVED;
    } catch (error) {
      console.error('Error saving category:', error);
      throw new Error('Category not saved');
    }
  }

  static async updateCategoryById(id, categoryData) {
    try {
      const category = await Category.query().findById(id);
      if (category) {
        await Category.query().findById(id).patch(categoryData);
        return category;
      }
      return CategoryErrors.NO_CATEGORY_FOUND_WITH_THIS_ID;
    } catch (error) {
      console.error('Error updating category:', error);
      throw new Error('Error updating category');
    }
  }

  static async deleteCategoryById(id) {
    try {
      const category = await Category.query().deleteById(id);
      if (category === 1) {
        return CategoryErrors.CATEGORY_DELETED;
      }
      return CategoryErrors.CATEGORY_NOT_DELETED;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw new Error('Error deleting category');
    }
  }

  static async searchCategories(criteria) {
    // Реалізуйте логіку пошуку категорій на основі заданих критеріїв
  }
}
