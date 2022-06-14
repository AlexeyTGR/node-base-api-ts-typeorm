import Rating from '../db/entity/Rating';

const calcAverageRate = (arr: Rating[]): number => {
  let averageRating = 0;
  arr.forEach((item: Rating, index, arr) => {
    averageRating += item.rating;
    if (index === arr.length - 1) {
      averageRating /= arr.length;
    }
  });
  return averageRating;
};

export default calcAverageRate;
