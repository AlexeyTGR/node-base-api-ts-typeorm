import * as express from 'express';
import createValidatorMiddleware from '../utils/validator/validator';
import getAllBooks from '../controllers/bookControllers/getAllBooks';
import getOneBook from '../controllers/bookControllers/getOneBook';
import getAllGenres from '../controllers/bookControllers/getAllGenres';
import validator from '../utils/validator/bookValidatorSchemas';
import searchForValue from '../controllers/bookControllers/searchForValue';
import setRating from '../controllers/bookControllers/setRating';
import addComment from '../controllers/bookControllers/addComment';

export const bookRouter = express.Router();

bookRouter.get('/all', getAllBooks);
bookRouter.get('/genres', getAllGenres);
bookRouter.get('/search', searchForValue);
bookRouter.post('/rate', setRating);
bookRouter.post('/addComment', addComment);
bookRouter.get('/:id', createValidatorMiddleware(validator.getOneBook), getOneBook);
