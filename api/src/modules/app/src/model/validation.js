class BaseValidation {
  constructor() {
    // Можна визначити загальні налаштування для валідації, якщо потрібно
  }

  createSchema() {
    throw new Error('Not implemented');
  }

  updateSchema() {
    throw new Error('Not implemented');
  }

  deleteSchema() {
    throw new Error('Not implemented');
  }

  async validateCreating(data) {
    return await this.validateAsync(data, this.createSchema());
  }

  async validateUpdating(data) {
    return await this.validateAsync(data, this.updateSchema());
  }

  async validateDeleting(data) {
    return await this.validateAsync(data, this.deleteSchema());
  }

  async validateAsync(data, schema) {
    let errors = [];
    try {
      console.log("Validating data:", data); // Логування вхідних даних
      const value = await schema.validateAsync(data, { abortEarly: false });
      console.log("Validation passed:", value); // Логування успішної валідації
      return {
        data: value,
        errors
      };
    } catch (validationError) {
      console.error("Validation error:", validationError.details); // Логування помилок валідації
      errors = this.formatValidationErrors(validationError.details);
      return {
        data,
        errors
      };
    }
  }


  formatValidationErrors(errors) {
    return errors.map(err => {
      switch (err.type) {
        case 'string.empty':
          return {
            field: err.context.label,
            message: `Поле ${err.context.label} не повинно бути порожнім.`
          };
        case 'any.required':
          return {
            field: err.context.label,
            message: `Поле ${err.context.label} є обов'язковим.`
          };
        case 'number.positive':
          return {
            field: err.context.label,
            message: `Поле ${err.context.label} повинно бути додатнім числом.`
          };
        default:
          return {
            field: err.context.label,
            message: `Помилка в полі ${err.context.label}: ${err.message}`
          };
      }
    });
  }


}

export default BaseValidation;
