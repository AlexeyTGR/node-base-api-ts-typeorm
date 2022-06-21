import * as express from 'express';
import createValidatorMiddleware from '../utils/validator/validator';
import getAllBooks from '../controllers/bookControllers/getAllBooks';
import getOneBook from '../controllers/bookControllers/getOneBook';
import getAllGenres from '../controllers/bookControllers/getAllGenres';
import validator from '../utils/validator/bookValidatorSchemas';
import setRating from '../controllers/bookControllers/setRating';
import addComment from '../controllers/bookControllers/addComment';
import getRecommendations from '../controllers/bookControllers/getRecommendations';
import createCheckAuthMiddleware from '../middleware/createCheckAuthMiddleware';
import { readUserFromToken } from '../middleware/checkAuth';

export const bookRouter = express.Router();

bookRouter.get('/all', readUserFromToken, createValidatorMiddleware(validator.getAllBooks), getAllBooks);
// .get('/all-with-user',checkAuth,createValidatorMiddleware(validator.getAllBooks),getAllBooks)
bookRouter.get('/genres', getAllGenres);
bookRouter.post('/rate', createValidatorMiddleware(validator.setRating), setRating);
bookRouter.post('/addComment', createValidatorMiddleware(validator.addComment), addComment);
bookRouter.get('/recommendations', createCheckAuthMiddleware('public'), getRecommendations);
bookRouter.get('/:id', createCheckAuthMiddleware('public'), createValidatorMiddleware(validator.getOneBook), getOneBook);
