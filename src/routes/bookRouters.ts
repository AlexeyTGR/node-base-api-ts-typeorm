import * as express from 'express';
import createValidatorMiddleware from '../utils/validator/validator';
import getAllBooks from '../controllers/bookControllers/getAllBooks';
import getOneBook from '../controllers/bookControllers/getOneBook';
import validator from '../utils/validator/bookValidatorSchemas';

export const bookRouter = express.Router();

bookRouter.get('/all', getAllBooks);
bookRouter.get('/:id', createValidatorMiddleware(validator.getOneBook), getOneBook);
