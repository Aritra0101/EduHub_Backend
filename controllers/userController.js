import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Validator } from "node-input-validator";

import studentModel from "../models/studentModel.js";
import teacherModel from "../models/teacherModel.js";

const saltRounds = bcrypt.genSaltSync(15);



export const studentLogin = async (req, res) => {
  try {
        let vld = new Validator(req.body, {
          email: "required|email|maxLength:50",
          password: "required|minLength:8|maxLength:25",
        });
    
        vld = await vld.check();
        if (!vld) return res.sendStatus(400);
    
        studentModel.findOne({ email: req.body.email, role: 1 }, (err, doc) => {
          if (doc) {
            bcrypt.compare(req.body.password, doc.password, (err, result) => {
              if (result) {
                const token = jwt.sign(
                  {
                    data: doc,
                  },
                  process.env.JWT_KEY,
                  { expiresIn: "1h" }
                );
    
                return res.sendStatus(202).json({ token });
              } else {
                return res.sendStatus(401);
              }
            });
          } else {
            return res.sendStatus(404);
          }
        });
      } catch (error) {
        console.error(error);
        return res.status(500);
      }
};

export const studentRegister = async (req, res) => {
  try {
    let vld = new Validator(req.body, {
      email: "required|email|maxLength:50",
      password: "required|minLength:8|maxLength:15",
      fName: "required|maxLength:50",
      lName: "required|maxLength:50",
      userName: "required|maxLength:50",
      phone: "required|maxLength:15",
      dateOfBirth: "required",
      bloodGroup: "required",
      pinCode: "required",
      institutionName: "required",
      institutionType: "required",
      standard: "required",
    });

    vld = await vld.check();
    if (!vld) return res.sendStatus(400);

    const sUser = await studentModel.findOne({ email: req.body.email }).lean();
    const tUser = await teacherModel.findOne({ email: req.body.email }).lean();
    if (sUser || tUser){
      return res.sendStatus(409);
    } else {
      const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

      const signUp = await teacherModel.create({
          fName: req.body.fName,
          lName: req.body.lName,
          userName: req.body.userName,
          email: req.body.email,
          phone: req.body.phone,
          password: hashedPassword,
          bloodGroup: req.body.bloodGroup,
          dateOfBirth: req.body.dateOfBirth,
          pinCode: req.body.pinCode,
          institutionName: req.body.institutionName,
          institutionType: req.body.institutionType,
          standard: req.body.standard,
        }).lean();
     
      if (signUp) {
        return res.sendStatus(200);
      }
      return res.sendStatus(406);
    }
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

export const teacherLogin = async (req, res) => {
  try {
        let vld = new Validator(req.body, {
          email: "required|email|maxLength:50",
          password: "required|minLength:8|maxLength:25",
        });
    
        vld = await vld.check();
        if (!vld) return res.sendStatus(400);
    
        teacherModel.findOne({ email: req.body.email, role: 2 }, (err, doc) => {
          if (doc) {
            bcrypt.compare(req.body.password, doc.password, (err, result) => {
              if (result) {
                const token = jwt.sign(
                  {
                    data: doc,
                  },
                  process.env.JWT_KEY,
                  { expiresIn: "1h" }
                );
    
                return res.sendStatus(202).json({ token });
              } else {
                return res.sendStatus(401);
              }
            });
          } else {
            return res.sendStatus(404);
          }
        });
      } catch (error) {
        console.error(error);
        return res.status(500);
      }
};

export const teacherRegister = async (req, res) => {
  try {
    let vld = new Validator(req.body, {
      email: "required|email|maxLength:50",
      password: "required|minLength:8|maxLength:15",
      fName: "required|maxLength:50",
      lName: "required|maxLength:50",
      userName: "required|maxLength:50",
      phone: "required|maxLength:15",
      dateOfBirth: "required",
      bloodGroup: "required",
      pinCode: "required",
      experience: "required",
      occupation: "required",
    });

    vld = await vld.check();
    if (!vld) return res.sendStatus(400);

    const tUser = await teacherModel.findOne({ email: req.body.email }).lean();
    const sUser = await studentModel.findOne({ email: req.body.email }).lean();
    if (tUser || sUser){
      return res.sendStatus(409);
    } else {
      const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

      const signUp = await teacherModel.create({
          fName: req.body.fName,
          lName: req.body.lName,
          userName: req.body.userName,
          email: req.body.email,
          phone: req.body.phone,
          password: hashedPassword,
          bloodGroup: req.body.bloodGroup,
          dateOfBirth: req.body.dateOfBirth,
          pinCode: req.body.pinCode,
          experience: req.body.experience,
          occupation: req.body.occupation,
        }).lean();
     
      if (signUp) {
        return res.sendStatus(200);
      }
      return res.sendStatus(406);
    }
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

