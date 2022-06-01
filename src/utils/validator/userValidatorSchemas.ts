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
    oldPassword: yup.string().trim(),
    name: yup.string().trim().min(2),
    dob: yup.string(),
    role: yup.string(),
  }).noUnknown(true, 'Bad request'),
});

const isNumberRegExp = /^[0-9]+$/;
export const getAllUsers = yup.object().shape({
  query: yup.object().shape({
    page: yup.string().matches(isNumberRegExp, 'Page value must be integer').min(1),
    take: yup.string().matches(isNumberRegExp, 'Take value must be integer').min(1),
    order: yup.string().oneOf(['id', 'name', 'email', 'dob', 'role'], 'Wrong order name'),
    orderDirection: yup.string().oneOf(['ASC', 'DESC'], 'Wrong order direction name'),
    find: yup.string(),
    dateFrom: yup.string(),
    dateTo: yup.string(),
  }).noUnknown(true, 'Bad request'),
});

export const uploadAvatar = yup.object().shape({
  body: yup.object().shape({
    img: yup.string().matches(/data:image/, 'File should be an image!').matches(/base64/)
      .matches(/jpeg|jpg|png/, 'Wrong filename extension')
      .required(),
  }),
});

export default {
  updateUser,
  getUser,
  deleteUser,
  getAllUsers,
  uploadAvatar,
};
