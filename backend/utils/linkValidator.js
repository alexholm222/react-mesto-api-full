const { REGEX } = require('./constants');

module.exports.linkValidator = (url, validBody) => {
  if (REGEX.test(url)) {
    return url;
  }
  return validBody.message('Неверный формат ссылки');
};
