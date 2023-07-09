import express from "express";
const router = express.Router();

import {
  checkUserName,
  getUser,
  loginUser,
  studentRegister,
  teacherRegister,
  deleteUser,
} from "../controllers/userController.js";

router.get("/getUser", getUser);
router.post("login", loginUser);
router.delete("/deleteUser", deleteUser);
router.post("/student/register", studentRegister);
router.post("/teacher/register", teacherRegister);

router.post("/checkUserName", checkUserName);




// router.patch("/teacher", editTeacher);
// router.patch("/student", editStudent);

export default router;
