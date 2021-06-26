import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProviderInMemory = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProviderInMemory
    );
  });

  it("Should be able to send a forgot password mail to user", async () => {
    const sendMail = spyOn(mailProviderInMemory, "sendMail");

    const email = "jowhn@bang.com";

    await usersRepositoryInMemory.create({
      driver_license: "6544789",
      email,
      name: "Jowhn Will",
      password: "88569",
    });

    await sendForgotPasswordMailUseCase.execute(email);

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not be able to send an email if user does not exists", async () => {
    expect(
      sendForgotPasswordMailUseCase.execute("jowhn@bang.com")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("Should be able to create an users token", async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, "create");

    const email = "asdrubal@bang.com";

    await usersRepositoryInMemory.create({
      driver_license: "9965896",
      email,
      name: "Asdrubal",
      password: "7788556",
    });

    await sendForgotPasswordMailUseCase.execute(email);

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
