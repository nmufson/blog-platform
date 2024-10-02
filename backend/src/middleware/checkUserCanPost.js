const userServices = require('../services/userServices');

async function checkUserCanPost(req, res, next) {
  const { userId } = req.body;

  const user = await userServices.getUserById(userId);
  if (!user || !user.canPost) {
    return res
      .status(403)
      .json({ error: 'User does not have permission to post' });
  }

  next(); // Proceed to the next middleware or controller
}

module.exports = checkUserCanPost;
