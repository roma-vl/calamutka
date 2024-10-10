const { Model } = require('objection');

class BaseModel extends Model {
  static get QueryBuilder() {
    throw new Error('Not implemented');
  }

  get updatedAtISO() {
    return this.updatedAt.toISOString();
  }

  get createdAtISO() {
    return this.createdAt.toISOString();
  }
}

module.exports = BaseModel;
