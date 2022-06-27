export enum OrderDir {
  asc = 'ASC',
  desc = 'DESC',
}

// constants for default values in query searching params
const COMMON_PAGE_VALUE = 1;
const COMMON_TAKE_VALUE = 12;
const COMMON_ORDER_NAME = 'id';
const COMMON_ORDER_DIRECTION = OrderDir.asc;
const COMMON_MAX_PRICE = 2 ** 31 - 1;

// constants for common error messages
const COMMON_ERROR_MESSAGE = 'Sorry, something went wrong...';
const COMMON_NOT_ALLOWED_MESSAGE = 'You are not allowed to access this data';

// constants for random data seeding
const GENRES_QUANTITY_TO_CREATE = 10;
const BOOKS_QUANTITY_TO_CREATE = 10;

export default {
  COMMON_ORDER_DIRECTION,
  COMMON_ORDER_NAME,
  COMMON_PAGE_VALUE,
  COMMON_TAKE_VALUE,
  COMMON_ERROR_MESSAGE,
  COMMON_NOT_ALLOWED_MESSAGE,
  COMMON_MAX_PRICE,
  GENRES_QUANTITY_TO_CREATE,
  BOOKS_QUANTITY_TO_CREATE,
};
