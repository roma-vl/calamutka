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
}

export default ProductController;
