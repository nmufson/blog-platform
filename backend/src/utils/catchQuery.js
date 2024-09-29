async function catchQuery(queryFunction) {
  try {
    return await queryFunction();
  } catch (err) {
    console.error('Database query error:', err.message);
    throw err; // Rethrow the error to allow further handling
  }
}

module.exports = catchQuery;
