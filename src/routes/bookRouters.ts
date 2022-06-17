import * as express from 'express';
import createValidatorMiddleware from '../utils/validator/validator';
import getAllBooks from '../controllers/bookControllers/getAllBooks';
import getOneBook from '../controllers/bookControllers/getOneBook';
import getAllGenres from '../controllers/bookControllers/getAllGenres';
import validator from '../utils/validator/bookValidatorSchemas';
import setRating from '../controllers/bookControllers/setRating';
import addComment from '../controllers/bookControllers/addComment';
import getRecommendations from '../controllers/bookControllers/getRecommendations';

export const bookRouter = express.Router();

bookRouter.get('/all', createValidatorMiddleware(validator.getAllBooks), getAllBooks);
bookRouter.get('/genres', getAllGenres);
bookRouter.post('/rate', createValidatorMiddleware(validator.setRating), setRating);
bookRouter.post('/addComment', createValidatorMiddleware(validator.addComment), addComment);
bookRouter.get('/recommendations', getRecommendations);
bookRouter.get('/:id', createValidatorMiddleware(validator.getOneBook), getOneBook);
