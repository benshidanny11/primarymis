import express from "express";
import PointsController from "../Controllers/PointsController";
import Validator from "../middleware/_validator";
import pointsMiddleWare from "../middleware/_Points";
import Auth from "../middleware/Auth";
import userMiddleWare from "../middleware/user";
const router = express.Router();

router.post(
  "/create",
  Validator("createPoints"),
  Auth.verifyToken,
  userMiddleWare[1],
  pointsMiddleWare.isTeacherExist,
  pointsMiddleWare.isStudentExist,
  pointsMiddleWare.isLevelExists,
  pointsMiddleWare.isSubjectExist,
  pointsMiddleWare.avoidDuplicate,
  pointsMiddleWare.isCatmaxOut,
  pointsMiddleWare.isExamMaxOut,
  PointsController.create
);

router.put(
  "/update/:levelid/:subjectname/:studentid",
  Validator("updatePoints"),
  Auth.verifyToken,
  userMiddleWare[1],
  pointsMiddleWare.isUpdateCatmaxOut,
  pointsMiddleWare.isUpdateExamMaxOut,
  PointsController.update
);
//get point of subject in year
router.get(
  "/all/:levelid/:subjectname/:year",
  Auth.verifyToken,
  PointsController.getBysubjects
);
// get subject marks in specfied academic year and term
router.get(
  "/AllInterm/:levelid/:subjectname/:term/:year/:pagenumber",
  Auth.verifyToken,
  PointsController.getBysubjectsInTerm
);
//get student points in term for specific academic year
router.get(
  "/studentspoints/:studentid/:levelid/:term/:year",
   Auth.verifyToken,
  PointsController.getByStudentInTerm
);
//get students points in year
router.get(
  "/studentsAll/:studentid/:year",
  Auth.verifyToken,
  PointsController.getByStudents
);
router.get("/classAll/:classid/:year", 
Auth.verifyToken, 
PointsController.getByClass);
router.get(
  "/classAllInTerm/:classid/:term/:year",
  Auth.verifyToken,
  PointsController.getByClassInTerm
);
// search points by students
router.get(
  "/search/:levelid/:subjectname/:term/:year/:searchData",
  Auth.verifyToken,
  PointsController.searchPointByStudent
);
export default router;
