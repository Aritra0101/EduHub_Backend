import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Validator } from "node-input-validator";

import userModel from "../models/userModel.js";
import bookModel from "../models/bookModel.js";

export const getBook = async (req, res) => {
  try {
    let vld = new Validator(req.query, {
      id: "required",
    });
    vld = await vld.check();
    if (!vld) return res.sendStatus(400);

    const book = await bookModel.findOne({ _id: req.query.id });
    if(!book) {
      return res.sendStatus(404);
    }
    if (book) {
      return res.sendStatus(200).json({ book });
    }
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

export const addBook = async (req, res) => {
  try {
    let vld = new Validator(req.body, {
      book: "required|maxLength:100",
      description: "required|maxLength:250",
      author: "required|maxLength:150",
      publication: "required|maxLength:150",
      edition: "required|maxLength:25",
      price: "required",

      userId: "required",
    });

    vld = await vld.check();
    if (!vld) return res.sendStatus(400);
    else if (!req.files) return res.sendStatus(400);

    const user = await userModel.findById(req.body.id).lean();
    if (!user) return res.sendStatus(404);

    const book = await bookModel.create({
      bookName: req.body.book,
      description: req.body.description,
      author: req.body.author,
      publication: req.body.publication,
      edition: req.body.edition,
      price: req.body.price,

      user: user,
    });

    if(!book) {
      return res.sendStatus(406);
    }
    if (book) {
      req.files.image.mv("./static/book/photo" + book._id + ".jpg");
      return res.sendStatus(202);
    }
    
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

export const editBook = async (req, res) => {
  try {
    let vld = new Validator(req.body, {
      book: "required|maxLength:100",
      description: "required|maxLength:250",
      author: "required|maxLength:150",
      publication: "required|maxLength:150",
      edition: "required|maxLength:25",
      price: "required",

      userId: "required",
      bookId: "required",
    });

    vld = await vld.check();
    if (!vld) return res.sendStatus(400);
    else if (!req.files || !req.files.image) return res.sendStatus(400);

    const user = await userModel.findById(req.body.userId).lean();
    if (!user) return res.sendStatus(404);
    const book = await bookModel.findById(req.body.bookId).lean();
    if (!book) return res.sendStatus(404);

    const newBook = await bookModel.updateOne(
      { user: userId },
      {
        $set: {
          book: req.body.book,
          description: req.body.description,
          author: req.body.author,
          publication: req.body.publication,
          edition: req.body.edition,
          price: req.body.price,
        },
      }
    );
    if (!newBook) {
      return res.sendStatus(406);
    }
    if (newBook) {
      req.files.image.mv("./static/book/" + book._id + ".jpg");
      return res.sendStatus(202);
    }
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

export const deleteBook = async (req, res) => {
  try {
    let vld = new Validator(req.query, {
      id: "required",
    });
    vld = await vld.check();
    if (!vld) return res.sendStatus(400);

    const book = await bookModel.deleteOne({ _id: req.query.id });
    if(!book) {
      res.sendStatus(406);
    }
    if(book) {
      fs.unlink("./static/book/photo/id.jpg", function (err) {
        if (err) return console.log(err);
      });
      res.sendStatus(204);
    }
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};
