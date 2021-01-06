import ClassControler from "../Controllers/ClassControler";
import express from "express";
import userMiddleWare from '../middleware/user';
import pointsMiddleWare from "../middleware/_Points";
import Auth from "../middleware/Auth";
import Validator from "../middleware/_validator";
const router = express.Router();
router.post(
  "/createclass",
   Validator("createClass"),
  Auth.verifyToken,
  userMiddleWare[5],
  pointsMiddleWare.isLevelExists,
  pointsMiddleWare.isTeacherExist,
  ClassControler.addClass
);


router.get(
  "/classes/:levelid",
  Auth.verifyToken,
  ClassControler.getAllClassesByLevel
);
router.get(
    "/classes",
    Auth.verifyToken,
    ClassControler.getAll
  );
router.get(
  "/:classid",
  Auth.verifyToken,
  ClassControler.getClassById
);

export default router;
