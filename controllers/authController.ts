import appDataSource from '../src/db/data-source';
import User from '../src/db/entity/User';

function MyError(code, descripion) {
  this.code = code;
  this.descripion = descripion;
  this.stack = (new Error()).stack;
}

MyError.prototype = Object.create(Error.prototype);
MyError.prototype.constructor = MyError;

export const signUp = async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      dob,
    } = req.body;

    const newUser = {
      email,
      password,
      name,
      dob,
    };

    await appDataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([{
        email,
        password,
        name,
        dob,
      }])
      .execute();

    return res.status(200).json(newUser);
  } catch (err) {
    console.log(err);

    // return res.status(err.code).send('Registration error')
    return res.sendStatus(500);
  }
};
const userRepository = appDataSource.getRepository(User);

export const signIn = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user = await userRepository.findOne({ where: { email } });

    // const user = await appDataSource
    //   .getRepository(User)
    //   .createQueryBuilder()
    //   .where("email = :email", { email })
    //   .getOne()

    if (!user) {
      throw new MyError(404, 'User not found');
    }
    if (user.password !== password) {
      throw new MyError(401, 'Wrong password');
    }

    return res.status(200).send('You are signed in');
  } catch (err) {
    return res.status(err.code).send(err.descripion || 'Authorization error');
  }
};

export default {};
