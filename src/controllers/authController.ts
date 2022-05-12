import verifyPassword from '../middleware/verifyPassword';
import appDataSource from '../db/data-source';
import User from '../db/entity/User';

function MyError(code, descripion) {
  this.code = code;
  this.descripion = descripion;
  this.stack = (new Error()).stack;
}

MyError.prototype = Object.create(Error.prototype);
MyError.prototype.constructor = MyError;
const userRepository = appDataSource.getRepository(User);

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

    const user = userRepository.create(newUser);

    await userRepository.save(user);

    return res.status(200).json(user);
  } catch (err) {
    return res.sendStatus(500);
  }
};

export const signIn = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new MyError(404, 'User not found');
    }
    const isVerified = verifyPassword(password, user.password);
    if (!isVerified) {
      throw new MyError(401, 'Wrong password');
    }
    req.user = {
      id: user.id,
      role: user.role,
      email: user.email,
      name: user.name,
      dob: user.dob,
    };

    return res.status(200).send('You are signed in');
  } catch (err) {
    return res.status(err.code).send(err.descripion || 'Authorization error');
  }
};

export default {};
