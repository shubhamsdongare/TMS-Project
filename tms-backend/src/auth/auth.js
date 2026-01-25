const jwt = require("jsonwebtoken");

module.exports = (req) => {
  const token = req.headers.authorization || "";
  if (!token) return null;

  try {
    return jwt.verify(token, "TMS_SECRET");
  } catch {
    return null;
  }
};
