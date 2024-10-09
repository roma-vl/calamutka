import ProductRepository from "../repositories/ProductRepository.js";

class ProductController {
  static async getAllProducts(req, res, next) {
    try {
      const products = await ProductRepository.getAllProducts();
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req, res, next) {
    const { id } = req.params;
    try {
      const product = await ProductRepository.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  static async createProduct(req, res, next) {
    const productData = req.body;
    try {
      const createdProduct = await ProductRepository.createProduct(productData);
      res.status(201).json(createdProduct);
    } catch (error) {
      next(error);
    }
  }

  static async updateProductById(req, res, next) {
    const { id } = req.params;
    const productData = req.body;
    try {
      const updatedProduct = await ProductRepository.updateProductById(id, productData);
      res.json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProductById(req, res, next) {
    const { id } = req.params;
    try {
      await ProductRepository.deleteProductById(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }

  static async getProductsByCategory(req, res, next) {
    console.log(req.params, 'req.params')
    const { id } = req.params;  // id категорії береться з URL
    try {
      const products = await ProductRepository.getProductsByCategory(id);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  // Отримати всі продукти за масивом категорій
  static async getProductsByCategoryArray(req, res, next) {
    const { categoryIds } = req.body;  // масив id категорій передається в тілі запиту
    try {
      const products = await ProductRepository.getProductsByCategoryArray(categoryIds);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
