const errorHandler = async (error, req, res, next) => {
  // console.log(err);
  switch (error.name) {
    case 'JsonWebTokenError':
    case 'TokenExpiredError':
    case 'Unauthorized':
      res.status(401).json({
        message: 'Please Login First',
      });
      break;
    case 'SequelizeUniqueConstraintError':
    case 'SequelizeValidationError':
      res.status(400).json({
        statusCode: 400,
        error: {
          message: error.errors[0].message,
        },
      });
      break;
    case 'Forbidden':
      res.status(403).json({
        message: 'Forbidden',
      });
      break;
    default:
      res.status(500).json({
        statusCode: 500,
        error: {
          message: 'Internal Server Error',
        },
      });
      break;
  }
};

module.exports = errorHandler;
