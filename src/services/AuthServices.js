import db from "../database/connection/query";
import { generateToken } from "../helpers/_auth";
import Auth from "../middleware/Auth";
import bcrypt from "bcrypt";
import {
  getByEmail,
  create,
  update,
  deleteuser,
  getAll,
  getById,
  getByRole,
  hideuser,
  updatePassword,
} from "../database/queries/User";

class AuthService {
  async create(data) {
    const payload = {
      names: data[0],
      email: data[1],
      phonenumber: data[2],
      role: data[3],
    };
    let token = await generateToken(payload);
    let user = await db.query(create, data);
    return {
      user: user,
      token: token,
    };
  }
  async login(data) {
    let user = await db.query(getByEmail, [data[0]]);
    if (user.rowCount) {
      if (bcrypt.compareSync(data[1], user.rows[0].password)) {
        const payload = {
          names: user.rows[0].names,
          email: user.rows[0].email,
          phonenumber: user.rows[0].phonenumber,
          role: user.rows[0].role,
          userid:user.rows[0].userid
        };
        let token = await generateToken(payload);
        return {
          token: token,
          user: user.rows,
          message: "sussesfully logged in",
        };
      } else {
        return {
          message: "password is incorrect",
        };
      }
    } else {
      return {
        message: "Invalid email",
      };
    }
  }
  async updateUser(data) {
    let user = await db.query(update, data);
    if (user.rowCount) {
      return {
        message: "user updated",
        user: user,
      };
    } else {
      return {
        message: "oops! user not updated",
      };
    }
  }
  async updatePassword(data) {
    let user = await db.query(updatePassword, data);
    if (user.rowCount) {
      return {
        message: "password changed",
        status: 200,
      };
    } else {
      return {
        message: "oops! password not changed",
        status: 400,
      };
    }
  }
  // to delete user permently
  async deleteuser(data) {
    let user = await db.query(deleteuser, data);
    if (user.rowCount) {
      return {
        status: 200,
        message: "user deleted",
      };
    } else {
      return {
        status: 400,
        message: "User doesn't exist",
      };
    }
  }
  //to delete user by disabling their account
  async hideuser(data) {
    let user = await db.query(hideuser, data);
    if (user.rowCount) {
      return {
        status: 200,
        message: "user deleted",
      };
    } else {
      return {
        status: 400,
        message: "user not deleted",
      };
    }
  }
  // getting all users in database
  async getAll() {
    let users = await db.query(getAll);
    if (users.rows.length != 0) {
      return {
        status: 200,
        users: users,
        message: "data found",
      };
    } else {
      return {
        status: 400,
        message: "no data to display",
        users: [],
      };
    }
  }
  // find user by id
  async findById(data) {
    let user = await db.query(getById, data);
    if (user.rowCount) {
      return {
        status: 200,
        message: "user found",
        user: user,
      };
    } else {
      return {
        status: 400,
        message: "user not found",
        user: [],
      };
    }
  }
  // find user by teacher role(getting al teachers in database)

  async findAllTeachers() {
    let teachers = await db.query(getByRole);
    if (teachers.rows.length != 0) {
      return {
        status: 200,
        message: "found",
        teachers: teachers,
      };
    } else {
      return {
        status: 400,
        message: "data not found",
        teachers: [],
      };
    }
  }
  // find user by email
  async findByEmail(data) {
    let user = await db.query(getByEmail, data);
    if (user.rowCount) {
      return {
        status: 200,
        message: "user found",
        user: user,
      };
    } else {
      return {
        status: 400,
        message: "user not found",
        user: [],
      };
    }
  }
}
export default new AuthService();
