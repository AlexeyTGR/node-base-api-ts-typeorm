import * as yup from 'yup';

const isNumberRegExp = /^[0-9]+$/;

const getOneBook = yup.object().shape({
  params: yup.object().shape({
    id: yup.string().matches(isNumberRegExp, 'Bad URL').min(1),
  }),
});

export default {
  getOneBook,
};
