import { User } from "@prisma/client";
import { prisma } from "../config/database";

export class UserRepository {
    async createUser(name: string, email: string, password: string, role: string = "USER"): Promise<User> {
        return prisma.user.create({
          data: { name, email, password, role },
        });
      }
    

  async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }
}
