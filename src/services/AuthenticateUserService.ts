import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UserRepository } from "../repositories/UserRepository";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AutentitcateUserService {
  private ERR_EMAIL_PASSWORD_INCORRECT = "Email/Password incorrect";

  async execute({ email, password }: IAuthenticateRequest) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({ email });

    if (!user) {
      throw new Error(this.ERR_EMAIL_PASSWORD_INCORRECT);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error(this.ERR_EMAIL_PASSWORD_INCORRECT);
    }

    const token = sign(
      {
        email: user.email,
      },
      "7fdf501b216c2242055603bfacc6838a",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}

export { AutentitcateUserService };
