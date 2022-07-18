const { ACCESS_DENIED_CODE } = require('../utils/constants');

class AccessDeniedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ACCESS_DENIED_CODE;
  }
}

module.exports = AccessDeniedError;
