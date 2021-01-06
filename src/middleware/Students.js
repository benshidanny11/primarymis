import db from "../database/connection/query";
import {
  checkStudentExist,
  checkExistOnUpdate,
  getStudentById
} from "../database/queries/Student";

class Student {
  async checkStudent(req, res, next) {
    let student = await db.query(checkStudentExist, [
      req.body.studentnames,
      req.body.parentsphonenumber,
    ]);
    //res.send(student);
    if (!student.rowCount) {
      next();
    } else {
      res.status(400).send({
        status: 400,
        message: "student exist in  database!",
      });
    }
  }
  async checkExistById(req, res, next) {
    let student = await db.query(getStudentById, [
      req.params.id,
    ]);
    if (!student.rowCount) {
      res.status(400).send({
        status: 400,
        message: "student doesn't exist in  database!",
      });

    } else {
      next();
    }
  }
  async checkExist(req, res, next) {
    let student = await db.query(checkExistOnUpdate, [
      req.body.studentnames,
      req.body.parentsphonenumber,
      req.params.id,
    ]);
    if (!student.rowCount) {
      next();
    } else {
      res.status(400).send({
        status: 400,
        message: "student names exist in  database!",
      });
    }
  }
}
export default new Student();
