
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { inject, injectable } from 'tsyringe';

// import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  email: string;
  // id: string;
}

@injectable()
export default class SendForgotPasswordEmail {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokenRepository,

  ) {}

  public async execute({ email }:IRequest ): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    console.log(user);

    if (!user) {
      throw new AppError('User does not exists.')
    }

    const { token } = await this.userTokensRepository.generate(user.id)

    await this.mailProvider.sendMail(user.email,
      `Pedido de recuperação de senha recebido: ${token}
       Caso não tenha solicitado, apenas ignore este e-mail `)
  }
}
