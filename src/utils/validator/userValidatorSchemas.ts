import * as yup from 'yup';
import { OrderDir } from '../constants';

const isNumberRegExp = /^[0-9]+$/;

export const getUser = {
  params: {
    id: yup.string().matches(isNumberRegExp),
  },
};

export const deleteUser = {
  params: {
    id: yup.string().matches(isNumberRegExp),
  },
};

export const updateUser = {
  params: {
    id: yup.string().matches(isNumberRegExp),
  },

  body: {
    email: yup.string().trim().email(),
    password: yup.string().trim().min(2),
    oldPassword: yup.string().trim(),
    name: yup.string().trim().min(2),
    dob: yup.string(),
    role: yup.string(),
  },
};

export const getAllUsers = {
  query: {
    page: yup.string().matches(isNumberRegExp, 'Page value must be integer').min(1),
    take: yup.string().matches(isNumberRegExp, 'Take value must be integer').min(1),
    order: yup.string().oneOf(['id', 'name', 'email', 'dob', 'role'], 'Wrong order name'),
    orderDirection: yup.string().oneOf([OrderDir.asc, OrderDir.desc], 'Wrong order direction name'),
    find: yup.string(),
    dateFrom: yup.string(),
    dateTo: yup.string(),
  },
};

export const uploadAvatar = {
  body: {
    img: yup.string().matches(/data:image/, 'File should be an image!').matches(/base64/)
      .matches(/jpeg|jpg|png/, 'Wrong filename extension')
      .required(),
  },
};

export default {
  updateUser,
  getUser,
  deleteUser,
  getAllUsers,
  uploadAvatar,
};
