import Product from '../models/Product.js';
import ProductImage from '../models/ProductImage.js';

export default class ProductRepository {
  static async getAllProducts() {
    return await Product.query();
  }

  static async getProductById(id) {
    try {
      console.log(id, 'id');
      const product = await Product.query().findById(id);

      if (product) {
        product.images = await ProductImage.query().where('product_id', id);
      }
      console.log(product, 'product');
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Product not found');
    }
  }

  static async createProduct(productData) {
    return await Product.query().insert(productData);
  }

  static async updateProductById(id, productData) {
    return await Product.query().findById(id).patch(productData);
  }

  static async deleteProductById(id) {
    return await Product.query().deleteById(id);
  }

  static async getProductsByCategory(categoryId) {
    try {
      return await Product.query().where('category_id', categoryId);
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw new Error('Failed to fetch products by category');
    }
  }

  // Отримати всі продукти за масивом категорій
  static async getProductsByCategoryArray(categoryIds) {
    try {
      return await Product.query().whereIn('category_id', categoryIds);
    } catch (error) {
      console.error('Error fetching products by categories array:', error);
      throw new Error('Failed to fetch products by categories array');
    }
  }

  static async searchProducts(criteria) {
    // Реалізуйте логіку пошуку продуктів на основі заданих критеріїв
  }
}
