import appDataSource from '../db/data-source';
import User from '../db/entity/User';

const userRepository = appDataSource.getRepository(User);

export const getOne = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userRepository.findOneBy({
      id: userId,
    });

    return res.status(200).json({ message: 'Hello man', user });
  } catch (err) {
    console.error(err);
    return res.status(err.code).message('Not this time');
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    await appDataSource
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id: userId })
      .execute();

    return res.status(200).send(`User with id = ${userId} deleted`);
  } catch (err) {
    return res.status(err.code).send('Something went wrong');
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    await appDataSource
      .createQueryBuilder()
      .update(User)
      .set(req.body)
      .where('id = :id', { id: userId })
      .execute();

    return res.status(200).send('Done!');
  } catch (err) {
    return res.status(err.code).send('Something went wrong');
  }
};

export default {};
