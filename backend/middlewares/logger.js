const winston = require('winston');
const expressWinston = require('express-winston');

module.exports.requestLogger = expressWinston.logger({
  transports: [
    new winston.transport.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

module.exports.errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transport.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});
