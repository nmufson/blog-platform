function errorHandler(err, req, res, next) {
  console.error('Error stack trace:', err.stack);
  console.error('Error message:', err.message);

  const statusCode = err.status || 500; // Default to 500 if no status is set

  // Default user-friendly messages based on the status code
  let userFriendlyMessage = 'An unexpected error occurred';

  if (statusCode === 404) {
    userFriendlyMessage = 'The requested resource was not found';
  } else if (statusCode === 400) {
    userFriendlyMessage = 'Bad Request. Please check the input and try again.';
  } else if (statusCode === 403) {
    userFriendlyMessage =
      'Access denied. You do not have permission to view this resource.';
  }

  // Use err.message only for 500-level errors or if no custom message exists
  const message = statusCode === 500 ? err.message : userFriendlyMessage;

  res.status(statusCode).render('error', {
    title: `Error ${statusCode}`,
    message,
    statusCode,
  });
}

module.exports = errorHandler;
