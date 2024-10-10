import Joi from 'joi';
import BaseValidation from '../../app/src/model/validation.js';
import ProductRepository from "../repositories/ProductRepository.js";

class ProductValidation extends BaseValidation {
  createSchema() {
    return Joi.object({
      name: Joi.string().required(),
      price: Joi.number().positive().required(),
    });
  }

  updateSchema() {
    return Joi.object({
      id: Joi.number().positive().required(),
      name: Joi.string().optional().required(),
      price: Joi.number().positive().optional().required(),
    });
  }

}

export default ProductValidation;
