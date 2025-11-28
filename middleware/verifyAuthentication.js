import jwt from "jsonwebtoken";
import * as authModel from "../models/authModel.js";

export const verifyAuthentication = async (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  const refreshToken = req.cookies["refresh-token"];

  if (!accessToken && !refreshToken) {
    req.user = null;
    return next();
  }
  if (accessToken) {
    try {
      req.user = jwt.verify(accessToken, process.env.JWT_SECRET);
      return next();
    } catch (error) {
      console.log(error.message);
      req.user = null;
    }
  }
  if (refreshToken) {
  try {
    const session = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    console.log("Session", session);

    const sessionDetails = await authModel.getSessionById(session.sessionId);
    console.log("ss", sessionDetails);

    if (sessionDetails && sessionDetails.valid) {
      const userDetails = await authModel.getUserById(sessionDetails.user_id);

      if (userDetails) {
        const user = {
          id: userDetails.id,
          name: userDetails.name,
          email: userDetails.email,
          sessionId: session.sessionId,
        };

        const accessToken = jwt.sign(user, process.env.JWT_SECRET, {
          expiresIn: "20m",
        });

        const refreshToken = jwt.sign(          // FIXED
          { sessionId: session.sessionId },
          process.env.JWT_REFRESH_SECRET,
          { expiresIn: "7d" }
        );

        const baseConfig = {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
        };

        res.cookie("access-token", accessToken, {
          ...baseConfig,
          maxAge: 20 * 60 * 1000,
        });

        res.cookie("refresh-token", refreshToken, {
          ...baseConfig,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        req.user = user;
      }
    }

    return next();
  } catch (error) {
    console.log(error.message);
    req.user = null;
  }
}
console.log("Cookies:", req.cookies);
console.log("Access token:", accessToken);
console.log("Refresh token:", refreshToken);
console.log("User before next():", req.user);
  next();
};

export const requireAuth = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Please login" });
  next();
};
