import express from 'express';
const router = express.Router();

import { checkUserName, studentLogin, studentRegister, teacherLogin, teacherRegister } from "../controllers/userController.js";


router.post('/user/student/login', studentLogin);
router.post("/user/student/register", studentRegister);
router.post("/user/teacher/login", teacherLogin);
router.post("/user/teacher/register", teacherRegister);

router.post("/user/checkUserName", checkUserName);



export default router;