import * as yup from 'yup';

const signUp = yup.object().shape({
  body: yup.object().shape({
    email: yup.string().trim().email().required(),
    password: yup.string().trim().min(2).required(),
    name: yup.string().trim().min(2).required(),
    dob: yup.string().required(),
  }).noUnknown(true, 'unnecessary data in request.body'),
});

const signIn = yup.object().shape({
  body: yup.object().shape({
    email: yup.string().trim().email('Should be email').required(),
    password: yup.string().trim().min(2).required(),
  }).noUnknown(true, 'unnecessary data in request.body'),
});

export default {
  signIn,
  signUp,
};
