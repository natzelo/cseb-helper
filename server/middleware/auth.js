const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "blackmamba");
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error("User not found");
    } else {
      req.user = user;
    }

    next();
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};
module.exports = auth;
