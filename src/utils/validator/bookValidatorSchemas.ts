import * as yup from 'yup';
import { OrderDir } from '../constants';

const isNumberRegExp = /^[0-9]+$/;

const getAllBooks = {
  query: {
    page: yup.string().matches(isNumberRegExp, 'Bad page number'),
    limit: yup.string().matches(isNumberRegExp, 'Bad limit number'),
    genres: yup.string(),
    priceFrom: yup.string().matches(isNumberRegExp, 'Wrong price value'),
    priceTo: yup.string().matches(isNumberRegExp, 'Wrong price value'),
    order: yup.string().oneOf(['price', 'title', 'author', 'averageRate', 'dateOfIssue']),
    orderDir: yup.string().oneOf([OrderDir.asc, OrderDir.desc]),
    value: yup.string(),
    user: yup.number(),
  },
};

const getOneBook = {
  params: {
    id: yup.string().matches(isNumberRegExp, 'Bad URL'),
  },
};

const addComment = {
  body: {
    bookId: yup.number().required(),
    text: yup.string().trim().min(1).required(),
  },
};

const setRating = {
  body: {
    bookId: yup.number().required(),
    rating: yup.number().min(1).max(5).required(),
  },
};

export const handleFavorites = {
  body: {
    bookId: yup.number().min(1).required(),
  },
};

export default {
  getAllBooks,
  getOneBook,
  addComment,
  setRating,
  handleFavorites,
};
