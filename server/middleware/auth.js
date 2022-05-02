const User = require("../model/User");

let auth = (req, res, next) => {
  let token = req.cookies.x_auth;
  if (!token) {
    return res.json({ isAuth: false, error: true });
  }
  User.findByToken(token, (err, user) => {
    // console.log("req", res);
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };