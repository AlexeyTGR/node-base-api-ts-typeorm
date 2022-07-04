import * as express from 'express';
import createValidatorMiddleware from '../utils/validator/validator';
import getAllBooks from '../controllers/bookControllers/getAllBooks';
import getOneBook from '../controllers/bookControllers/getOneBook';
import getAllGenres from '../controllers/bookControllers/getAllGenres';
import validator from '../utils/validator/bookValidatorSchemas';
import setRating from '../controllers/bookControllers/setRating';
import addComment from '../controllers/bookControllers/addComment';
import getRecommendations from '../controllers/bookControllers/getRecommendations';
import { checkAuth, readUserFromToken } from '../middleware/checkAuth';
import getFavorites from '../controllers/bookControllers/getFavorites';
import addToFavorites from '../controllers/bookControllers/addToFavorites';
import removeFromFavorites from '../controllers/bookControllers/removeFromFavorites';

export const bookRouter = express.Router();

bookRouter.get('/all', readUserFromToken, createValidatorMiddleware(validator.getAllBooks), getAllBooks);
bookRouter.get('/genres', getAllGenres);
bookRouter.post('/rate', checkAuth, createValidatorMiddleware(validator.setRating), setRating);
bookRouter.post('/add-comment', checkAuth, createValidatorMiddleware(validator.addComment), addComment);
bookRouter.get('/recommendations', readUserFromToken, getRecommendations);
bookRouter.get('/favorites', checkAuth, getFavorites);
bookRouter.post('/add-favorites', checkAuth, createValidatorMiddleware(validator.handleFavorites), addToFavorites);
bookRouter.delete('/remove-favorites', checkAuth, createValidatorMiddleware(validator.handleFavorites), removeFromFavorites);
bookRouter.get('/:id', readUserFromToken, createValidatorMiddleware(validator.getOneBook), getOneBook);
