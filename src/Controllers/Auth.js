import moment from "moment";
import AuthService from "../services/AuthServices";
import bcrypt from "bcrypt";
class AuthController {
  async createAccount(req, res) {
    const values = [
      req.body.names,
      req.body.email,
      req.body.phonenumber,
      req.body.role,
      bcrypt.hashSync(req.body.password, 10),
      "1",
      moment(new Date()),
    ];
    AuthService.create(values)
      .then((results) => {
        res.status(201).send({
          token: results.token,
          status: 201,
          message: "User created Successfully",
          user: results.user.rows,
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: 400,
          Error: err.message,
        });
      });
  }
  async login(req, res) {
    const data = [req.body.email, req.body.password];
    AuthService.login(data)
      .then((results) => {
        if (results.user != undefined) {
          res.status(200).send({
            token: results.token,
            status: 200,
            message: results.message,
            user: results.user.rows,
          });
        } else {
          res.status(400).send({
            status: 400,
            message: results.message,
          });
        }
      })
      .catch((err) => {
        res.status(400).send({
          status: 400,
          error: err,
        });
      });
  }
  async updateuser(req, res) {
    const values = [
      req.params.userid,
      req.body.names,
      req.body.email,
      req.body.phonenumber,
      req.body.role,
    ];
    AuthService.updateUser(values)
      .then((results) => {
        if (results.user.rowCount) {
          res.status(201).send({
            status: 201,
            message: results.message,
            users: results.user.rows,
          });
        } else {
          res.status(400).send({
            status: 400,
            message: results.message,
          });
        }
      })
      .catch((err) => {
        res.status(400).send({
          status: 400,
          error: err.message,
        });
      });
  }
  // change password
  async passwordRest(req, res) {
    const values = [req.body.userid, bcrypt.hashSync(req.body.password, 10)];
    AuthService.updatePassword(values)
      .then((user) => {
        res.status(user.status).send({
          status: user.status,
          message: user.message,
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: 400,
          error: err.message,
        });
      });
  }
  // deleting user permently from database
  async deleteuser(req, res) {
    AuthService.deleteuser([req.params.userid])
      .then((user) => {
        res.status(user.status).send({
          status: user.status,
          message: user.message,
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: 400,
          message: err.message,
        });
      });
  }
  // deliting user by disabling their account
  async hideuser(req, res) {
    AuthService.hideuser([req.params.userid])
      .then((user) => {
        res.status(user.status).send({
          status: user.status,
          message: user.message,
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: 400,
          message: err.message,
        });
      });
  }
  // getting all data from database
  async getAll(req, res) {
    AuthService.getAll()
      .then((users) => {
        res.status(users.status).send({
          status: users.status,
          message: users.message,
          users: users.users.rows,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message,
        });
      });
  }
  // getting one user
  async getById(req, res) {
    AuthService.findById([req.params.userid])
      .then((user) => {
        res.status(user.status).send({
          status: user.status,
          message: user.message,
          user: user.user.rows,
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: 400,
          message: err.message,
        });
      });
  }
  //getting all teachers( user with teacher role)
  async getTeachers(req, res) {
    AuthService.findAllTeachers()
      .then((users) => {
        res.status(users.status).send({
          status: users.status,
          message: users.message,
          teachers: users.teachers.rows,
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: 400,
          message: err.message,
        });
      });
  }
  // get user by email
  async findByEmail(req, res) {
    AuthService.findByEmail([req.body.email])
      .then((user) => {
        res.status(user.status).send({
          status: user.status,
          message: user.message,
          user: user.user.rows,
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: 400,
          error: err.message,
        });
      });
  }
}
export default new AuthController();
