import express from "express";
import SubjectController from "../Controllers/SubjectController";
import Auth from "../middleware/Auth";
import Subject from "../middleware/Subject";
import Validator from "../middleware/_validator";
import userMiddleWare from '../middleware/user';
const router = express.Router();
router.post(
  "/create",
  Validator("createSubject"),
  Auth.verifyToken,
  //Auth.notTeacher,
  Subject.checkSubjects,
  SubjectController.addSubject
);
router.get("/all", Auth.verifyToken, 
 userMiddleWare[5],
 SubjectController.getAll);
router.get("/:teacherid",
 Auth.verifyToken, 
 SubjectController.getAllByTeacher);
router.get(
  "/levels/:levelid",
  Auth.verifyToken,
  SubjectController.getAllByLevel
);
router.put(
  "/update/:subjectname/:levelid",
  Auth.verifyToken,
  userMiddleWare[5],
  SubjectController.update
);
router.delete(
  "/delete/:subjectname/:levelid",
  Auth.verifyToken,
  userMiddleWare[5],
  SubjectController.deleteSubject
);
export default router;
