function errorHandler(err, req, res, next) {
  console.error('Error stack trace:', err.stack);
  console.error('Error message:', err.message);

  const statusCode = err.status || 500;

  let userFriendlyMessage = 'An unexpected error occurred';

  if (statusCode === 404) {
    userFriendlyMessage = 'The requested resource was not found';
  } else if (statusCode === 400) {
    userFriendlyMessage = 'Bad Request. Please check the input and try again.';
  } else if (statusCode === 403) {
    userFriendlyMessage =
      'Access denied. You do not have permission to view this resource.';
  }

  // use err.message for 500 errors or if no custom message exists
  const message = statusCode === 500 ? err.message : userFriendlyMessage;

  res.status(statusCode).render('error', {
    title: `Error ${statusCode}`,
    message,
    statusCode,
  });
}

module.exports = errorHandler;
