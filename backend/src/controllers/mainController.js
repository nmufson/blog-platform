async function getHomePage(req, res) {
  const data = {
    title: 'Home Page',
    message: 'Welcome to the Home Page!',
  };

  res.json(data);
}

async function getAboutPage(req, res) {
  const data = {
    title: 'About Page',
    message: 'Welcome to the About Page!',
  };

  res.json(data);
}

module.exports = {
  getHomePage,
  getAboutPage,
};
