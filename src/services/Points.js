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
  totalStudentMarks,
  searchPointByStudent,
  countROwsBySubjectsInTerm
} from "../database/queries/Points";
import {getReportSumationInTerm,getReportSumationInYear} from '../helpers/pointshelper';

class Points {
  async create(data) {
    let points = await db.query(create, data);
    if (points) {
      const {studentid,levelid,term,year}=points.rows[0];
      const totalStudentMarksRes=await db.query(totalStudentMarks,[data[5],data[0],term,year]);
    
      
      const {totalstudentmarks:totalstudentmarks1}=totalStudentMarksRes.rows[0];
      let itsNotFrst=await db.query(checkIfItsNoFirst,[studentid,levelid,term,year]);
      if(itsNotFrst.rows[0]){
       //Udate her
       const martsToUpdate=totalstudentmarks1;
       const positonsUpdate=await  db.query(updatePositions,[martsToUpdate,studentid,term,levelid,year]);
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
        const positonsCreate=await  db.query(createPosition,[data[5],data[7],data[0],marksToCreate,data[8]]);
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
    // console.log(points.rows[0])
    const {studentid,levelid,year}=points.rows[0];
    const marksReport=await getReportSumationInYear([studentid,levelid,year]);
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

  /*
  [
      req.params.levelid,
      req.params.subjectname,
      req.params.term,
      req.params.year,
      req.params.pagenumber
    ]
   */
  async getBysubjectsInTerm(data) {
    const offset=(data[4]-1)*5;
    const getTotalPoints=await db.query(countROwsBySubjectsInTerm,[data[0],data[1],data[2],data[3]]);
    let points = await db.query(getBysubjectsInTerm, [data[0],data[1],data[2],data[3],offset]);

    if (points.rowCount) {
      return {
        status: 200,
        message: "data found",
        response: points,
        totaPages:Math.ceil(getTotalPoints.rows.length/5)
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


      const {studentid,levelid,term,subjectname,year}=points.rows[0];
 
      const marksReport=await getReportSumationInTerm([studentid,levelid,term,subjectname,year]);
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

  async searchPointByStudent(data) {
    let points = await db.query(searchPointByStudent, data);
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
