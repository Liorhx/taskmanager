const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(403).send("Access denied.");
    // console.log("Token:", authHeader);

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(403).send("Access denied.");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
