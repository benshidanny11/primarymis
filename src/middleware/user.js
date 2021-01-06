import db from "../database/connection/query";
import { getByEmail, checkExist } from "../database/queries/User";

export default [
  //Is user head master[0]
  async (req, res, next) => {
    let { email } = req.user;
    db.query(getByEmail, [email])
      .then(({ rows }) => {
        if (rows[0].role === "HEAD_MASTER") {
          next();
        } else {
          res.status(403).send({
            status: 403,
            message: "unauthorized User",
          });
        }
      })
      .catch((err) => {
        res.send({
          error: err.message,
        });
      });
  },
  //Is user teacher[1]
  (req, res, next) => {
    let { email } = req.user;
    db.query(getByEmail, [email])
      .then(({ rows }) => {
        if (rows[0].role === "TEACHER") {
          next();
        } else {
          res.status(403).send({
            status: 403,
            message: "unauthorized User",
          });
        }
      })
      .catch((err) => {
        res.send({
          error: err.message,
        });
      });
  },
  //Is user DOS[2]
  async (req, res, next) => {
    let { email } = req.user;
    db.query(getByEmail, [email])
      .then(({ rows }) => {
        if (rows[0].role === "DOS") {
          next();
        } else {
          res.status(403).send({
            status: 403,
            message: "unauthorized User",
          });
        }
      })
      .catch((err) => {
        res.send({
          error: err.message,
        });
      });
  },
  //check if email exist on updating user[3]
  async (req, res, next) => {
    const email = req.body.email;
    db.query(checkExist, [req.params.userid, email])
      .then((user) => {
        if (user.rows.length == 0) {
          next();
        } else {
          res.status(400).send({
            status: 400,
            error: "email already exist in database!",
          });
        }
      })
      .catch((err) => {
        res.send({
          error: err.message,
        });
      });
  },
  //Check user exits on create[4]
  async (req, res, next) => {
    const email = req.body.email;
    db.query(getByEmail, [email])
      .then((user) => {
        if (user.rows.length == 0) {
          next();
        } else {
          res.status(400).send({
            status: 400,
            error: "email already exist in database!",
          });
        }
      })
      .catch((err) => {
        res.send({
          error: err.message,
        });
      });
  },
  //Is user head master or dos[5]
  async (req, res, next) => {
    let { email } = req.user;
   
    db.query(getByEmail, [email])
      .then(({ rows }) => {
        if (rows[0].role === "HEAD_MASTER" || rows[0].role === "DOS") {
          next();
        } else {
          res.status(403).send({
            status: 403,
            message: "unauthorized User",
          });
        }
      })
      .catch((err) => {
        res.send({
          error: err.message,
        });
      });
  },
];
