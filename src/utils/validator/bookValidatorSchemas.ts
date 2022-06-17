import * as yup from 'yup';

const isNumberRegExp = /^[0-9]+$/;
const isRatingValueRegExp = /^[0-5]+$/;

const getAllBooks = yup.object().shape({
  query: yup.object().shape({
    page: yup.string().matches(isNumberRegExp, 'Bad page number'),
    limit: yup.string().matches(isNumberRegExp, 'Bad limit number'),
    genres: yup.string(),
    priceFrom: yup.string().matches(isNumberRegExp, 'Wrong price value'),
    priceTo: yup.string().matches(isNumberRegExp, 'Wrong price value'),
    order: yup.string().matches(/(price|title|author|averageRate|dateOfIssue)/),
    orderDir: yup.string().matches(/(ASC|DESC)/),
    value: yup.string(),
  }).noUnknown(true, 'wrong query params'),
});

const getOneBook = yup.object().shape({
  params: yup.object().shape({
    id: yup.string().matches(isNumberRegExp, 'Bad URL').min(1),
  }),
});

const addComment = yup.object().shape({
  body: yup.object().shape({
    book_id: yup.string().required(),
    user_id: yup.string().required(),
    text: yup.string().trim().min(1).required(),
  }).noUnknown(true, 'Bad request'),
});

const setRating = yup.object().shape({
  body: yup.object().shape({
    book_id: yup.string().required(),
    user_id: yup.string().required(),
    rating: yup.string().matches(isRatingValueRegExp).required(),
  }).noUnknown(true, 'Bad request'),
});

export default {
  getAllBooks,
  getOneBook,
  addComment,
  setRating,
};
