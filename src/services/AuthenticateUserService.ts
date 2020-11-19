import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

interface RequestDTO {
  email: string;
  password: string;
}

export default class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: RequestDTO): Promise<{ user: User; token: string }> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
    }

    const token = sign({}, 'bdacc259b127a7aaab3acf0b231346ff', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}
