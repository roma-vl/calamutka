import Product from '../models/Product.js';
import ProductImage from '../models/ProductImage.js';

export default class ProductRepository {
  static async getAllProducts() {
    return await Product.query();
  }

  static async getProductById(id) {
    try {

      const product = await Product.query().findById(id);
      if (product) {
        product.images = await ProductImage.query().where('product_id', id);
      }

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
    try {
    const product = await Product.query().findById(id);
    if (product) {
      return await  Product.query().findById(id);
      // return await Product.query().findById(id).patch(productData);
    }
    return {
      error: 'По ід продукт не знайдено'
    }
    } catch (error) {
      console.error('Error updating product:', error);
      throw new Error('Product not found');
    }
  }


  static async deleteProductById(id) {
    return await Product.query().deleteById(id);
  }

  static async searchProducts(criteria) {
    // Реалізуйте логіку пошуку продуктів на основі заданих критеріїв
  }
}
