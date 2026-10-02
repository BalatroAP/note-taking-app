import jwt from "jsonwebtoken";

export default class AuthMiddleware {
  static verifyToken = (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader) {
      res.status(401).json({ error: "no token provided" });
    }

    token = authHeader.split(" ")[1];
    jwt.verify(token, "accessToken", (err, user) => {
      if (err) {
        return res.status(403).json({ error: "invalid token" });
      }
      req.user = user;
      next();
    });
  };
}
