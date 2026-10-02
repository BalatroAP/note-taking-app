import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/User.js";

export default class AuthController {
  static register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(401).json({ error: "missing credential field" });
    }

    if (await UserModel.findOne({ email })) {
      return res.status(401).json({ error: "email already used" });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT),
    );

    try {
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(200).json({ message: "success" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }
  };

  static login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "missing credential field" });
    }

    try {
      let isMatch, accessToken, refreshToken;
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ error: "email does not exist in database" });
      }

      isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "invalid credentials" });
      }

      accessToken = this.generateToken(
        { id: user._id, username: user.username, email: user.email },
        "accessToken",
        "15m",
      );
      refreshToken = this.generateToken(
        { id: user._id, username: user.username, email: user.email },
        "refreshToken",
        "7d",
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        accessToken,
        user: { id: user._id, email: user.email, username: user.username },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }
  };

  static refreshToken = async (req, res) => {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ error: "No refresh token provided" });
    }
    try {
      const decoded = jwt.verify(token, "refreshToken");
      const user = await UserModel.findOne({ _id: decoded.id });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      console.log(user);

      const newAccessToken = this.generateToken(
        {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        "accessToken",
        "15m",
      );

      res.status(200).json({
        accessToken: newAccessToken,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (err) {}
  };

  static logout = async (req, res) => {
    try {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  };

  static generateToken = (data, secret, expiration) => {
    return jwt.sign(data, secret, { expiresIn: expiration });
  };
}
