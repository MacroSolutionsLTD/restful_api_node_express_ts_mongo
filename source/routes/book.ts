import express, { Router } from 'express';
import controller from '../controllers/book';

const router = express.Router();

router.post('/create/book', controller.createBook);
router.get('/get/books', controller.getAllBooks);
router.get('/get/book/:id', controller.getBook);
router.patch('/update/book/:id', controller.updateBook);
router.delete('/delete/book/:id', controller.deleteBook);

export = router;
