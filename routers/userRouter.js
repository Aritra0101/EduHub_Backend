import express from 'express';
const router = express.Router();

import { checkUserName, studentLogin, studentRegister, teacherLogin, teacherRegister } from "../controllers/userController.js";


router.post('/student/login', studentLogin);
router.post("/student/register", studentRegister);
router.post("/teacher/login", teacherLogin);
router.post("/teacher/register", teacherRegister);

router.post("/checkUserName", checkUserName);



export default router;