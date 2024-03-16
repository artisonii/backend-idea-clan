class ErrorWithStatusCode extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorWithStatusCode = (error) => {
  if (error.originalError instanceof ErrorWithStatusCode) {
    return {
      message: error.message,
      statusCode: error.originalError.statusCode,
    };
  }
  //send a generic error message with status code 500
  return;
};

module.exports = { errorWithStatusCode };
