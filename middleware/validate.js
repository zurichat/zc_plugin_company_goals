const Ajv = require('ajv');

const ajv = new Ajv();

const validate = (options = {}) => {
  return (req, _res, next) => {
    try {
      // validate request body
      if (options.body) {
        if (!ajv.validate(options.body, req.body)) {
          throw ajv.errors;
        }
      }

      // Validate request parameters
      if (options.params) {
        if (!ajv.validate(options.params, req.params)) {
          throw ajv.errors;
        }
      }

      // Validate request query
      if (options.query) {
        if (!ajv.validate(options.query, req.query)) {
          throw ajv.errors;
        }
      }
    } catch (e) {
      next(e);
    }
  };
};

module.exports = validate;
