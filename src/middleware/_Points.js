import db from "../database/connection/query";
import { getOne } from "../database/queries/Subjects";

import { getStudentById } from "../database/queries/Student";

import { getById } from "../database/queries/Level";

import { getTeacherById } from "../database/queries/User";
import { avoidDuplicates,checkIfCatMaxIsOut,checkIfExamMaxIsOut } from "../database/queries/Points";

export default {
  avoidDuplicate: async (req, res, next) => {
    const values= [req.body.studentid,req.body.levelid,req.body.subjectname,req.body.term,req.body.year];
    db.query(avoidDuplicates,values).then((pointRes) => {
      if (pointRes.rowCount) {
        res.status(400).send({
          status: 400,
          message: "Marks already exist!",
        });
      } else {
        next();
      }
    });
  },
  isLevelExists: async (req, res, next) => {
    const values= [req.body.levelid];
    db.query(getById,values).then((result) => {
      if (result.rowCount) {
        next();
      } else {
        res.status(400).send({
          status: 400,
          message: "Level doen't exist!",
        });
     
      }
    });
  },
  isSubjectExist: async (req, res, next) => {
    const values= [req.body.subjectname,req.body.levelid];
    db.query(getOne,values).then((result) => {
      if (result.rowCount) {
        next();
      } else {
        res.status(400).send({
          status: 400,
          message: `Subject doen't exist in this level !`,
        });
     
      }
    });
  },
  isStudentExist: async (req, res, next) => {
    const values= [req.body.studentid];
    db.query(getStudentById,values).then((result) => {
      if (result.rowCount) {
        next();
      } else {
        res.status(400).send({
          status: 400,
          message: "Student doen't exist!",
        });
     
      }
    });
  },
  isTeacherExist: async (req, res, next) => {
    const values= [req.body.teacherid];
    db.query(getTeacherById,values).then((result) => {
      if (result.rowCount) {
        next();
      } else {
        res.status(400).send({
          status: 400,
          message: "Teacher doen't exist!",
        });
     
      }
    });
  },
  isCatmaxOut: async (req, res, next) => {
    const values= [req.body.subjectname,req.body.levelid];
  
    db.query(checkIfCatMaxIsOut,values).then((result) => {
      if (result.rowCount) {
        console.log(result.rows[0].catmax);
       // console.log(result.rows[0].catcatmax);
        if(result.rows[0].catmax<req.body.catone||result.rows[0].catmax<req.body.cattwo){
          res.status(400).send({
            status: 400,
            message: `Cat one marks or cat two marks should not be greater than ${result.rows[0].catmax}`,
          });
        }else{
          next();
        }     
      }
    });
  },
  isExamMaxOut: async (req, res, next) => {
    const values= [req.body.subjectname,req.body.levelid];
    db.query(checkIfExamMaxIsOut,values).then((result) => {

      //[ { exammax: 40 } ]
     
      if (result.rowCount) {

        if(result.rows[0].exammax<req.body.exam){
          res.status(400).send({
            status: 400,
            message: `Exam marks should not be greater than ${result.rows[0].exammax}`,
          });
        }else{
          next();
        }     
      }

    });
  },
  isUpdateCatmaxOut: async (req, res, next) => {
    const values= [req.params.subjectname,req.params.levelid];
  
    db.query(checkIfCatMaxIsOut,values).then((result) => {
      if (result.rowCount) {
        console.log(result.rows[0].catmax);
       // console.log(result.rows[0].catcatmax);
        if(result.rows[0].catmax<req.body.catone||result.rows[0].catmax<req.body.cattwo){
          res.status(400).send({
            status: 400,
            message: `Cat one marks or cat two marks should not be greater than ${result.rows[0].catmax}`,
          });
        }else{
          next();
        }     
      }
    });
  },
  isUpdateExamMaxOut: async (req, res, next) => {
    const values= [req.params.subjectname,req.params.levelid];
    db.query(checkIfExamMaxIsOut,values).then((result) => {

      //[ { exammax: 40 } ]
     
      if (result.rowCount) {

        if(result.rows[0].exammax<req.body.exam){
          res.status(400).send({
            status: 400,
            message: `Exam marks should not be greater than ${result.rows[0].exammax}`,
          });
        }else{
          next();
        }     
      }

    });
  },
};
