
import Product from '../models/Product.js';

export default class ProductRepository {
  static async getAllProducts() {
    return await Product.query();
  }

  static async getProductById(id) {
    return await Product.query().findById(id);
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

  static async searchProducts(criteria) {
    // Реалізуйте логіку пошуку продуктів на основі заданих критеріїв
  }
}
