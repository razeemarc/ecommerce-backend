import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "./auth.repository";

const userRepo = new UserRepository();

export class AuthService {
  async signup(name: string, email: string, password: string, role: string = "USER") {
    const existingUser = await userRepo.findUserByEmail(email);
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepo.createUser(name, email, hashedPassword, role);

    return { id: user.id, name: user.name, email: user.email, role: user.role };
  }

  async login(email: string, password: string) {
    const user = await userRepo.findUserByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    // Include role in JWT payload
    const token = jwt.sign(
      { userId: user.id, role: user.role }, 
      process.env.JWT_SECRET!, 
      { expiresIn: "1h" }
    );

    return { token };
  }
}
