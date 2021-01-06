import School from "../Controllers/School";
import Auth from "../middleware/Auth";
import schoolMideware from "../middleware/school";
import userMiddleWare from "../middleware/user";
import Validator from "../middleware/_validator";
import express from "express";
const router = express.Router();

router.post(
  "/create",
  Validator("schoolSchema"),
  Auth.verifyToken,
  schoolMideware[0],
  userMiddleWare[0],
  School.registerSchool
);
router.put(
  "/update/:schoolid",
  Validator("schoolSchema"),
  Auth.verifyToken,
  userMiddleWare[0],
  School.updateSchool
);
router.get(
  "/:email",
 // Auth.verifyToken,
  //userMiddleWare[0],
  School.getByEmail
);
router.get(
  "/getbyid/:schoolid",
  Auth.verifyToken,
  userMiddleWare[0],
  School.getById
);

export default router;
