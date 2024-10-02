const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const userServices = require('../services/userServices'); // Adjust the path to your User model

const opts = {
  // how to extract the JWT from incoming requests
  // looks for token in Authorization header in the format Bearer <token>
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  // registers new JWT strategy with passport
  new Strategy(opts, async (jwtPayload, done) => {
    try {
      // Find the user based on the payload
      const user = await userServices.getUserById(jwtPayload.id); // Adjust this based on your user model
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }),
);

// creates middleware for auth based on the JWT strategy we just defined
// checks for vlaid JWT in the incoming request
const authenticate = passport.authenticate('jwt', { session: false });

module.exports = authenticate;
