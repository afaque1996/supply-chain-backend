import { Controller, Post, Body, UseGuards, BadRequestException, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRole } from '../users/entities/user.entity';
import { Public } from '../../common/decorators/public.decorator'; 
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public() // ✅ Allow public access for registration
  @Post('register')
  async register(@Body() body: { email: string; password: string; role: string }) {
    const role = Object.values(UserRole).includes(body.role as UserRole)
      ? (body.role as UserRole)
      : null;

    if (!role) {
      throw new BadRequestException('Invalid role specified');
    }

    return this.authService.register(body.email, body.password, role);
  }

  @Public() // ✅ Allow public access for login
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard) // ✅ Protect this route
  @Get('modules')
  async getUserModules(@Request() req) {
    return this.authService.getUserModules(req.user.id);
  }
}
