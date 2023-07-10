import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Validator } from "node-input-validator";

import userModel from "../models/userModel.js";
import studyMaterialModel from "../models/studyMaterialModel.js";


export const getStudyMaterial = async (req, res) => {

};

export const addStudyMaterial = async (req, res) => {
    try {
        let vld = new Validator(req.body, {
          title: "required|maxLength:30",
          description: "required|maxLength:300",
          fileType: "required|50",
          userId: "required",

          institutionName: "maxLength:100",
          institutionType: "maxLength:50",
          degree: "maxLength:100",
          discipline: "maxLength:50",
          specialization: "maxLength:75",
          standard: "maxLength:15",
        });

        vld = await closed.check();
        if (!vld) return res.sendStatus(400);
        //else if (!req.files) return res.sendStatus(400);

        const user = await userModel.findById(req.body.id).lean();
        if (!user) return res.sendStatus(404);

        const studyMaterial = await studyMaterialModel.create({
            title: req.body.title,
            description: req.body.description,
            fileType: req.body.fileType,
            user: user._id,

            institutionName: req.body.institutionName,
            institutionType: req.body.institutionType,
            degree: req.body.degree,
            discipline: req.body.discipline,
            specialization: req.body.specialization,
            standard: req.body.standard,
        });
        if(!studyMaterial) {
            return res.sendStatus(406);
        }
        if(studyMaterial) {
            if (req.files) {
                req.files.image.mv(`./static/studyMaterial/${fileType}/` + studyMaterial._id + "." + `${fileType}`);
            }
            return res.sendStatus(202);
        }
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
};

export const editStudyMaterial = async (req, res) => {
    try {
      let vld = new Validator(req.body, {
        title: "required|maxLength:30",
        description: "required|maxLength:300",
        fileType: "required|50",
        userId: "required",

        institutionName: "maxLength:100",
        institutionType: "maxLength:50",
        degree: "maxLength:100",
        discipline: "maxLength:50",
        specialization: "maxLength:75",
        standard: "maxLength:15",

        studyMaterialId: "required"
      });

      vld = await closed.check();
      if (!vld) return res.sendStatus(400);
      //else if (!req.files) return res.sendStatus(400);

      const user = await userModel.findById(req.body.userId).lean();
      if (!user) return res.sendStatus(404);
      const studyMaterial = await studyMaterialModel.findById(req.body.studyMaterialId).lean();
      if (!studyMaterial) return res.sendStatus(404);

      const newStudyMaterial = await studyMaterialModel.updateOne(
        {_id : studyMaterial._id},
        {
            $set: {
                title: req.body.title,
                description: req.body.description,
                fileType: req.body.fileType,
                user: user._id,

                institutionName: req.body.institutionName,
                institutionType: req.body.institutionType,
                degree: req.body.degree,
                discipline: req.body.discipline,
                specialization: req.body.specialization,
                standard: req.body.standard,
            },
        }
      );
      if (!newStudyMaterial) {
        return res.status(406);
      }
      if(newStudyMaterial) {
        if (
          studyMaterial.fileType === "jpg" ||
          studyMaterial.fileType === "png" ||
          studyMaterial.fileType === "pdf"
        ) {
          fs.unlink(
            `./static/studyMaterial/${fileType}/` +
              req.query.id +
              "." +
              `${fileType}`,
            function (err) {
              if (err) return console.log(err);
            }
          );
        }
        if (req.files) {
                req.files.image.mv(`./static/studyMaterial/${fileType}/` + newStudyMaterial._id + "." + `${fileType}`);
            }
        return res.status(202);
      }
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
};

export const deleteStudyMaterial = async (req, res) => {
    try {
        let vld = new Validator(req.query, {
          id: "required",
          fileType: "required"
        });
        vld = await vld.check();
        if (!vld) return res.sendStatus(400);

        const studyMaterial = await studyMaterialModel.findOneAndDelete({ _id: req.query.id });
        if(!studyMaterial) {
            res.sendStatus(406);
        }
        if(book) {
            if(fileType === "jpg" || fileType === "png" || fileType === "pdf") {
                fs.unlink(`./static/studyMaterial/${fileType}/` + req.query.id + "." + `${fileType}`, function (err) {
                  if (err) return console.log(err);
                });
            }
            res.sendStatus(204);
        }
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
};

export const searchStudyMaterial = async (req, res) => {

};

