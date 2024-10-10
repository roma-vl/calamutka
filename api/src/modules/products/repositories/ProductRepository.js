import Product from '../models/Product.js';
import ProductImage from '../models/ProductImage.js';
import ProductErrors from '../models/ProductErrors.js';

export default class ProductRepository {
  static async getAllProducts() {
    try {
     return await Product.query();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Products not found 23 ');
    }
  }

  static async getProductById(id) {
    try {

      const product = await Product.query().findById(id);
      console.log(product, 'dddd')
      if (product) {
        product.images = await ProductImage.query().where('product_id', id);
        return product;
      }

      return ProductErrors.NO_PRODUCT_FOUND_WITH_THIS_ID;

    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Product not found 2');
    }
  }

  static async createProduct(productData) {
    const product = await Product.query().insert(productData);
    if (product) {
      return product;
    }
    return ProductErrors.PRODUCT_NOT_SAVED;
  }

  static async updateProductById(id, productData) {
    try {
    const product = await Product.query().findById(id);
    if (product) {
      return await  Product.query().findById(id);
      // return await Product.query().findById(id).patch(productData);
    }

    return  ProductErrors.NO_PRODUCT_FOUND_WITH_THIS_ID;

    } catch (error) {
      throw new Error('Error updating product:', error);
    }
  }


  static async deleteProductById(id) {
    try {
      const product = await Product.query().deleteById(id);
      if (product === 1) {
        return ProductErrors.PRODUCT_DELETED;
      }

      return ProductErrors.PRODUCT_NOT_DELETED;

    } catch (error) {
      throw new Error('Error deleting product:', error);
    }
  }

  static async searchProducts(criteria) {
    // Реалізуйте логіку пошуку продуктів на основі заданих критеріїв
  }

  static async getProductsByCategory(categoryId) {
    try {
      const products = await Product.query().where('category_id', categoryId);
      if (products.length > 0) {
        // Додаємо зображення до кожного продукту
        for (let product of products) {
          product.images = await ProductImage.query().where('product_id', product.id);
        }
        return products;
      }
      return ProductErrors.NO_PRODUCTS_FOUND_IN_THIS_CATEGORY;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw new Error('Products not found by category');
    }
  }

  // Отримати продукти за масивом категорій
  static async getProductsByCategoryArray(categoryIds) {
    try {
      const products = await Product.query().whereIn('category_id', categoryIds);
      if (products.length > 0) {
        // Додаємо зображення до кожного продукту
        for (let product of products) {
          product.images = await ProductImage.query().where('product_id', product.id);
        }
        return products;
      }
      return ProductErrors.NO_PRODUCTS_FOUND_FOR_CATEGORIES;
    } catch (error) {
      console.error('Error fetching products by category array:', error);
      throw new Error('Products not found for categories');
    }
  }
}
