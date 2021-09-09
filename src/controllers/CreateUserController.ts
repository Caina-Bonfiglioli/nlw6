import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, admin, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, admin, password });

    return response.json({
      id: user.id, 
      name: user.name, 
      email: user.email, 
      created_at: user.created_at, 
      updated_at: user.updated_at
    });
  }
}

export { CreateUserController };
