import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard'; 
import { UserRole } from '../modules/users/entities/user.entity'; 

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // ✅ Get required roles from metadata
    const requiredRoles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    if (!requiredRoles || requiredRoles.length === 0) return true;

    // ✅ Ensure request has a user
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Access Denied: User not authenticated');
    }

    // ✅ Check if user's role matches any required role
    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Access Denied: Insufficient permissions');
    }

    return true;
  }
}
