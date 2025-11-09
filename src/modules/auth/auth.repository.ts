// src/repositories/auth.repository.ts

import { Auth, User, Role } from '@prisma/client';
import { prisma } from '../../config/database';


export class AuthRepository {
  async findAuthByEmail(email: string): Promise<(Auth & { user: User | null }) | null> {
    return await prisma.auth.findUnique({
      where: { email },
      include: { user: true }
    });
  }

  async findAuthById(id: string): Promise<(Auth & { user: User | null }) | null> {
    return await prisma.auth.findUnique({
      where: { id },
      include: { user: true }
    });
  }

  async createAuthWithUser(data: {
    email: string;
    password: string;
    name: string;
    phone:string,
    code:string,
    role: Role;
   
  }): Promise<Auth & { user: User }> {
    return await prisma.auth.create({
      data: {
        email: data.email,
        password: data.password,
        user: {
          create: {
            name: data.name,
            role: data.role,
            phone:data.phone,
            code:Math.floor(100000 + Math.random() * 900000).toString(),
            
          }
        }
      },
      include: { user: true }
    }) as Auth & { user: User };
  }

  async updateLastLogin(authId: string): Promise<Auth> {
    return await prisma.auth.update({
      where: { id: authId },
      data: { last_login: new Date() }
    });
  }

  async updatePassword(authId: string, newPassword: string): Promise<Auth> {
    return await prisma.auth.update({
      where: { id: authId },
      data: { password: newPassword }
    });
  }
}