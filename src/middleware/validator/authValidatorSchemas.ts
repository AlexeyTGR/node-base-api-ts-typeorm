import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
  body: yup.object().shape({
    email: yup.string().email(),
    password: yup.string().min(2),
    name: yup.string().min(2),
    dob: yup.date(),
  }),
});

export const signInSchema = yup.object().shape({
  body: yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(2),
  }),
});

// export default {
//   signInSchema,
//   signUpSchema,
// };
