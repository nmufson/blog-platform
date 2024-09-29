function errorHandler(err, req, res, next) {
  console.error('Error stack trace:', err.stack);
  console.error('Error message:', err.message);

  res.status(err.status || 500).render('error', {
    title: 'Error',
    message: err.message || 'An unexpected error occurred',
    // Optionally include more context or a user-friendly message
  });
}

module.exports = errorHandler;
