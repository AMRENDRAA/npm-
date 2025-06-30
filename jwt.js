require("dotenv").config();

const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  // eXTRACT THE jwt token from the request headers

  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      error: "invalid token ",
    });
  }
};

//Function to generate token

const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "1h" });
};
module.exports = { jwtAuthMiddleware, generateToken };
