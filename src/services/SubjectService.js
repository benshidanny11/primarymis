import db from "../database/connection/query";
import {
  create,
  asignTeacherOnSubject,
  getAll,
  getSubjectByTeacher,
  getByLevel,
  update,
  deleteSubject,
  updateTecherSubject
} from "../database/queries/Subjects";
class SubjectService {
  async create(data) {
    let subject = await db.query(create, data);
    return {
      status: 200,
      message: "subject Added",
      response: subject,
    };
  }
  async asignTeacherOnSubject(data) {
    let result = await db.query(asignTeacherOnSubject, data);
    if (result.rowCount) {
      console.log("subject inserted");
    } else console.log("subject not inserted");
  }
  async getAll() {
    let Subjects = await db.query(getAll);
    if (Subjects.rowCount) {
      return {
        status: 200,
        message: "data found",
        response: Subjects,
      };
    } else {
      return {
        status: 400,
        message: "data not found",
        response: Subjects,
      };
    }
  }
  async getByTeacher(data) {
    let Subjects = await db.query(getSubjectByTeacher, data);
    if (Subjects.rowCount) {
      return {
        status: 200,
        message: "data found",
        response: Subjects,
      };
    } else {
      return {
        status: 400,
        message: "data not found",
        response: Subjects,
      };
    }
  }
  async getByLevel(data) {
    let Subjects = await db.query(getByLevel, data);
    if (Subjects.rowCount) {
      return {
        status: 200,
        message: "data found",
        response: Subjects,
      };
    } else {
      return {
        status: 404,
        message: "data not found",
        response: Subjects,
      };
    }
  }
  async update(data) {

    let subject = await db.query(update, [data[0],data[1],data[2],data[3],data[5]]);
    if (subject.rowCount) {

      let subjectTeacher =await db.query(updateTecherSubject,[data[0],data[4],data[1]]);
      if(subjectTeacher.rowCount){
        return {
          status: 200,
          message: "subject updated",
          subject: subject,
        };
      }
     
    } else {
      return {
        status: 400,
        message: "oops! subject not updated",
        subject: [],
      };
    }
  }
  async deleteSubject(data){
    let subject = await db.query(deleteSubject,data);
    if(subject.rowCount){
        return{
            status: 200,
            message: 'subject deleted',
        }
    }else{
        return{
            status: 400,
            message: 'subject not deleted',
        }
    }
}
}
export default new SubjectService();
