const jwt = require("jsonwebtoken");

const token = jwt.sign(
  { id: "1", role: "admin" },
  "TMS_SECRET",
  { expiresIn: "1h" }
);

console.log("Copy this token to frontend localStorage:");
console.log(token);
