
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { inject, injectable } from 'tsyringe';

// import User from '@modules/users/infra/typeorm/entities/User';

// import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';


@injectable()
export default class SendForgotPasswordEmail {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

  ) {}

  public async execute( email : string): Promise<void> {
    this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido, caso não tenha solicitado, apenas ignore ')
  }
}
