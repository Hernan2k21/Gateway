const [  SCHEMA_VALIDATION_ERROR] = [
    'SCHEMA_VALIDATION_ERROR',
  ];
  
  class BaseError extends Error {
    constructor() {
      super();
  
      if (Error.hasOwnProperty('captureStackTrace')) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        Object.defineProperty(this, 'stack', {
          value: new Error().stack,
        });
      }
    }
  }
  
  class SchemaValidationError extends BaseError {
    constructor(params = {}) {
      super(params);
        
      this.name =  SCHEMA_VALIDATION_ERROR;
      this.httpCode = 400;

      this.message= params.details[0].message;
  
      this.path = params.details[0].path;
    }
  }
  module.exports = {
    SchemaValidationError,
    Constants: [SCHEMA_VALIDATION_ERROR],
  };