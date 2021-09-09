import { getCustomRepository } from "typeorm";
import { ComplimentRepository } from "../repositories/ComplimentRepository";
import { UserRepository } from "../repositories/UserRepository";

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_reciver: string;
  message: string;
}

class CreateComplimentService {
  private readonly ERR_INCORRECT_USER_RECEIVER = "Incorrect User Receiver";
  private readonly ERR_USER_RECEIVER_NOT_EXISTS = "User Receiver does not exists!";

  async excute({
    tag_id,
    user_sender,
    user_reciver,
    message,
  }: IComplimentRequest) {
    const complimentReposity = getCustomRepository(ComplimentRepository);
    const userRepository = getCustomRepository(UserRepository);

    if (user_sender === user_reciver) {
      throw new Error(this.ERR_INCORRECT_USER_RECEIVER);
    }

    const userReciverExists = await userRepository.findOne(user_reciver);

    if (!userReciverExists) {
      throw new Error(this.ERR_USER_RECEIVER_NOT_EXISTS);
    }

    const compliment = complimentReposity.create({
      tag_id,
      user_sender,
      user_reciver,
      message,
    });

    await complimentReposity.save(compliment);
  }
}

export { CreateComplimentService };
