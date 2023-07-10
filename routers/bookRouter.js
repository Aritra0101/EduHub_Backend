import express from 'express';
const router = express.Router();

import { getBook, addBook, deleteBook, editBook } from "../controllers/bookController.js";

router.get('/getBook', getBook);
router.post('/addBook', addBook);
router.patch('/editBook', editBook);
router.delete('/deleteBook', deleteBook);


export default router;
