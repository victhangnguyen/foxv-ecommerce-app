//! Not Found - Error Handling
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

//! Error Handling
const errorHandler = (err, req, res, next) => {
  console.log('__Debugger__server__err.statusCode: ', res.statusCode);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  //! Promise return 200 Rejected => 500
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
