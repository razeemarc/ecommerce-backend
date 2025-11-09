// src/types/auth.types.ts

import { Role } from '@prisma/client';

export { Role };

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  role: Role;
 phone:string
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: Role;
   
  };
}

export interface JWTPayload {
  userId: string;
  authId: string;
  email: string;
  role: Role;
}