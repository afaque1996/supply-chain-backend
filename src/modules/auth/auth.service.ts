import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../users/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private roleModules = {
    admin: ['dashboard', 'stockyard', 'transportation', 'pdi', 'sales'],
    manager: ['stockyard', 'pdi', 'sales'],
    staff: ['pdi']
  };

  async register(email: string, password: string, role: UserRole) {
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Email is already registered');
    }

    if (!Object.values(UserRole).includes(role)) {
      throw new BadRequestException('Invalid role specified');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      role,
    });

    await this.userRepository.save(user);
    
    return { message: 'User registered successfully' };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload, {
      expiresIn: '1h', 
    });

    return {
      message: 'Login successful',
      access_token: token,
      role: user.role,
      modules: this.roleModules[user.role] || [], 
    };
  }

  async validateUser(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async getUserModules(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return { modules: this.roleModules[user.role] || [] };
  }
}
