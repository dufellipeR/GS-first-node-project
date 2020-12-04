import  FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import SendForgotPasswordEmail from './SendForgotPasswordEmail';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using an email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmail(
      fakeUsersRepository,
      fakeMailProvider
      );

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await sendForgotPasswordEmail.execute(
     'johndoe@example.com',
    );

    expect(sendMail).toHaveBeenCalled();
  })

})
