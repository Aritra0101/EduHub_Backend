import fs from 'fs';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Validator } from "node-input-validator";

import userModel from '../models/userModel.js';

const saltRounds = bcrypt.genSaltSync(15);


export const getUser = async (req, res) => {
  try {
    let vld = new Validator(req.query, {
      id: "required",
    });
    vld = await vld.check();
    if(!vld) return res.status(400);

    const user = await userModel.findOne({ _id: req.query.id});
    if(!user) {
      return res.send(404);
    }
    if(user) {
      return res.sendStatus(200).json({ user });
    }
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

export const loginUser = async (req, res) => {
  try {
    let vld = new Validator(req.body, {
      email: "required|email|maxLength:50",
      password: "required|minLength:8|maxLength:25",
    });

    vld = await vld.check();
    if(!vld) return res.status(400);

    // const user = userModel.findOne({ email: req.body.email });
    // if(!user) {
    //  res.status(404); 
    // }
    // if(user) {
    //   bcrypt.compare(req.body.password, user.password, (err, result) => {
    //     if(result) {
    //       const token = jwt.sign(
    //         { data: student },
    //         process.env.JWT_KEY,
    //         { expiresIn: "24h" }
    //       );
    //     } else {
    //       return res.sendStatus(401);
    //     }
    //   });
    // }

    const user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "User does't exists." });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);

    res.status(200).json({ token, user });

  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

export const deleteUser = async (req, res) => {
  try {
    let vld = new Validator(req.query, {
      id: "reqired",
    });
    vld = await vld.check();
    if(!vld) return res.status(400);

    const user = await userModel.deleteOne({ _id: req.query.id});
    if(!user) {
      return res.send(406);
    }
    if(user) {
      fs.unlink("./static/user/dp/" + id + ".jpg", (err) => {
        if (err) return console.log(err);
      }); 
      return res.send(204);
    }
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

export const studentRegister = async (req, res) => {
  try {
    let vld = new Validator(req.body, {
      fName: "required|maxLength:25",
      lName: "required|maxLength:50",
      userName: "required|maxLength:50",
      email: "required|email|maxLength:50",
      phone: "required|maxLength:15",
      password: "required|minLength:8",
      gender: "maxLength:25",
      bloodGroup: "maxLength:5",      
      dateOfBirth: "required",
      pinCode: "required|min:100000|max:999999",
      about: "maxLength:500",

      institutionName: "maxLength:100",
      institutionType: "maxLength:50",
      degree: "maxLength:100",
      discipline: "maxLength:50",
      specialization: "maxLength:75",
      standard: "maxLength:15",
    });
    vld = await vld.check();
    if (!vld) return res.sendStatus(400);
    else if (!req.files || !req.files.image) return res.sendStatus(400);

    const user = await userModel.findOne({ $or: [{email: req.body.email}, {phone: req.body.phone}, {userName: req.body.userName}] });
    if(user) {
      return res.sendStatus(409);
    }
    if(!user) {
      const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
      const register = await userModel.create({
        fName: req.body.fName,
        lName: req.body.lName,
        userName: req.body.userName,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword,
        role: 1,
        gender: req.body.gender,
        bloodGroup: req.body.bloodGroup,
        dateOfBirth: req.body.dateOfBirth,
        pinCode: req.body.pinCode,
        about: req.body.about,
        institutionName: req.body.institutionName,
        institutionType: req.body.institutionType,
        degree: req.body.degree,
        discipline: req.body.discipline,
        specialization: req.body.specialization,
        standard: req.body.standard,
      });
      if (!register) {
        return res.sendStatus(406);
      }
      if (register) {
        req.files.image.mv("./static/user/dp/" + register._id + ".jpg");
        return res.sendStatus(200);
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

export const teacherRegister = async (req, res) => {
 try {
    let vld = new Validator(req.body, {
      fName: "required|maxLength:25",
      lName: "required|maxLength:50",
      userName: "required|maxLength:50",
      email: "required|email|maxLength:50",
      phone: "required|maxLength:15",
      password: "required|minLength:8",
      gender: "maxLength:25",
      bloodGroup: "maxLength:5",      
      dateOfBirth: "required",
      pinCode: "required|min:100000|max:999999",
      about: "maxLength:500",

      experience: "required|min:0|max:75",
      occupation: "required|maxLength:75"
    });
    vld = await vld.check();
    if (!vld) return res.sendStatus(400);
    else if (!req.files || !req.files.image) return res.sendStatus(400);

    const user = await userModel.find({ $or: [{email: req.body.email}, {phone: req.body.phone}, {userName: req.body.userName}] });
    if(user) {
      return res.sendStatus(409);
    }
    if(!user) {
      const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
      const register = await userModel.create({
        fName: req.body.fName,
        lName: req.body.lName,
        userName: req.body.userName,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword,
        role: 2,
        gender: req.body.gender,
        bloodGroup: req.body.bloodGroup,
        dateOfBirth: req.body.dateOfBirth,
        pinCode: req.body.pinCode,
        about: req.body.about,
        experience: req.body.experience,
        occupation: req.body.occupation,
      });
      if(!register) {
        return res.sendStatus(406);
      }
      if (register) {
        req.files.image.mv("./static/user/dp/" + register._id + ".jpg");
        return res.sendStatus(200);
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

export const checkUserName = async (req, res) => {
  try {
    let vld = new Validator(req.body, {
      userName: "required|maxLength:50",
    });
    vld = await vld.check();
    if (!vld) return res.sendStatus(400);

    const userName = userModel.findOne({ userName: req.body.userName });
    if(!userName) {
      return res.sendStatus(202);
    }
    if(userName) {
      return res.sendStatus(409);
    }

  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

export const addFollower = async (req, res) => {

};

export const removeFollower = async (req, res) => {

};

export const addFollowing = async (req, res) => {

};

export const removeFollowing = async (req, res) => {

};

export const savePost = async (req, res) => {

}

export const unSavePost = async (req, res) => {

}

