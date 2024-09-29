async function getHomePage(req, res) {
  const data = {
    title: 'Home Page',
    message: 'Welcome to the Home Page!',
  };

  res.json(data);
}

module.exports = {
  getHomePage,
};
