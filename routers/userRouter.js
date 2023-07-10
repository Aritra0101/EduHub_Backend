import express from "express";
const router = express.Router();

import {
  checkUserName,
  getUser,
  loginUser,
  studentRegister,
  teacherRegister,
  deleteUser,
  addFollower,
  removeFollower,
  addFollowing,
  removeFollowing,
} from "../controllers/userController.js";

router.get("/getUser", getUser);
router.post("/login", loginUser);
router.delete("/deleteUser", deleteUser);
router.post("/student/register", studentRegister);
router.post("/teacher/register", teacherRegister);

router.post("/checkUserName", checkUserName);

router.post("/addFollower", addFollower);
router.post("/removeFollower", removeFollower);
router.post("/addFollowing", addFollowing);
router.post("/removeFollowing", removeFollowing);




// router.patch("/teacher", editTeacher);
// router.patch("/student", editStudent);

export default router;
