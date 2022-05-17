import * as yup from 'yup';

export const getUser = yup.object().shape({
  params: yup.object().shape({
    id: yup.number().min(1),
  }),
  user: yup.object().shape({
    id: yup.number().min(1),
    email: yup.string().email(),
    name: yup.string().min(2),
    dob: yup.string(),
  }),
});

export const deleteUser = yup.object().shape({
  params: yup.object().shape({
    id: yup.number().min(1),
  }),
});

export const updateUser = yup.object().shape({
  params: yup.object().shape({
    id: yup.number().min(1),
  }),
  body: yup.object().shape({
    email: yup.string().email(),
    password: yup.string().min(2),
    name: yup.string().min(2),
    dob: yup.string(),
  }),
  user: yup.object().shape({
    id: yup.number().min(1),
    email: yup.string().email(),
    name: yup.string().min(2),
    dob: yup.string(),
  }),
}).noUnknown(true, 'Bad request');

export default {
  updateUser,
  getUser,
  deleteUser,
};
