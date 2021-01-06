import AuthController from "../Controllers/Auth";
import Auth from "../middleware/Auth";
import Validator from "../middleware/_validator";
import userMiddleWare from '../middleware/user';
import express from "express";
const router = express.Router();
router.post(
  "/users/create",
  Validator("createUser"),
  Auth.verifyToken,
  userMiddleWare[0],
  userMiddleWare[4],
  AuthController.createAccount
);
router.post("/login",Validator("login"), AuthController.login);
router.put(
  "/users/update/:userid",
  Validator("updateUser"),
  Auth.verifyToken,
  userMiddleWare[0],
  userMiddleWare[3],
  AuthController.updateuser
);
router.delete(
  "/users/delete/:userid",
  Auth.verifyToken,
  userMiddleWare[0],
  AuthController.deleteuser
);
router.put(
  "/users/disactivate/:userid",
  Auth.verifyToken,
  userMiddleWare[0],
  AuthController.hideuser
);
router.get(
  "/users/all",
  Auth.verifyToken,
  userMiddleWare[0],
  AuthController.getAll
);
router.get(
  "/users/:userid",
  Auth.verifyToken,
  userMiddleWare[0],
  AuthController.getById
);

router.get(
  "/teachers/",
  Auth.verifyToken,
  userMiddleWare[0],
  AuthController.getTeachers
);
router.post("/resetpassowrd", Validator("resetPassword"), AuthController.passwordRest);
export default router;
