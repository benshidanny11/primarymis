import jwt from "jsonwebtoken";
import db from "../database/connection/query";
import dotenv from "dotenv";
import { getByEmail, checkExist } from "../database/queries/User";
import { decodeToken } from "../helpers/_auth";
import user from "./user";

class Auth {
  constructor() {
    dotenv.config();
  }

  async verifyToken(req, res, next) {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({
        status: 401,
        error: {
          message: "Token is missing",
        },
      });
    }
    try {
      const { email } = await decodeToken(token);
      try {
        const user = await db.query(getByEmail, [email]);

        if (!user.rows[0]) {
          return res.status(400).json({
            status: 400,
            error: {
              message: "Invalid token",
            },
          });
        } else {
          req.token = token;
          req.user = user.rows[0];
          next();
        }
      } catch (error) {
        
        return res.status(500).json({
          status: 500,
          error:error
        });
      }
    } catch (error) {
      if (error.name && error.name === "TokenExpiredError") {
        return res.status(401).json({
          status: 401,
          message: error.message,
        });
      }
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  }
}
export default new Auth();
