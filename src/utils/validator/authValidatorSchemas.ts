import * as yup from 'yup';

const signUp = {
  body: {
    email: yup.string().trim().email().required(),
    password: yup.string().trim().min(2).required(),
    name: yup.string().trim().min(2),
  },
};

const signIn = {
  body: {
    email: yup.string().trim().email('Should be email').required(),
    password: yup.string().trim().min(2).required(),
  },
};

export default {
  signIn,
  signUp,
};
