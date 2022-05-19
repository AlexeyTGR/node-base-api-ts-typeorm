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
    email: yup.string().trim().email(),
    password: yup.string().trim().min(2),
    name: yup.string().trim().min(2),
    dob: yup.string(),
    role: yup.string(),
  }).noUnknown(true, 'Bad request'),
});

export const getAllUsers = yup.object().shape({
  query: yup.object().shape({
    page: yup.string().matches(/(1|2|3|4|5|6|7|8|9|0)/, 'Page value must be integer').min(1),
    take: yup.string().matches(/(1|2|3|4|5|6|7|8|9|0)/, 'Take value must be integer').min(1),
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
