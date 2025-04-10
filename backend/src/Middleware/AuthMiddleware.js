import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config/config.js";

const authenticateToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Token is not provided",
        status: false,
      });
    }

    const decodedToken = jwt.verify(token, JWT_KEY);
    if (!decodedToken) {
      return res.status(403).json({
        message: "Token is not valid",
        status: false,
      });
    }
    req.id = decodedToken.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default authenticateToken;
