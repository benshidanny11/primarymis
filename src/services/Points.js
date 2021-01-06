import e from "express";
import db from "../database/connection/query";
import {
  create,
  addCatTwoPoint,
  addExamPoint,
  getBysubjects,
  getByStudent,
  getByClass,
  getBysubjectsInTerm,
  getByStudentInTerm,
  getByClassInTerm,
  update,
  checkIfItsNoFirst,
  updatePositions,
  createPosition,
  totalStudentMarks
} from "../database/queries/Points";
import {getReportSumationInTerm,getReportSumationInYear} from '../helpers/pointshelper';

class Points {
  async create(data) {
    let points = await db.query(create, data);
    if (points) {
      const {studentid,levelid,term}=points.rows[0];
      const totalStudentMarksRes=await db.query(totalStudentMarks,[data[5],data[0],term]);
    
      
      const {totalstudentmarks:totalstudentmarks1}=totalStudentMarksRes.rows[0];
      let itsNotFrst=await db.query(checkIfItsNoFirst,[studentid,levelid,term]);
      if(itsNotFrst.rows[0]){
       //Udate her
       const martsToUpdate=totalstudentmarks1;
       const positonsUpdate=await  db.query(updatePositions,[martsToUpdate,studentid,term,levelid]);
       if(positonsUpdate.rowCount){
        return {
          status: 200,
          message: "Points added",
          response: points,
        };
       }else{
        return {
          status: 400,
          message: "Error occured on update positions",
        };
       }
  
      }else{
        const marksToCreate=totalstudentmarks1;
        const positonsCreate=await  db.query(createPosition,[data[5],data[7],data[0],marksToCreate]);
        if(positonsCreate.rows[0]){
          return {
            status: 200,
            message: "Points added",
            response: points,
          };
        }else{
          return {
            status: 400,
            message: "Error occured on create positions",
          };
        }
     
      }
    } else {
      return {
        status: 400,
        message: "Error occured",
        response: [],
      };
    }
  }
  async update(data) {
    let points = await db.query(update, data);
    if (points) {
      return {
        status: 200,
        message: "Points updated",
        response: points,
      };
    } else {
      return {
        status: 400,
        message: "Error occured",
        response: [],
      };
    }
  }
  async addCatTwoPoint(data) {
    let points = await db.query(addCatTwoPoint, data);
    if (points) {
      return {
        status: 200,
        message: "Points added",
        points: points,
      };
    } else {
      return {
        status: 400,
        message: "Error occured",
        points: [],
      };
    }
  }
  async addExamPoint(data) {
    let points = await db.query(addExamPoint, data);
    if (points) {
      return {
        status: 200,
        message: "Points added",
        points: points,
      };
    } else {
      return {
        status: 400,
        message: "Error occured",
        points: [],
      };
    }
  }
  async getBysubjects(data) {
    let points = await db.query(getBysubjects, data);
    if (points.rowCount) {
      return {
        status: 200,
        message: "data found",
        response: points,
      };
    } else {
      return {
        status: 400,
        message: "data not found",
        response: points,
      };
    }
  }
  async getByStudent(data) {
    let points = await db.query(getByStudent, data);
    const {studentid,levelid}=points.rows[0];
    const marksReport=await getReportSumationInYear([studentid,levelid]);
    points.rows.push(marksReport);
    if (points.rowCount) {
      return {
        status: 200,
        message: "data found",
        response: points,
      };
    } else {
      return {
        status: 400,
        message: "data not found",
        response: points,
      };
    }
  }
  async getByClass(data) {
    let points = await db.query(getByClass, data);
    if (points.rowCount) {
      return {
        status: 200,
        message: "data found",
        response: points,
      };
    } else {
      return {
        status: 400,
        message: "data not found",
        response: points,
      };
    }
  }
  async getBysubjectsInTerm(data) {
    let points = await db.query(getBysubjectsInTerm, data);
    if (points.rowCount) {
      return {
        status: 200,
        message: "data found",
        response: points,
      };
    } else {
      return {
        status: 400,
        message: "data not found",
        response: points,
      };
    }
    
  }
  async getByStudentInTerm(data) {
    let points = await db.query(getByStudentInTerm, data);
    if (points.rowCount) {


      const {studentid,levelid,term}=points.rows[0];
 
      const marksReport=await getReportSumationInTerm([studentid,levelid,term]);
      points.rows.push(marksReport);
  
      return {
        status: 200,
        message: "data found",
        response: points,
      };
    } else {
      return {
        status: 400,
        message: "data not found",
        response: points,
      };
    }
    
 

  }
  async getByClassInTerm(data) {
    let points = await db.query(getByClassInTerm, data);
    if (points.rowCount) {
      return {
        status: 200,
        message: "data found",
        response: points,
      };
    } else {
      return {
        status: 400,
        message: "data not found",
        response: points,
      };
    }
  }
}
export default new Points();
