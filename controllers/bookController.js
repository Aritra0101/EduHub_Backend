import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Validator } from "node-input-validator";

import bookModel from "../models/bookModel.js";

export const getBook = async (req, res) => {
  try {
    let vld = new Validator(req.body, {
      id: "required",
    });

    vld = await vld.check();
    if (!vld) return res.sendStatus(400);

    const book = await bookModel.findOne({ _id: req.body.id });
    if (book) {
      return res.sendStatus(200).json({ book });
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

export const addBook = async (req, res) => {
  try {
    let vld = new Validator(req.body, {
      bookName: "required",
      description: "required",
      author: "required",
      publication: "required",
      edition: "required",

      userId: "required",
      userType: "required",
      userFullName: "required",
      userPinCode: "required",
      userPhone: "required",
      userEmail: "required",
    });

    vld = await vld.check();
    if (!vld) return res.sendStatus(400);

    const book = await bookModel.create({
      bookName: req.body.bookName,
      description: req.body.description,
      author: req.body.author,
      publication: req.body.publication,
      edition: req.body.edition,

      userId: req.body.userId,
      userType: req.body.userType,
      userFullName: req.body.userFullName,
      userPinCode: req.body.userPinCode,
      userPhone: req.body.userPhone,
      userEmail: req.body.userEmail,
    });

    if (book) {
      req.files.image.mv("./static/book/" + book._id + ".jpg");
      return res.sendStatus(201);
    }
    return res.sendStatus(406);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

export const deleteBook = async (req, res) => {
  try {
    let vld = new Validator(req.body, {
      id: "required",
    });

    vld = await vld.check();
    if (!vld) return res.sendStatus(400);

    const book = await bookModel.findOne({ _id: req.body.id });
    if (book) {
      bookModel
        .deletedOne({ _id: req.body.id })
        .then((data) => {
            fs.unlink("./book/id.jpg", function (err) {
              if (err) return console.log(err);
            });  
          res.sendStatus(200);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(406);
        });
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

export const editBook = async (req, res) => {};
