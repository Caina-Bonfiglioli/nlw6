import { getCustomRepository } from "typeorm";
import { ComplimentRepository } from "../repositories/ComplimentRepository";

class ListUserReceiveComplimentsService {
  async execute(user_id: string) {
    const complimentsRepository = getCustomRepository(ComplimentRepository);

    const compliments = await complimentsRepository.find({
      where: {
        user_reciver: user_id
      },
      relations: ["userSender", "userReciver", "tag"]
    });

    return compliments;
  }
}

export { ListUserReceiveComplimentsService };
