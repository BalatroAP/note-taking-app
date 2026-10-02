import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/User.js";

export default class AuthController {
  static async register(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(401).json({ error: "missing credential field" });
    }

    if (await UserModel.findOne({ email: email })) {
      return res.status(401).json({ error: "email already used" });
    }

    try {
      const newUser = new UserModel({ username, email, password });
      await newUser.save();
      res.status(200).json({ message: "success" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }
  }

  static async login() {}
}
