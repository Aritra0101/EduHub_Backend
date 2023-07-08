import express from 'express';
const router = express.Router();

import bookController from "../controllers/bookController.js";

router.get('/getBook', bookController.getBook);
router.post('/addBook', bookController.addBook);
router.patch('/editBook', bookController.editBook);
router.delete('/deleteBook', bookController.deleteBook);


export default router;