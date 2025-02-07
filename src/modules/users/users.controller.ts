import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from '../../guards/roles.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../users/entities/user.entity';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard) 
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)  // ✅ Only Admins can fetch users
async getAllUsers() {
  const users = await this.usersService.findAll();
  return users.map(({ password, ...user }) => user); // ✅ Exclude password
}
}
