import moment from "moment";
import StudentServices from "../services/StudentServices";
class Students {
  async regesterStudent(req, res) {
    let regNumber = StudentServices.registrationNumber("IPRC");
    const values = [
      req.body.studentnames,
      req.body.parentsemail,
      req.body.parentsphonenumber,
      regNumber,
      moment(new Date()),
      "1",
    ];
    const levelsValues = [req.body.levelid, moment(new Date()).year()];
    const classValues = [req.body.classid, moment(new Date()).year()];
    StudentServices.create(values)
      .then((student) => {
        levelsValues.unshift(student.student.rows[0].studentid);
        classValues.unshift(student.student.rows[0].studentid);
        // inserting level of student
        StudentServices.createLevels(levelsValues);
        //inserting class of student
        StudentServices.createClass(classValues);
        res.status(student.status).send({
          status: student.status,
          message: student.message,
          student: student.student.rows,
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: 400,
          error: err.message,
        });
      });
  }
  async updateStudent(req, res) {
    const values = [
      req.body.studentnames,
      req.body.parentsemail,
      req.body.parentsphonenumber,
      req.params.id,
    ];
    StudentServices.update(values)
      .then((student) => {
        res.status(student.status).send({
          status: student.status,
          message: student.message,
          student: student.student.rows,
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: 400,
          error: err.message,
        });
      });
  }
  async deleteStudent(req, res) {
    StudentServices.deleteStudent([req.params.studentid])
      .then((student) => {
        res.status(student.status).send({
          status: student.status,
          message: student.message,
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
    StudentServices.getAll()
      .then((students) => {
        res.status(students.status).send({
          status: students.status,
          message: students.message,
          students: students.students.rows,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message,
        });
      });
  }
  // getting all data from database by level
  async getAllByLevel(req, res) {
    StudentServices.getAllByLevel([
      req.params.levelid,
      moment(new Date()).year(),
    ])
      .then((students) => {
        res.status(students.status).send({
          status: students.status,
          message: students.message,
          students: students.students.rows,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message,
        });
      });
  }
  // getting all data from database by class
  async getAllByClass(req, res) {
    StudentServices.getAllByClass([
      req.params.classid,
      moment(new Date()).year(),
    ])
      .then((students) => {
        res.status(students.status).send({
          status: students.status,
          message: students.message,
          students: students.students.rows,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message,
        });
      });
  }
  async findById(req, res) {
    StudentServices.getOne([req.params.studentid, moment(new Date()).year()])
      .then((students) => {
        res.status(students.status).send({
          status: students.status,
          message: students.message,
          students: students.students.rows,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message,
        });
      });
  }
}
export default new Students();
