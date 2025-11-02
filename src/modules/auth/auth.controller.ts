import { Request, Response } from "express";
import { AuthService } from "./auth.services";

const authService = new AuthService();

export class AuthController {
  async signup(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await authService.signup(name, email, password);
      res.status(201).json(user);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const data = await authService.login(email, password);
      res.json(data);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
