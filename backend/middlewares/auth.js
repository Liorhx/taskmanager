const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(403).send("Access denied.");

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(403).send("Access denied.");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // 1. Check if the error is specifically due to time expiration
    if (error.name === "TokenExpiredError") {
      return res.status(401).send("Token expired");
    }

    // 2. Handle generic structural issues or fake tokens
    res.status(400).send("Invalid token");
  }
};
