import * as yup from 'yup';

const signUp = yup.object().shape({
  body: yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(2).required(),
    name: yup.string().min(2).required(),
    dob: yup.string().required(),
  }).noUnknown(true, 'do not play with us...'),
});

const signIn = yup.object().shape({
  body: yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(2).required(),
  }).noUnknown(true, 'do not play with us...'),
});

export default {
  signIn,
  signUp,
};
