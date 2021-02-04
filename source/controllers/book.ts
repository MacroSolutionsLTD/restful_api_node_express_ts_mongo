import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Book from '../models/book';

const createBook = (req: Request, res: Response, next: NextFunction) => {
    let { author, title } = req.body;

    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        author,
        title
    });
    return book
        .save()
        .then((result) => {
            return res.status(201).json({
                book: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getAllBooks = (req: Request, res: Response, next: NextFunction) => {
    Book.find()
        .exec()
        .then((results) => {
            return res.status(200).json({
                books: results,
                count: results.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getBook = (req: Request, res: Response, next: NextFunction) => {
    Book.findById(req.params.id)
        .exec()
        .then((results) => {
            return res.status(200).json({
                books: results
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const updateBook = (req: Request, res: Response, next: NextFunction) => {
    Book.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .exec()
        .then((results) => {
            return res.status(200).json({
                books: results
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const deleteBook = (req: Request, res: Response, next: NextFunction) => {
    Book.remove({ _id: req.params.id })
        .exec()
        .then((results) => {
            return res.status(200).json({
                message: 'Success'
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default { createBook, getBook, updateBook, deleteBook, getAllBooks };
