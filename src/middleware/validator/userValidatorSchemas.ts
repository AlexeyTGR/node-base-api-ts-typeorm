import * as yup from 'yup';

export const getUserSchema = yup.object().shape({
  params: yup.object().shape({
    id: yup.number().min(1),
  }),
  user: yup.object().shape({
    id: yup.number().min(1),
    email: yup.string().email(),
    name: yup.string().min(2),
    dob: yup.date(),
  }),
});

export const deleteUserSchema = yup.object().shape({
  params: yup.object().shape({
    id: yup.number().min(1),
  }),
});

export const updateUserSchema = yup.object().shape({
  params: yup.object().shape({
    id: yup.number().min(1),
  }),
  body: yup.object().shape({
    email: yup.string().email(),
    password: yup.string().min(2),
    name: yup.string().min(2),
    dob: yup.date(),
  }),
  user: yup.object().shape({
    id: yup.number().min(1),
    email: yup.string().email(),
    name: yup.string().min(2),
    dob: yup.date(),
  }),
});

export default {
  updateUserSchema,
  getUserSchema,
  deleteUserSchema,
};
