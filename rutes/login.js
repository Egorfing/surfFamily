const router = require('express').Router();
const bcrypt = require("bcrypt");
const User = require("../models/user")

router
  .route("/")
  .get((req, res) => {
    res.render("login");
  })
  .post(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.locals.isLogin = true
      console.log(user);
      req.session.user = user;
      res.redirect('/');
    } else {
      res.redirect("/login");
    }
  });


module.exports = router;
