import Joi from 'joi';

class BaseController {
  constructor(model, schema) {
    this.model = model;
    this.schema = schema;
  }

  // Загальний метод для валідації
  validate(data) {
    const { error } = this.schema.validate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }
  }

  // Загальний метод створення
  async create(req, res, next) {
    try {
      this.validate(req.body);
      const item = await this.model.query().insert(req.body);
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  }

  // Загальний метод оновлення
  async update(req, res, next) {
    const { id } = req.params;
    try {
      this.validate(req.body);
      const updatedItem = await this.model.query().findById(id).patch(req.body);
      res.json(updatedItem);
    } catch (error) {
      next(error);
    }
  }

  // Загальний метод отримання по ID
  async getById(req, res, next) {
    const { id } = req.params;
    try {
      const item = await this.model.query().findById(id);
      if (!item) {
        return res.status(404).json({ message: `${this.model.name} not found` });
      }
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  // Загальний метод отримання всіх елементів
  async getAll(req, res, next) {
    try {
      const items = await this.model.query();
      res.json(items);
    } catch (error) {
      next(error);
    }
  }

  // Загальний метод видалення
  async deleteById(req, res, next) {
    const { id } = req.params;
    try {
      await this.model.query().deleteById(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default BaseController;
