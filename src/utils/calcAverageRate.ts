import Rating from '../db/entity/Rating';

const calcAverageRate = (arr: Rating[]): number => {
  const averageRating = arr.reduce((acc, item) => {
    return acc + item.rating;
  }, 0);

  return averageRating / arr.length;
};

export default calcAverageRate;
