import * as yup from 'yup';

export const getUser = yup.object().shape({
  params: yup.object().shape({
    id: yup.string().min(1),
  }),
});

export const deleteUser = yup.object().shape({
  params: yup.object().shape({
    id: yup.string(),
  }),
});

export const updateUser = yup.object().shape({
  params: yup.object().shape({
    id: yup.string().min(1),
  }).noUnknown(true, 'Bad request'),
  body: yup.object().shape({
    email: yup.string().email(),
    password: yup.string().min(2),
    name: yup.string().min(2),
    dob: yup.string(),
    role: yup.string(),
  }).noUnknown(true, 'Bad request'),
});

export const getAllUsers = yup.object().shape({
  query: yup.object().shape({
    page: yup.string().min(1),
    take: yup.string().min(1),
    order: yup.string().oneOf(['id', 'name', 'email', 'dob', 'role'], 'Wrong order name'),
    orderDirection: yup.string().oneOf(['ASC', 'DESC'], 'Wrong order direction name'),
    find: yup.string(),
    date: yup.string(),
    dateTo: yup.string(),
  }).noUnknown(true, 'Bad request'),
});

export default {
  updateUser,
  getUser,
  deleteUser,
  getAllUsers,
};
