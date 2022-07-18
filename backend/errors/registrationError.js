const { REGISTRATION_CODE } = require('../utils/constants');

class RegistrationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = REGISTRATION_CODE;
  }
}

module.exports = RegistrationError;
