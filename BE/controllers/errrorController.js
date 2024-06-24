export const globalErrorHandler = (err, req, res, next) => {
  //   console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || `error`;
  //   console.log(err);
  let insertMessage = "";
  if (err.code === 11000) insertMessage = "Duplication item";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    Description: insertMessage,
    stack: err.stack,
  });
};
