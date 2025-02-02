import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token || req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ msg: "Unauthorized: No token provided" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ msg: "Invalid or expired token" });
    }
  };

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden: Insufficient Permissions' });
        }
        next();
    };
};

export { authMiddleware, authorizeRoles };