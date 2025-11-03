import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { AuthRepository } from './auth.repository';
import { Role, JWTPayload } from './auth.types';



export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: Role;
    shopId?: string | null;
    branchId?: string | null;
  };
}

export class AuthService {
  private authRepository: AuthRepository;
  private readonly JWT_SECRET: string;
  private readonly JWT_EXPIRES_IN: string | number;

  constructor() {
    this.authRepository = new AuthRepository();
    this.JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    this.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
  }

  async signup(email: string, password: string, name: string, role: Role, shopId?: string, branchId?: string): Promise<AuthResponse> {
    // Check if user already exists
    const existingAuth = await this.authRepository.findAuthByEmail(email);
    if (existingAuth) {
      throw new Error('Email already registered');
    }

    // Validate role-specific requirements
    if (role !== 'SUPER_ADMIN' && !shopId) {
      throw new Error('Shop ID is required for non-SUPER_ADMIN roles');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create auth and user
    const authWithUser = await this.authRepository.createAuthWithUser({
      email,
      password: hashedPassword,
      name,
      role,
      shopId,
      branchId
    });

    if (!authWithUser.user) {
      throw new Error('Failed to create user');
    }

    // Generate JWT token
    const token = this.generateToken({
      userId: authWithUser.user.id,
      authId: authWithUser.id,
      email: authWithUser.email,
      role: authWithUser.user.role
    });

    return {
      token,
      user: {
        id: authWithUser.user.id,
        email: authWithUser.email,
        name: authWithUser.user.name,
        role: authWithUser.user.role,
        shopId: authWithUser.user.shopId,
        branchId: authWithUser.user.branchId
      }
    };
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    // Find auth by email
    const auth = await this.authRepository.findAuthByEmail(email);
    if (!auth || !auth.user) {
      throw new Error('Invalid credentials');
    }

    // Check if account is active
    if (!auth.isActive) {
      throw new Error('Account is inactive');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, auth.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Update last login
    await this.authRepository.updateLastLogin(auth.id);

    // Generate JWT token
    const token = this.generateToken({
      userId: auth.user.id,
      authId: auth.id,
      email: auth.email,
      role: auth.user.role
    });

    return {
      token,
      user: {
        id: auth.user.id,
        email: auth.email,
        name: auth.user.name,
        role: auth.user.role,
        shopId: auth.user.shopId,
        branchId: auth.user.branchId
      }
    };
  }

  private generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRES_IN as any
    });
  }

  verifyToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, this.JWT_SECRET) as JWTPayload;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}