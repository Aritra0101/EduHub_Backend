import express from 'express';
const router = express.Router();

import userController from "../controllers/userController.js";


router.post('/student/login', userController.studentLogin);
router.post('/student/register', userController.studentRegister);
router.post('/teacher/login', userController.teacherLogin);
router.post('/teacher/register', userController.teacherRegister);



export default router;