import { Request, Response } from "express";
import { ListTagService } from "../services/ListTagService";

class ListTagController {
  async handle(request: Request, response: Response) {
    const listTagService = new ListTagService()

    const tags = await listTagService.execute();

    return response.status(200).json(tags)
  }
}

export { ListTagController }