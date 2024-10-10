const { QueryBuilder } = require('objection');

class BaseQueryBuilder extends QueryBuilder {
  idIn(ids) {
    return this.whereIn(`${this._getTableName()}.id`, ids.concat([0]));
  }

  idNotIn(ids) {
    return this.whereNotIn(`${this._getTableName()}.id`, ids);
  }

  whereLike(field, like) {
    return this.where(field, 'LIKE', `%${like}%`);
  }

  whereNotLike(field, like) {
    return this.whereNot(field, 'LIKE', `%${like}%`);
  }

  orWhereLike(field, like) {
    return this.orWhere(field, 'LIKE', `%${like}%`);
  }

  _getTableName() {
    return this._modelClass.tableName;
  }

  get MAX_LIMIT() {
    return 100;
  }

  get DEFAULT_LIMIT() {
    return 10;
  }

  applyFilter(filter) {
    if (filter.idIn) {
      this.idIn(filter.idIn);
    }
    if (filter.idNotIn) {
      this.idNotIn(filter.idNotIn);
    }

    return this;
  }

  setPaging(limit, offset) {
    const preparedLimit = limit || this.DEFAULT_LIMIT;
    if (preparedLimit || this.MAX_LIMIT) {
      this.limit(
        this.MAX_LIMIT === null || limit <= this.MAX_LIMIT ? preparedLimit : this.MAX_LIMIT,
      );
    }

    this.offset(offset || 0);

    return this;
  }
  
}

module.exports = BaseQueryBuilder;
