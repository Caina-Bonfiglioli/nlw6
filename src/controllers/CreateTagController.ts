import { Request, Response } from "express";
import { CreateTagSerivice } from "../services/CreateTagSerivice";

class CreateTagController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;

    const createTagService = new CreateTagSerivice();

    const tag = await createTagService.execute(name);

    return response.json(tag);
  }
}

export { CreateTagController };
