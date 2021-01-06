import db from "../database/connection/query";
import {
    getOne
} from "../database/queries/Subjects";

class Subject {
  async checkSubjects(req, res, next) {
    let subjects = await db.query(getOne, [
      req.body.subjectname,
      req.body.levelid,
    ]);
    //res.send(student);
    if (!subjects.rowCount) {
      next();
    } else {
      res.status(400).send({
        status: 400,
        message: "subjects exist in our database!",
      });
    }
  }
}
export default new Subject();