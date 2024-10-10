class BaseError {
  static getErrorMessage(code) {
    return BaseError.errors[code] ? BaseError.errors[code] : null;
  }

  static get errors() {
    throw new Error('Not implemented');
  }
}

module.exports = BaseError;
