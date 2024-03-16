require("dotenv").config();
const jwt = require("jsonwebtoken");
const authorization = ({ req }) => {
  const token = req.headers.authorization || "";

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    return { userId: decoded.userId, role: decoded.role };
  } catch (error) {
    return { userId: null };
  }
};

module.exports = { authorization };
