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
  // Auth.verifyToken,
  // userMiddleWare[1],
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
router.get(
  "/all/:levelid/:subjectname",
  Auth.verifyToken,
  PointsController.getBysubjects
);
router.get(
  "/AllInterm/:levelid/:subjectname/:term",
  Auth.verifyToken,
  userMiddleWare[1],
  PointsController.getBysubjectsInTerm
);
router.get(
  "/studentspoints/:studentid/:levelid/:term",
   Auth.verifyToken,
  PointsController.getByStudentInTerm
);
router.get(
  "/studentsAll/:studentid",
  Auth.verifyToken,
  PointsController.getByStudents
);
router.get("/classAll/:classid", Auth.verifyToken, PointsController.getByClass);
router.get(
  "/classAllInTerm/:classid/:term",
  Auth.verifyToken,
  PointsController.getByClassInTerm
);

export default router;
